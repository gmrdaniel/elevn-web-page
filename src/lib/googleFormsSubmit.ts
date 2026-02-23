/**
 * Submits Join form data to the Google Form (Creator Collaboration form).
 * Uses a hidden form + iframe to avoid CORS and keep the user on the page.
 */

import type { JoinFormData, PlatformKey } from "@/types/join";
import { PLATFORM_KEYS } from "@/types/join";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeDTW8jXOrIRwajsA9E7XeXUC74uGeZaK2mxd3KNbmUnviBuw/formResponse";

/** Google Form entry IDs (from the form HTML) */
const ENTRIES = {
  fullName: "1103653316",
  email: "897863050",
  phoneCountryCode: "1518684820",
  phoneNumber: "252542750",
  niches: "803721215",
  youtubeUrl: "529637677",
  youtubeFollowers: "1600138093",
  instagramUrl: "1993199646",
  instagramFollowers: "1819751073",
  tiktokUrl: "794362963",
  tiktokFollowers: "1508566432",
  facebookUrl: "500575812",
  facebookFollowers: "305637643",
  twitchUrl: "1713075807",
  twitchFollowers: "166307964",
  twitterUrl: "429377842",
  twitterFollowers: "1404658696",
  kickUrl: "1149806367",
  kickFollowers: "1913325603",
  otherUrl: "780943374",
  message: "1037989358",
} as const;

/** Map our country code value to the exact option text expected by the Google Form dropdown */
const COUNTRY_CODE_TO_GOOGLE: Record<string, string> = {
  "+52": "+52 (México)",
  "+1": "+1 (USA/Canadá)",
  "+34": "+34 (España)",
  "+57": "+57 (Colombia)",
  "+54": "+54 (Argentina)",
  "+55": "+55 (Brasil)",
  "+56": "+56 (Chile)",
  "+51": "+51 (Perú)",
  "+58": "+58 (Venezuela)",
  "+593": "+593 (Ecuador)",
  "+502": "+502 (Guatemala)",
  "+507": "+507 (Panamá)",
  "+506": "+506 (Costa Rica)",
  "+503": "+503 (El Salvador)",
  "+504": "+504 (Honduras)",
  "+505": "+505 (Nicaragua)",
  "+44": "+44 (Reino Unido)",
  "+49": "+49 (Alemania)",
  "+33": "+33 (Francia)",
  "+39": "+39 (Italia)",
  "+81": "+81 (Japón)",
  "+86": "+86 (China)",
  "+91": "+91 (India)",
  "+61": "+61 (Australia)",
  "": "Otro",
};

/** Our app uses "Other" for niche; Google Form expects "Otro" */
function nicheToGoogle(niche: string): string {
  return niche === "Other" ? "Otro" : niche;
}

/**
 * Builds form data as Record<entryId, value> for single-value fields.
 * For niches we need multiple entry.803721215 values (one per selected).
 */
function buildPayload(data: JoinFormData): Array<{ name: string; value: string }> {
  const pairs: Array<{ name: string; value: string }> = [];

  pairs.push({ name: `entry.${ENTRIES.fullName}`, value: data.fullName.trim() });
  pairs.push({ name: `entry.${ENTRIES.email}`, value: data.email.trim() });

  const countryLabel =
      COUNTRY_CODE_TO_GOOGLE[data.phoneCountryCode] ?? (data.phoneCountryCode || "Otro");
  pairs.push({ name: `entry.${ENTRIES.phoneCountryCode}`, value: countryLabel });
  pairs.push({ name: `entry.${ENTRIES.phoneNumber}`, value: data.phoneNumber.trim() });

  data.niches.forEach((n) => {
    pairs.push({ name: `entry.${ENTRIES.niches}`, value: nicheToGoogle(n) });
  });

  const platformEntryKeys: Record<Exclude<PlatformKey, "other">, { url: keyof typeof ENTRIES; followers: keyof typeof ENTRIES }> = {
    youtube: { url: "youtubeUrl", followers: "youtubeFollowers" },
    instagram: { url: "instagramUrl", followers: "instagramFollowers" },
    tiktok: { url: "tiktokUrl", followers: "tiktokFollowers" },
    facebook: { url: "facebookUrl", followers: "facebookFollowers" },
    twitch: { url: "twitchUrl", followers: "twitchFollowers" },
    twitter: { url: "twitterUrl", followers: "twitterFollowers" },
    kick: { url: "kickUrl", followers: "kickFollowers" },
  };

  PLATFORM_KEYS.forEach((key) => {
    const entry = data.platforms[key];
    if (!entry.url.trim()) return;
    if (key === "other") {
      pairs.push({ name: `entry.${ENTRIES.otherUrl}`, value: entry.url.trim() });
      return;
    }
    const { url: urlKey, followers: followersKey } = platformEntryKeys[key];
    pairs.push({ name: `entry.${ENTRIES[urlKey]}`, value: entry.url.trim() });
    if (entry.followers.trim()) {
      pairs.push({ name: `entry.${ENTRIES[followersKey]}`, value: entry.followers.trim() });
    }
  });

  pairs.push({ name: `entry.${ENTRIES.message}`, value: data.message.trim() });

  return pairs;
}

/**
 * Submits to Google Forms via a hidden form targeting a hidden iframe.
 * Does not redirect the page. Resolves when the form has been submitted
 * (we cannot read the response due to cross-origin).
 */
export function submitToGoogleForms(data: JoinFormData): Promise<void> {
  return new Promise<void>((resolve) => {
    const pairs = buildPayload(data);
    const iframeName = "elevn-google-forms-iframe";
    let iframe = document.getElementById(iframeName) as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.id = iframeName;
      iframe.setAttribute("style", "position:absolute;width:0;height:0;border:none;visibility:hidden;");
      document.body.appendChild(iframe);
    }
    const form = document.createElement("form");
    form.action = GOOGLE_FORM_ACTION;
    form.method = "POST";
    form.target = iframeName;
    form.style.display = "none";
    pairs.forEach(({ name, value }) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => {
      document.body.removeChild(form);
      resolve();
    }, 500);
  });
}
