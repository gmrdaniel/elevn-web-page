/**
 * International phone validation (E.164 + country-specific rules).
 * Uses libphonenumber-js for real validation when country is known;
 * falls back to E.164 structure when country is "Other".
 */

import { parsePhoneNumberFromString } from "libphonenumber-js";

/** E.164: + followed by 1–9, then up to 14 more digits (max 15 total). No spaces/dashes/parentheses. */
const E164_REGEX = /^\+[1-9]\d{1,14}$/;

const MIN_NATIONAL_DIGITS = 6;
const E164_MAX_DIGITS = 15;

/** Map our dropdown value (e.g. "+52") to ISO 3166-1 alpha-2 for libphonenumber-js */
const COUNTRY_CODE_TO_ISO: Record<string, string> = {
  "+1": "US",
  "+52": "MX",
  "+34": "ES",
  "+57": "CO",
  "+54": "AR",
  "+55": "BR",
  "+56": "CL",
  "+51": "PE",
  "+58": "VE",
  "+593": "EC",
  "+502": "GT",
  "+507": "PA",
  "+506": "CR",
  "+503": "SV",
  "+504": "HN",
  "+505": "NI",
  "+44": "GB",
  "+49": "DE",
  "+33": "FR",
  "+39": "IT",
  "+81": "JP",
  "+86": "CN",
  "+91": "IN",
  "+61": "AU",
};

/**
 * Normalize phone input: remove spaces, dashes, parentheses, dots.
 * Returns digits only (no +). Caller adds + and country code for E.164.
 */
export function normalizePhoneInput(value: string): string {
  return value.replace(/[\s\-().\u00A0]/g, "").replace(/\D/g, "");
}

/**
 * Anti-fake: reject numbers that are clearly invalid or test patterns.
 * - All same digit (e.g. 1111111111)
 * - Sequential ascending (1234567890) or descending (9876543210)
 * - Fewer than MIN_NATIONAL_DIGITS digits (national part)
 */
function isLikelyFake(nationalDigits: string): boolean {
  if (nationalDigits.length < MIN_NATIONAL_DIGITS) return true;
  const sameDigit = /^(.)\1{5,}$/.test(nationalDigits);
  if (sameDigit) return true;
  const sequentialAsc = /012345|123456|234567|345678|456789|567890/.test(nationalDigits);
  const sequentialDesc = /987654|876543|765432|654321|543210|432109/.test(nationalDigits);
  if (sequentialAsc || sequentialDesc) return true;
  if (/^1234567890$|^0123456789$|^9876543210$|^0987654321$/.test(nationalDigits)) return true;
  return false;
}

export interface PhoneValidationResult {
  valid: boolean;
  error?: string;
  /** E.164 formatted number when valid (e.g. +525512345678) */
  e164?: string;
}

/**
 * Validate phone number: normalize, E.164 structure, country-specific rules (libphonenumber-js),
 * and anti-fake checks. Optional field: empty string is valid.
 */
export function validatePhoneNumber(
  countryCodeValue: string,
  nationalNumber: string
): PhoneValidationResult {
  const normalized = normalizePhoneInput(nationalNumber);
  if (normalized.length === 0) {
    return { valid: true };
  }

  if (normalized.length < MIN_NATIONAL_DIGITS) {
    return {
      valid: false,
      error: `Enter at least ${MIN_NATIONAL_DIGITS} digits for the phone number.`,
    };
  }

  const countryCode = countryCodeValue.trim().replace(/^\+/, "") || "";
  const fullE164 = countryCode ? `+${countryCode}${normalized}` : `+${normalized}`;

  if (fullE164.length > E164_MAX_DIGITS + 1) {
    return {
      valid: false,
      error: `Phone number is too long (max ${E164_MAX_DIGITS} digits total).`,
    };
  }

  if (isLikelyFake(normalized)) {
    return {
      valid: false,
      error: "This doesn’t look like a valid phone number. Avoid repeated or sequential digits.",
    };
  }

  if (!countryCode) {
    if (!E164_REGEX.test(fullE164)) {
      return {
        valid: false,
        error: "Enter a valid international number (e.g. +52 55 1234 5678).",
      };
    }
    return { valid: true, e164: fullE164 };
  }

  const iso = COUNTRY_CODE_TO_ISO[countryCodeValue] ?? COUNTRY_CODE_TO_ISO[`+${countryCode}`];
  if (iso) {
    const phone = parsePhoneNumberFromString(fullE164, iso as any);
    if (!phone) {
      return {
        valid: false,
        error: "Invalid number for the selected country. Check the number of digits.",
      };
    }
    if (!phone.isValid()) {
      return {
        valid: false,
        error: "Invalid number for the selected country. Check the number of digits.",
      };
    }
    return { valid: true, e164: phone.format("E.164") };
  }

  if (!E164_REGEX.test(fullE164)) {
    return {
      valid: false,
      error: "Invalid format. Use digits only (max 15 total including country code).",
    };
  }
  return { valid: true, e164: fullE164 };
}
