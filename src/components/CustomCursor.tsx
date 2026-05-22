"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect touch device or mobile viewports
    const checkDevice = () => {
      const mobile =
        window.matchMedia("(max-width: 1024px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    // Track hover states for interactive elements to scale up the glow ring
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.closest(".glass-panel-hover") ||
        target.closest("input") ||
        target.closest("textarea");

      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  // Interpolated smooth follow trail effect (lerp)
  useEffect(() => {
    if (isMobile || !visible) return;

    let animFrameId: number;

    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animFrameId = requestAnimationFrame(updateTrail);
    };

    animFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrameId);
  }, [position, isMobile, visible]);

  if (isMobile || !visible) return null;

  return (
    <>
      {/* Dynamic Cursor Outer Glow Ring */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${hovered ? 1.4 : 1})`,
          width: "32px",
          height: "32px",
          border: `1.5px solid ${hovered ? "#8b5cf6" : "#06b6d4"}`,
          backgroundColor: hovered ? "rgba(139, 92, 246, 0.06)" : "transparent",
          boxShadow: hovered
            ? "0 0 16px rgba(139, 92, 246, 0.35)"
            : "0 0 6px rgba(6, 182, 212, 0.12)",
          transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${hovered ? 0.6 : 1})`,
          backgroundColor: hovered ? "#ec4899" : "#ffffff",
          boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)",
          transition: "transform 0.05s ease-out, background-color 0.2s ease",
        }}
      />
    </>
  );
}
