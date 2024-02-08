import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
	| "en"
	| "de"
	| "fr"
	| "es"
	| "hi"
	| "ja"
	| "la"
	| "ru"
	| "zh"
	| "ar"
	| "tl"
	| "af"
	| "sq"
	| "am"
	| "hy"
	| "ceb"
	| "as"
	| "ay"
	| "az"
	| "bm"
	| "eu"
	| "be"
	| "bn"
	| "bho"
	| "bs"
	| "bg"
	| "ca"
	| "co"
	| "hr"
	| "cs"
	| "da"
	| "dv"
	| "doi"
	| "nl"
	| "eo"
	| "et"
	| "ee"
	| "fi"
	| "fy"
	| "gl"
	| "ka";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
	en: "English",
	de: "German",
	fr: "French",
	es: "Spanish",
	hi: "Hindi",
	ja: "Japanese",
	la: "Latin",
	ru: "Russian",
	zh: "Mandarin",
	ar: "Arabic",
	tl: "Tagalog",
	af: "Afrikaans",
	sq: "Albanian",
	am: "Amheric",
	hy: "Armenian",
	ceb: "Cebuano",
	as: "Assamese",
	ay: "Aymara",
	az: "Azerbaijani",
	bm: "Bambara",
	eu: "Basque",
	be: "Belarusian",
	bn: "Bengali",
	bho: "Bhojpuri",
	bs: "Bosnian",
	bg: "Bulgarian",
	ca: "Catalan",
	co: "Corsican",
	hr: "Croatian",
	cs: "Czech",
	da: "Danish",
	dv: "Dhivehi",
	doi: "Dogri",
	nl: "Dutch",
	eo: "Estonian",
	et: "Esperanto",
	ee: "Ewe",
	fi: "Finnish",
	fy: "Frisian",
	gl: "Galacian",
	ka: "Georgian",
};

export type AvailableLanguagesState = {
	availableLanguages: LanguagesSupported[];
	userRole: "standard" | "pro";
	addUserLanguage: (language: LanguagesSupported) => void;
	initializeUserLanguages: (role: "standard" | "pro") => void;
};

export const useAvailableLanguagesStore = create<AvailableLanguagesState>(
	(set) => ({
		// Default state setup
		availableLanguages: ["en"], // English by default for all users
		userRole: "standard", // Default user role

		// Function to add a user-selected language
		addUserLanguage: (language) =>
			set((state) => ({
				availableLanguages: state.availableLanguages.includes(language)
					? state.availableLanguages
					: [...state.availableLanguages, language],
			})),

		// Initializes available languages based on the user role
		initializeUserLanguages: (role) =>
			set((state) => ({
				userRole: role,
				availableLanguages:
					role === "pro"
						? (Object.keys(
								LanguagesSupportedMap
						  ) as LanguagesSupported[])
						: state.availableLanguages,
			})),
	})
);

interface LanguageState {
	language: LanguagesSupported;
	setLanguage: (language: LanguagesSupported) => void;
	getLanguages: (isPro: boolean) => LanguagesSupported[];
	getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
	language: "en",
	setLanguage: (language: LanguagesSupported) => set({ language }),
	getLanguages: (isPro: boolean) => {
		// If the user is pro, return all supported languages
		if (isPro)
			return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

		// If not pro, return only the first two languages
		return Object.keys(LanguagesSupportedMap).slice(
			0,
			2
		) as LanguagesSupported[];

		// If not pro, return only English and language of choice
	},
	getNotSupportedLanguages: (isPro: boolean) => {
		if (isPro) return []; // No unsupported languages for "pro" users
		return Object.keys(LanguagesSupportedMap).slice(
			2
		) as LanguagesSupported[]; // Excluding the first two supported languages
	},
}));

interface SubscriptionState {
	subscription: Subscription | null | undefined;
	setSubscription: (subscription: Subscription | null) => void;
	isPro: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>()((set, get) => ({
	subscription: undefined,
	setSubscription: (subscription: Subscription | null) =>
		set({ subscription }),
	isPro: () => {
		const subscription = get().subscription;
		if (!subscription) return false;
		// return subscription.status === "active" && subscription.role === "pro";
		return subscription.status === "active";
	},
}));

// let availableLanguages: string[] = ["en"];
// interface AvailableLanguages {
//     language: LanguagesSupported;
//     setAvailableLanguages: (language: LanguagesSupported) => void;
//     getAvailableLanguages: (userRole: string) => LanguagesSupported[];
//     getNotAvailableLanguages: (userRole: boolean) => LanguagesSupported[];
// }
