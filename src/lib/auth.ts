"use strict";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secure_key_32_characters_long_2026";

// Convert string key into CryptoKey for Web Crypto operations
async function getCryptoKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(JWT_SECRET);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Custom lightweight secure signed session token generator (similar to JWT)
export async function signSession(username: string): Promise<string> {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const payload = JSON.stringify({
    username,
    exp: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
  });

  const base64UrlHeader = btoa(header).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const base64UrlPayload = btoa(payload).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const encoder = new TextEncoder();
  const dataToSign = encoder.encode(`${base64UrlHeader}.${base64UrlPayload}`);
  
  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, dataToSign);
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
  const base64UrlSignature = signatureBase64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${base64UrlHeader}.${base64UrlPayload}.${base64UrlSignature}`;
}

// Custom lightweight secure signed session verifier
export async function verifySession(token: string): Promise<{ username: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const encoder = new TextEncoder();
    const dataToVerify = encoder.encode(`${header}.${payload}`);

    // Decode signature
    const signatureBase64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    const binarySignatureString = atob(signatureBase64);
    const signatureBytes = new Uint8Array(binarySignatureString.length);
    for (let i = 0; i < binarySignatureString.length; i++) {
      signatureBytes[i] = binarySignatureString.charCodeAt(i);
    }

    const key = await getCryptoKey();
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, dataToVerify);
    if (!isValid) return null;

    // Decode and validate payload expiration
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (decodedPayload.exp < Date.now()) {
      console.warn("Session expired");
      return null;
    }

    return { username: decodedPayload.username };
  } catch (error) {
    console.error("Session verification failed", error);
    return null;
  }
}
