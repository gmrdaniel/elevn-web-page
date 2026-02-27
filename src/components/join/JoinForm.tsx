"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  type JoinFormData,
  type PlatformKey,
  type NicheOption,
  PLATFORM_KEYS,
  PLATFORM_LABELS,
  PLATFORM_COLORS,
  NICHE_OPTIONS,
  COUNTRY_CODES,
  INITIAL_JOIN_FORM_DATA,
  isPlatformUrlValid,
} from "@/types/join";
import { cn } from "@/lib/utils";
import { submitToGoogleForms } from "@/lib/googleFormsSubmit";
import { validatePhoneNumber, normalizePhoneInput } from "@/lib/phoneValidation";
import { HiArrowRight, HiArrowLeft, HiCheck, HiXMark, HiBolt } from "react-icons/hi2";
import { FaYoutube, FaInstagram, FaTiktok, FaFacebook, FaTwitch, FaLink, FaKickstarterK  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const TOTAL_STEPS = 5;
const MESSAGE_MAX_LENGTH = 500;
const NICHE_MAX = 3;
/** Max digits for national number input (E.164 allows 15 total including country code). */
const PHONE_NATIONAL_MAX_DIGITS = 15;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface JoinFormProps {
  onClose: () => void;
  onSubmit?: (data: JoinFormData) => Promise<void>;
}

export function JoinForm({ onClose, onSubmit }: JoinFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<JoinFormData>(() => ({ ...INITIAL_JOIN_FORM_DATA }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [submitted, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Cuando se borra la URL de YouTube, quitar la respuesta de monetización
  useEffect(() => {
    if (!data.platforms.youtube.url.trim()) {
      setData((prev) => (prev.youtubeMonetized === null ? prev : { ...prev, youtubeMonetized: null }));
    }
  }, [data.platforms.youtube.url]);

  const update = useCallback(<K extends keyof JoinFormData>(field: K, value: JoinFormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[field as string];
      return next;
    });
  }, []);

  const setPlatform = useCallback((key: PlatformKey, url: string, followers: string) => {
    setData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: { url: url.trim(), followers: followers.trim() },
      },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`platform_${key}_url`];
      delete next[`platform_${key}_followers`];
      if (url.trim()) delete next.platforms_required;
      return next;
    });
  }, []);

  // Step 1 validation
  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = "Full name is required.";
    if (!data.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(data.email)) e.email = "Please enter a valid email.";
    if (data.phoneNumber.trim()) {
      const result = validatePhoneNumber(data.phoneCountryCode, data.phoneNumber);
      if (!result.valid && result.error) e.phoneNumber = result.error;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 2: at least 1 niche, max 3
  const validateStep2 = (): boolean => {
    if (data.niches.length === 0) {
      setErrors({ niches: "Select at least one niche (max three)." });
      return false;
    }
    if (data.niches.length > NICHE_MAX) {
      setErrors({ niches: `Maximum ${NICHE_MAX} options.` });
      return false;
    }
    setErrors({});
    return true;
  };

  // Step 3: at least one platform required; valid URL per platform; followers required when URL present; Other = https only
  const validateStep3 = (): boolean => {
    const next: Record<string, string> = {};
    const hasAtLeastOne = PLATFORM_KEYS.some((key) => data.platforms[key].url.trim() !== "");
    if (!hasAtLeastOne) {
      next.platforms_required = "At least one platform account is required.";
    }
    let valid = hasAtLeastOne;
    PLATFORM_KEYS.forEach((key) => {
      const entry = data.platforms[key];
      if (!entry.url.trim()) return;
      if (!isPlatformUrlValid(key, entry.url)) {
        next[`platform_${key}_url`] =
          key === "other"
            ? "Please enter a valid URL starting with https://"
            : `Please enter a valid ${PLATFORM_LABELS[key]} URL.`;
        valid = false;
      }
      if (!entry.followers.trim()) {
        next[`platform_${key}_followers`] = "Follower count is required.";
        valid = false;
      }
    });
    setErrors((prev) => {
      const cleaned = { ...prev };
      delete cleaned.platforms_required;
      PLATFORM_KEYS.forEach((k) => {
        delete cleaned[`platform_${k}_url`];
        delete cleaned[`platform_${k}_followers`];
      });
      return valid ? cleaned : { ...cleaned, ...next };
    });
    return valid;
  };

  // Step 4: message max length
  const validateStep4 = (): boolean => {
    if (data.message.length > MESSAGE_MAX_LENGTH) {
      setErrors({ message: `Maximum ${MESSAGE_MAX_LENGTH} characters.` });
      return false;
    }
    setErrors({});
    return true;
  };

  const goNext = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step === 4 && !validateStep4()) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;
    setSubmitting(true);
    setErrors({});
    try {
      await submitToGoogleForms(data);
      if (onSubmit) await onSubmit(data);
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: "Could not submit. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-form-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop — referencia */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm dark:bg-black/80"
        onClick={onClose}
        aria-hidden
      />
      {/* Modal — referencia*/}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-elevn-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="join-form-title" className="sr-only">Join ELEVN</h2>
        {/* Header sticky — referencia */}
        <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-slate-200 bg-gradient-to-r from-white to-elevn-primary/5 px-6 py-4 dark:from-elevn-surface dark:to-elevn-primary/10">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-elevn-ice">
            {submitted ? "ELEVN" : step === 0 ? "Join ELEVN" : `Step ${step} of 4`}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-elevn-ice/70 dark:hover:bg-white/10 dark:hover:text-elevn-ice"
            aria-label="Close"
          >
            <HiXMark className="size-5" />
          </button>
        </header>

        {/* Content — referencia */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Progress bar by segments */}
            {!submitted && (
              <div className="mb-6 flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-300",
                      i <= step
                        ? "bg-gradient-to-r from-elevn-primary to-elevn-primary/80 shadow-sm shadow-elevn-primary/25 dark:from-elevn-cyan dark:to-elevn-cyan/80 dark:shadow-elevn-cyan/20"
                        : "bg-slate-200 dark:bg-white/10"
                    )}
                  />
                ))}
              </div>
            )}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-5 py-8 text-center"
                >
                  <HiCheck className="size-14 text-green-500 dark:text-green-400" strokeWidth={2} aria-hidden />
                  <div className="space-y-3 text-slate-900 dark:text-elevn-ice">
                    <p className="text-lg font-medium">
                      Thanks for sharing your information
                    </p>
                    <p className="text-sm text-slate-600 dark:text-elevn-ice/90">
                      We're reviewing your profile to see if there's a match with current opportunities.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-elevn-ice/90">
                      If there's a fit, we'll get in touch soon via the contact details you provided.
                    </p>
                    <p className="text-sm font-semibold">
                      The ELEVN Team
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={onClose}
                    className="bg-elevn-primary hover:bg-elevn-primary/90 dark:bg-elevn-cyan dark:text-elevn-dark dark:hover:bg-elevn-cyan/90"
                  >
                    Close
                  </Button>
                </motion.div>
              ) : step === 0 ? (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Welcome card */}
                  <div className="rounded-xl bg-gradient-to-br from-elevn-primary/10 via-elevn-primary/5 to-transparent p-5 ring-1 ring-elevn-primary/10 dark:from-elevn-cyan/10 dark:via-elevn-cyan/5 dark:ring-elevn-cyan/10">
                    <div className="mb-4 flex items-center gap-2 text-elevn-primary dark:text-elevn-cyan">
                      <HiBolt className="size-5 shrink-0" aria-hidden />
                      <span className="text-sm font-semibold tracking-wide">What's in it for you</span>
                    </div>
                    <div className="space-y-4 text-slate-700 dark:text-elevn-ice/90">
                      <p className="leading-relaxed">
                        At ELEVN we connect creators with{" "}
                        <span className="font-medium text-slate-900 dark:text-elevn-ice">real opportunities</span>
                        : brand briefs, collaborations, and a professional ecosystem with clear standards. To match you
                        with what fits your profile best, we need to know a bit more about you.
                      </p>
                      <p className="leading-relaxed">
                        <span className="font-semibold text-slate-900 dark:text-elevn-ice">Complete your profile</span> in
                        the following steps. All information is confidential and we only use it to connect creators with
                        opportunities.
                      </p>
                    </div>
                  </div>
                  {/* CTA */}
                  <Button
                    type="button"
                    onClick={goNext}
                    className="w-full bg-gradient-to-r from-elevn-primary to-elevn-primary/90 py-6 text-base font-semibold shadow-lg shadow-elevn-primary/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-elevn-primary/30 active:scale-[0.99] dark:from-elevn-cyan dark:to-elevn-cyan/90 dark:text-elevn-dark dark:shadow-elevn-cyan/25 dark:hover:shadow-elevn-cyan/30"
                  >
                    Get started
                    <HiArrowRight className="ml-2 size-5" />
                  </Button>
                </motion.div>
              ) : step === 1 ? (
                <StepPersonal
                  key="step1"
                  data={data}
                  update={update}
                  errors={errors}
                  goNext={goNext}
                  goBack={goBack}
                />
              ) : step === 2 ? (
                <StepNiche
                  key="step2"
                  data={data}
                  update={update}
                  errors={errors}
                  goNext={goNext}
                  goBack={goBack}
                />
              ) : step === 3 ? (
                <StepPlatforms
                  key="step3"
                  data={data}
                  errors={errors}
                  setPlatform={setPlatform}
                  onYoutubeMonetizedChange={(value) => update("youtubeMonetized", value)}
                  goNext={goNext}
                  goBack={goBack}
                />
              ) : (
                <StepMessage
                  key="step4"
                  data={data}
                  update={update}
                  errors={errors}
                  submitting={submitting}
                  onSubmit={handleSubmit}
                  goBack={goBack}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const slide = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.22 },
};


const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 dark:bg-elevn-surface/50 dark:text-elevn-ice dark:placeholder-elevn-ice/50";
const inputError = "border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/80";
const inputNormal = "border-elevn-primary/30 focus:border-elevn-primary focus:ring-elevn-primary/20 dark:border-white/20 dark:focus:border-elevn-cyan dark:focus:ring-elevn-cyan/20";

function InputLabel({ children, htmlFor, required }: { children: React.ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-elevn-ice"
    >
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

function StepHead({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1 mb-5">
      <p className="text-sm font-semibold text-slate-900 dark:text-elevn-ice">{title}</p>
      <p className="text-xs text-slate-600 dark:text-elevn-ice/70">{description}</p>
    </div>
  );
}

function StepPersonal({
  data,
  update,
  errors,
  goNext,
  goBack,
}: {
  data: JoinFormData;
  update: <K extends keyof JoinFormData>(f: K, v: JoinFormData[K]) => void;
  errors: Record<string, string>;
  goNext: () => void;
  goBack: () => void;
}) {
  return (
    <motion.div {...slide} className="space-y-6">
      <StepHead
        title="Contact details"
        description="We use these to contact you and verify your identity. We do not share your information with third parties."
      />
      <div>
        <InputLabel htmlFor="fullName" required>Full name</InputLabel>
        <input
          id="fullName"
          type="text"
          value={data.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={cn(inputBase, errors.fullName ? inputError : inputNormal)}
          placeholder="e.g. Jane Smith"
          autoComplete="name"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
      </div>
      <div>
        <InputLabel htmlFor="email" required>Email</InputLabel>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className={cn(inputBase, errors.email ? inputError : inputNormal)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
      <div>
        <InputLabel htmlFor="countryOfResidence">Country of residence</InputLabel>
        <input
          id="countryOfResidence"
          type="text"
          value={data.countryOfResidence}
          onChange={(e) => update("countryOfResidence", e.target.value)}
          className={cn(inputBase, errors.countryOfResidence ? inputError : inputNormal)}
          placeholder="e.g. Mexico, Spain, Colombia"
          autoComplete="country-name"
        />
        {errors.countryOfResidence && <p className="mt-1 text-xs text-red-500">{errors.countryOfResidence}</p>}
      </div>
      <div>
        <InputLabel>Phone </InputLabel>
        <p className="mb-1.5 text-xs text-slate-500 dark:text-elevn-ice/60">
          Country code + number.
        </p>
        <div className="flex gap-2">
          <select
            value={data.phoneCountryCode}
            onChange={(e) => update("phoneCountryCode", e.target.value)}
            className={cn(inputBase, "w-28 shrink-0", errors.phoneNumber ? inputError : inputNormal)}
          >
            {COUNTRY_CODES.map(({ value, label }) => (
              <option key={value || "other"} value={value}>{label}</option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="numeric"
            value={data.phoneNumber}
            onChange={(e) => update("phoneNumber", normalizePhoneInput(e.target.value).slice(0, PHONE_NATIONAL_MAX_DIGITS))}
            className={cn(inputBase, "flex-1", errors.phoneNumber ? inputError : inputNormal)}
            placeholder="1234567890"
            autoComplete="tel-national"
          />
        </div>
        {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={goBack} className="border-slate-200 dark:border-white/15">
          <HiArrowLeft className="mr-2 size-4" /> Back
        </Button>
        <Button type="button" onClick={goNext} className="flex-1 bg-elevn-primary hover:bg-elevn-primary/90 dark:bg-elevn-cyan dark:text-elevn-dark dark:hover:bg-elevn-cyan/90">
          Next <HiArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepNiche({
  data,
  update,
  errors,
  goNext,
  goBack,
}: {
  data: JoinFormData;
  update: <K extends keyof JoinFormData>(f: K, v: JoinFormData[K]) => void;
  errors: Record<string, string>;
  goNext: () => void;
  goBack: () => void;
}) {
  const toggle = (n: NicheOption) => {
    const next = data.niches.includes(n)
      ? data.niches.filter((x) => x !== n)
      : data.niches.length < NICHE_MAX
        ? [...data.niches, n]
        : data.niches;
    update("niches", next);
  };

  return (
    <motion.div {...slide} className="space-y-6">
      <StepHead
        title="Content niche"
        description="Choose up to three verticals that represent most of your content. This helps us match your profile with relevant opportunities."
      />
      <div className="grid grid-cols-2 gap-2">
        {NICHE_OPTIONS.map((niche) => (
          <label
            key={niche}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 has-[:checked]:border-elevn-primary has-[:checked]:bg-elevn-primary/5 dark:border-white/10 dark:has-[:checked]:border-elevn-cyan dark:has-[:checked]:bg-elevn-cyan/10"
          >
            <input
              type="checkbox"
              checked={data.niches.includes(niche)}
              onChange={() => toggle(niche)}
              className="size-4 shrink-0 rounded text-elevn-primary dark:text-elevn-cyan"
            />
            <span className="min-w-0 truncate text-sm text-slate-900 dark:text-elevn-ice">{niche}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-elevn-ice/60">
          {data.niches.length} of {NICHE_MAX} selected
        </p>
        {errors.niches && <p className="text-xs text-red-500">{errors.niches}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={goBack} className="border-slate-200 dark:border-white/15">
          <HiArrowLeft className="mr-2 size-4" /> Back
        </Button>
        <Button type="button" onClick={goNext} className="flex-1 bg-elevn-primary hover:bg-elevn-primary/90 dark:bg-elevn-cyan dark:text-elevn-dark dark:hover:bg-elevn-cyan/90">
          Next <HiArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </motion.div>
  );
}

const PLATFORM_ICONS: Record<PlatformKey, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebook,
  twitch: FaTwitch,
  twitter: FaXTwitter,
  kick: FaKickstarterK,
  other: FaLink,
};

function StepPlatforms({
  data,
  errors,
  setPlatform,
  onYoutubeMonetizedChange,
  goNext,
  goBack,
}: {
  data: JoinFormData;
  errors: Record<string, string>;
  setPlatform: (key: PlatformKey, url: string, followers: string) => void;
  onYoutubeMonetizedChange: (value: boolean | null) => void;
  goNext: () => void;
  goBack: () => void;
}) {
  return (
    <motion.div {...slide} className="space-y-6">
      <StepHead
        title="Platforms and reach"
        description="Add at least one platform account (required). You can add more below. Follower count is required when you add a URL. This helps us understand your reach and verify your accounts."
      />
      {errors.platforms_required && (
        <p className="text-sm text-red-500">{errors.platforms_required}</p>
      )}
      <div className="space-y-3">
        {PLATFORM_KEYS.map((key) => {
          const entry = data.platforms[key];
          const hasUrl = !!entry.url.trim();
          const color = PLATFORM_COLORS[key];
          const urlError = errors[`platform_${key}_url`];
          const followersError = errors[`platform_${key}_followers`];
          const Icon = PLATFORM_ICONS[key];
          return (
            <div
              key={key}
              className="rounded-lg border border-slate-200 bg-white transition-[border-color,box-shadow] duration-200 focus-within:ring-2 focus-within:ring-offset-0 dark:border-white/10 dark:bg-white/5"
              style={
                hasUrl
                  ? {
                      borderColor: color,
                      boxShadow: `0 0 0 2px ${color}33`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center gap-3 px-3 pt-3">
                <span
                  className={cn("flex shrink-0 items-center justify-center transition-colors", !hasUrl && "text-slate-400 dark:text-elevn-ice/50")}
                  style={hasUrl ? { color } : undefined}
                  aria-hidden
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-700 dark:text-elevn-ice/90">
                    {PLATFORM_LABELS[key]}
                  </p>
                  <input
                    type="url"
                    value={entry.url}
                    onChange={(e) => setPlatform(key, e.target.value, entry.followers)}
                    placeholder={`${PLATFORM_LABELS[key]} URL `}
                    className={cn(
                      "mt-1 w-full border-0 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-elevn-ice dark:placeholder-elevn-ice/50",
                      urlError && "placeholder-red-400"
                    )}
                  />
                  {urlError && (
                    <p className="mt-0.5 text-xs text-red-500">{urlError}</p>
                  )}
                </div>
              </div>
              {hasUrl && (
                <div className="space-y-3 border-t border-slate-100 px-3 pb-3 pt-2 dark:border-white/5">
                  {key === "youtube" && (
                    <div>
                      <p className="mb-2 text-xs font-semibold text-slate-600 dark:text-elevn-ice/80">
                        Do you monetize on YouTube?
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onYoutubeMonetizedChange(true)}
                          className={cn(
                            "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                            data.youtubeMonetized === true
                              ? "border-elevn-cyan bg-elevn-cyan/15 text-elevn-cyan dark:border-elevn-cyan dark:bg-elevn-cyan/20 dark:text-elevn-cyan"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-elevn-ice/80 dark:hover:bg-white/10"
                          )}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => onYoutubeMonetizedChange(false)}
                          className={cn(
                            "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                            data.youtubeMonetized === false
                              ? "border-elevn-cyan bg-elevn-cyan/15 text-elevn-cyan dark:border-elevn-cyan dark:bg-elevn-cyan/20 dark:text-elevn-cyan"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-elevn-ice/80 dark:hover:bg-white/10"
                          )}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-elevn-ice/80">
                      Follower count <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={entry.followers}
                      onChange={(e) => setPlatform(key, entry.url, e.target.value)}
                      placeholder="e.g. 15000"
                      className={cn(
                        inputBase,
                        followersError ? inputError : inputNormal
                      )}
                    />
                    {followersError && (
                      <p className="mt-0.5 text-xs text-red-500">{followersError}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={goBack} className="border-slate-200 dark:border-white/15">
          <HiArrowLeft className="mr-2 size-4" /> Back
        </Button>
        <Button type="button" onClick={goNext} className="flex-1 bg-elevn-primary hover:bg-elevn-primary/90 dark:bg-elevn-cyan dark:text-elevn-dark dark:hover:bg-elevn-cyan/90">
          Next <HiArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepMessage({
  data,
  update,
  errors,
  submitting,
  onSubmit,
  goBack,
}: {
  data: JoinFormData;
  update: <K extends keyof JoinFormData>(f: K, v: JoinFormData[K]) => void;
  errors: Record<string, string>;
  submitting: boolean;
  onSubmit: () => void;
  goBack: () => void;
}) {
  return (
    <motion.div {...slide} className="space-y-6">
      <StepHead
        title="Message for the team (optional)"
        description="If you'd like to share something with us—a goal, a question, or why you're interested in ELEVN—write it here. Maximum 500 characters."
      />
      <div>
        <textarea
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={MESSAGE_MAX_LENGTH + 1}
          rows={4}
          className={cn(
            inputBase,
            "min-h-[100px] resize-y",
            errors.message ? inputError : inputNormal
          )}
          placeholder="e.g. I'm interested in collaborating with fitness brands..."
        />
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-elevn-ice/60">
            {data.message.length} / {MESSAGE_MAX_LENGTH}
          </p>
          {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
        </div>
      </div>
      {errors.submit && <p className="text-xs text-red-500">{errors.submit}</p>}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={goBack} disabled={submitting} className="border-slate-200 dark:border-white/15">
          <HiArrowLeft className="mr-2 size-4" /> Back
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 bg-elevn-primary hover:bg-elevn-primary/90 dark:bg-elevn-cyan dark:text-elevn-dark dark:hover:bg-elevn-cyan/90"
        >
          {submitting ? "Sending…" : "Submit"}
        </Button>
      </div>
    </motion.div>
  );
}
