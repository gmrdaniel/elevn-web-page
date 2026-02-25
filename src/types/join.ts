export const PLATFORM_KEYS = [
  "youtube",
  "instagram",
  "tiktok",
  "facebook",
  "twitch",
  "twitter",
  "kick",
  "other",
] as const;

export type PlatformKey = (typeof PLATFORM_KEYS)[number];

export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  twitch: "Twitch",
  twitter: "Twitter X",
  kick: "Kick",
  other: "Other",
};

/** Platform colors (active border) */
export const PLATFORM_COLORS: Record<PlatformKey, string> = {
  youtube: "#FF0000",
  instagram: "#E4405F",
  tiktok: "#000000",
  facebook: "#1877F2",
  twitch: "#9146FF",
  twitter: "#000000",
  kick: "#53FC18",
  other: "#6641ed",
};

const URL_PATTERNS: Record<PlatformKey, RegExp[]> = {
  youtube: [/youtube\.com\/watch/, /youtube\.com\/channel\//, /youtube\.com\/@/, /youtu\.be\//],
  instagram: [/instagram\.com\//],
  tiktok: [/tiktok\.com\//],
  facebook: [/facebook\.com\//, /fb\.com\//, /fb\.watch\//],
  twitch: [/twitch\.tv\//],
  twitter: [/twitter\.com\//, /x\.com\//],
  kick: [/kick\.com\//],
  other: [/^https:\/\//i], // https only
};

export function isPlatformUrlValid(key: PlatformKey, url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return true;
  const patterns = URL_PATTERNS[key];
  return patterns.some((p) => p.test(trimmed));
}

export const NICHE_OPTIONS = [
  "Gaming",
  "Beauty & Makeup",
  "Fashion",
  "Fitness",
  "Food & Cooking",
  "Travel",
  "Tech",
  "Education",
  "Comedy",
  "Music",
  "Lifestyle",
  "Sports",
  "Business",
  "Art & Design",
  "Gastronomy",
  "Other",
] as const;

export type NicheOption = (typeof NICHE_OPTIONS)[number];

export interface PlatformEntry {
  url: string;
  followers: string;
}

export interface JoinFormData {
  fullName: string;
  email: string;
  /** Country of residence */
  countryOfResidence: string;
  phoneCountryCode: string;
  phoneNumber: string;
  niches: NicheOption[];
  platforms: Record<PlatformKey, PlatformEntry>;
  /** Only relevant when platforms.youtube.url is set. Sí = true, No = false. */
  youtubeMonetized: boolean | null;
  message: string;
}

export const DEFAULT_PLATFORM_ENTRY: PlatformEntry = { url: "", followers: "" };

export const COUNTRY_CODES = [
  { value: "+52", label: "Mexico (+52)" },
  { value: "+1", label: "USA/Canada (+1)" },
  { value: "+34", label: "Spain (+34)" },
  { value: "+57", label: "Colombia (+57)" },
  { value: "+54", label: "Argentina (+54)" },
  { value: "+55", label: "Brazil (+55)" },
  { value: "+56", label: "Chile (+56)" },
  { value: "+51", label: "Peru (+51)" },
  { value: "+58", label: "Venezuela (+58)" },
  { value: "+593", label: "Ecuador (+593)" },
  { value: "+502", label: "Guatemala (+502)" },
  { value: "+507", label: "Panama (+507)" },
  { value: "+506", label: "Costa Rica (+506)" },
  { value: "+503", label: "El Salvador (+503)" },
  { value: "+504", label: "Honduras (+504)" },
  { value: "+505", label: "Nicaragua (+505)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+86", label: "China (+86)" },
  { value: "+91", label: "India (+91)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "", label: "Other" },
];

export function createInitialPlatforms(): Record<PlatformKey, PlatformEntry> {
  return PLATFORM_KEYS.reduce(
    (acc, key) => {
      acc[key] = { ...DEFAULT_PLATFORM_ENTRY };
      return acc;
    },
    {} as Record<PlatformKey, PlatformEntry>
  );
}

export const INITIAL_JOIN_FORM_DATA: JoinFormData = {
  fullName: "",
  email: "",
  countryOfResidence: "",
  phoneCountryCode: "+52",
  phoneNumber: "",
  niches: [],
  platforms: createInitialPlatforms(),
  youtubeMonetized: null,
  message: "",
};
