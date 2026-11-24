"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  MessageSquare,
  CheckCircle2,
  Mail,
  Check,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/siteConfig";

interface ContactClientProps {
  initialCategory?: string;
}

export default function ContactClient({ initialCategory = "" }: ContactClientProps) {
  const { locale, dict } = useLocale();

  const initialMatchedPreset = initialCategory
    ? dict.contact.categoryOptions.find(
        (opt) => opt.toLowerCase() === initialCategory.toLowerCase()
      )
    : undefined;

  const [selectedPreset, setSelectedPreset] = useState<string>(() => {
    if (!initialCategory) return "";
    return initialMatchedPreset || "__CUSTOM__";
  });
  const [customCategory, setCustomCategory] = useState<string>(() => {
    if (!initialCategory || initialMatchedPreset) return "";
    return initialCategory;
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (success) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [success]);

  const isOtherOption =
    selectedPreset === "__CUSTOM__" ||
    selectedPreset === "Diğer" ||
    selectedPreset === "Other";

  const resolvedCategory = isOtherOption
    ? customCategory.trim()
    : selectedPreset.trim();

  const resolvedBudget = formData.budget || dict.contact.budgetOptions[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const categoryToSend = resolvedCategory || dict.contact.categoryOptions[0];

    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          category: categoryToSend,
          budget: resolvedBudget,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(dict.contact.errorDefault);
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : dict.contact.errorDefault;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const whatsAppSuccessUrl = getWhatsAppUrl(
    dict.contact.whatsappPrefillTemplate(
      formData.name,
      resolvedCategory || dict.contact.categoryOptions[0],
      resolvedBudget,
      formData.message
    )
  );

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <section className="w-full border-b border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-14 md:pt-16 md:pb-20">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.contact.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-ink mt-3 leading-[1.08]">
              {dict.contact.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-ink-secondary leading-relaxed">
              {dict.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Assurances */}
            <div className="studio-card rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
                {dict.contact.assurancesTitle}
              </h2>
              <ul className="flex flex-col gap-3 text-sm text-ink-secondary">
                {dict.contact.assurances.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-accent-soft text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Channels */}
            <div className="studio-card rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
                {dict.contact.directChannelsTitle}
              </h2>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface hover:bg-surface-subtle border border-line transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-line flex items-center justify-center text-accent shrink-0">
                  <Mail size={17} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-ink-muted block">
                    {dict.contact.emailLabel}
                  </span>
                  <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors truncate">
                    {SITE_CONFIG.email}
                  </p>
                </div>
              </a>

              <a
                href={getWhatsAppUrl(dict.home.ctaWhatsAppPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface hover:bg-surface-subtle border border-line transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-line flex items-center justify-center text-status-ok shrink-0">
                  <MessageSquare size={17} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-ink-muted block">
                    {dict.contact.whatsappLabel}
                  </span>
                  <p className="text-sm font-semibold text-ink group-hover:text-status-ok transition-colors">
                    {SITE_CONFIG.phoneDisplay}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface border border-line">
                <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-line flex items-center justify-center text-ink-secondary shrink-0">
                  <MapPin size={17} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-ink-muted block">
                    {dict.contact.locationLabel}
                  </span>
                  <p className="text-sm font-medium text-ink">
                    {locale === "tr" ? SITE_CONFIG.locationTr : SITE_CONFIG.locationEn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-8">
            <div className="studio-card rounded-3xl p-7 sm:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-ink tracking-tight">
                  {dict.contact.formTitle}
                </h2>
                <p className="text-sm text-ink-secondary mt-1.5">
                  {dict.contact.formSubtitle}
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-600 dark:text-red-400 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                    >
                      {dict.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={dict.contact.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                    >
                      {dict.contact.emailFieldLabel} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={dict.contact.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors"
                    />
                  </div>
                </div>

                {/* Clickable Project Type Chips */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider">
                    {dict.contact.categoryLabel} *
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {dict.contact.categoryOptions.map((option) => {
                      const active = selectedPreset === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedPreset(option);
                            if (option !== "Diğer" && option !== "Other") {
                              setCustomCategory("");
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            active
                              ? "bg-ink text-background border border-ink"
                              : "bg-surface border border-line text-ink-secondary hover:border-line-strong hover:text-ink"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {isOtherOption && (
                    <input
                      type="text"
                      required
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder={dict.contact.categoryOtherPlaceholder}
                      className="mt-2 w-full px-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors"
                    />
                  )}
                </div>

                {/* Estimated Budget Range */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="budget"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    {dict.contact.budgetLabel}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors"
                  >
                    {dict.contact.budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-surface-elevated text-ink">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    {dict.contact.messageLabel} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={dict.contact.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto sm:self-start px-8 py-4 rounded-full font-semibold text-sm bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                >
                  {loading ? dict.contact.submitLoading : dict.contact.submitIdle}
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Success Modal */}
      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/55 dark:bg-black/75 backdrop-blur-sm animate-fade-up"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-surface-elevated border border-line rounded-3xl p-8 flex flex-col items-center text-center gap-5 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-status-ok/12 text-status-ok flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                {dict.contact.successEyebrow}
              </span>
              <h2 className="text-2xl font-bold text-ink mt-1.5">
                {dict.contact.successTitlePrefix}
                {formData.name}
              </h2>
            </div>

            <p className="text-sm text-ink-secondary leading-relaxed">
              {dict.contact.successBodyPrefix}
              <strong className="text-ink font-semibold">
                {resolvedCategory || dict.contact.categoryOptions[0]}
              </strong>
              {dict.contact.successBodyMiddle}
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {dict.contact.successBodySuffix}
            </p>

            <div className="flex flex-col gap-2.5 w-full pt-2">
              <a
                href={whatsAppSuccessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-full font-semibold text-sm bg-status-ok text-white hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                {dict.contact.successWhatsAppCta}
                <ArrowRight size={14} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setFormData({ name: "", email: "", budget: "", message: "" });
                  setSelectedPreset("");
                  setCustomCategory("");
                }}
                className="w-full py-3 px-5 rounded-full border border-line bg-surface text-xs font-semibold text-ink-secondary hover:text-ink hover:border-line-strong transition-colors cursor-pointer"
              >
                {dict.contact.successCloseCta}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
