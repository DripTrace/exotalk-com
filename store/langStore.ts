import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupportedISO639 =
	// Afrikaans
	| "af"
	// Albanian
	| "sq"
	// Amharic
	| "am"
	// Arabic
	| "ar"
	// Armenian
	| "hy"
	// Assamese
	| "as"
	// Aymara
	| "ay"
	// Azerbaijani
	| "az"
	// Bambara
	| "bm"
	// Basque
	| "eu"
	// Belarusian
	| "be"
	// Bengali
	| "bn"
	// Bhojpuri
	| "bho"
	// Bosnian
	| "bs"
	// Bulgarian
	| "bg"
	// Catalan
	| "ca"
	// Cebuano
	| "ceb"
	// Chinese (Simplified)
	//   | "zh-CN"
	| "zh"
	//   or
	//   | "zh"
	//   (BCP-47)
	// Chinese (Traditional)
	//   | "zh-TW"
	//   (BCP-47)
	// Corsican
	| "co"
	// Croatian
	| "hr"
	// Czech
	| "cs"
	// Danish
	| "da"
	// Dhivehi
	| "dv"
	// Dogri
	| "doi"
	// Dutch
	| "nl"
	// English
	| "en"
	// Esperanto
	| "eo"
	// Estonian
	| "et"
	// Ewe
	| "ee"
	// Filipino (Tagalog)
	| "fil"
	// Finnish
	| "fi"
	// French
	| "fr"
	// Frisian
	| "fy"
	// Galician
	| "gl"
	// Georgian
	| "ka"
	// German
	| "de"
	// Greek
	| "el"
	// Guarani
	| "gn"
	// Gujarati
	| "gu"
	// Haitian Creole
	| "ht"
	// Hausa
	| "ha"
	// Hawaiian
	| "haw"
	// Hebrew
	| "he"
	//   or
	| "iw"
	// Hindi
	| "hi"
	// Hmong
	| "hmn"
	// Hungarian
	| "hu"
	// Icelandic
	| "is"
	// Igbo
	| "ig"
	// Ilocano
	| "ilo"
	// Indonesian
	| "id"
	// Irish
	| "ga"
	// Italian
	| "it"
	// Japanese
	| "ja"
	// Javanese
	| "jv"
	//   or
	| "jw"
	// Kannada
	| "kn"
	// Kazakh
	| "kk"
	// Khmer
	| "km"
	// Kinyarwanda
	| "rw"
	// Konkani
	| "gom"
	// Korean
	| "ko"
	// Krio
	| "kri"
	// Kurdish
	| "ku"
	// Kurdish (Sorani)
	| "ckb"
	// Kyrgyz
	| "ky"
	// Lao
	| "lo"
	// Latin
	| "la"
	// Latvian
	| "lv"
	// Lingala
	| "ln"
	// Lithuanian
	| "lt"
	// Luganda
	| "lg"
	// Luxembourgish
	| "lb"
	// Macedonian
	| "mk"
	// Maithili
	| "mai"
	// Malagasy
	| "mg"
	// Malay
	| "ms"
	// Malayalam
	| "ml"
	// Maltese
	| "mt"
	// Maori
	| "mi"
	// Marathi
	| "mr"
	// Meiteilon (Manipuri)
	//   | "mni-Mtei"
	| "mni"
	//   | "Mtei"
	// Mizo
	| "lus"
	// Mongolian
	| "mn"
	// Myanmar (Burmese)
	| "my"
	// Nepali
	| "ne"
	// Norwegian
	| "no"
	// Nyanja (Chichewa)
	| "ny"
	// Odia (Oriya)
	| "or"
	// Oromo
	| "om"
	// Pashto
	| "ps"
	// Persian
	| "fa"
	// Polish
	| "pl"
	// Portuguese (Portugal, Brazil)
	| "pt"
	// Punjabi
	| "pa"
	// Quechua
	| "qu"
	// Romanian
	| "ro"
	// Russian
	| "ru"
	// Samoan
	| "sm"
	// Sanskrit
	| "sa"
	// Scots Gaelic
	| "gd"
	// Sepedi
	| "nso"
	// Serbian
	| "sr"
	// Sesotho
	| "st"
	// Shona
	| "sn"
	// Sindhi
	| "sd"
	// Sinhala (Sinhalese)
	| "si"
	// Slovak
	| "sk"
	// Slovenian
	| "sl"
	// Somali
	| "so"
	// Spanish
	| "es"
	// Sundanese
	| "su"
	// Swahili
	| "sw"
	// Swedish
	| "sv"
	// Tagalog (Filipino)
	| "tl"
	// Tajik
	| "tg"
	// Tamil
	| "ta"
	// Tatar
	| "tt"
	// Telugu
	| "te"
	// Thai
	| "th"
	// Tigrinya
	| "ti"
	// Tsonga
	| "ts"
	// Turkish
	| "tr"
	// Turkmen
	| "tk"
	// Twi (Akan)
	| "ak"
	// Ukrainian
	| "uk"
	// Urdu
	| "ur"
	// Uyghur
	| "ug"
	// Uzbek
	| "uz"
	// Vietnamese
	| "vi"
	// Welsh
	| "cy"
	// Xhosa
	| "xh"
	// Yiddish
	| "yi"
	// Yoruba
	| "yo"
	// Zulu
	| "zu";

export const LanguagesSupportedISO639Map: Record<
	LanguagesSupportedISO639,
	string
> = {
	af: "Afrikaans",
	sq: "Albanian",
	am: "Amharic",
	ar: "Arabic",
	hy: "Armenian",
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
	ceb: "Cebuano",
	// "zh-CN": "Chinese (Simplified)"
	zh: "Chinese (Simplified)",
	// CN "Chinese (Simplified)",
	//   or
	// zh: "(BCP-47)"
	// "zh-TW": "Chinese (Traditional) (BCP-47)"
	// TW: "Chinese (Traditional) (BCP-47)",
	co: "Corsican",
	hr: "Croatian",
	cs: "Czech",
	da: "Danish",
	dv: "Dhivehi",
	doi: "Dogri",
	nl: "Dutch",
	en: "English",
	eo: "Esperanto",
	et: "Estonian",
	ee: "Ewe",
	fil: "Filipino (Tagalog)",
	fi: "Finnish",
	fr: "French",
	fy: "Frisian",
	gl: "Galician",
	ka: "Georgian",
	de: "German",
	el: "Greek",
	gn: "Guarani",
	gu: "Gujarati",
	ht: "Haitian Creole",
	ha: "Hausa",
	haw: "Hawaiian",
	he: "Hebrew",
	//   or
	iw: "Hebrew",
	hi: "Hindi",
	hmn: "Hmong",
	hu: "Hungarian",
	is: "Icelandic",
	ig: "Igbo",
	ilo: "Ilocano",
	id: "Indonesian",
	ga: "Irish",
	it: "Italian",
	ja: "Japanese",
	jv: "Javanese",
	//   or
	jw: "Javanes",
	kn: "Kannada",
	kk: "Kazakh",
	km: "Khmer",
	rw: "Kinyarwanda",
	gom: "Konkani",
	ko: "Korean",
	kri: "Krio",
	ku: "Kurdish",
	ckb: "Kurdish (Sorani)",
	ky: "Kyrgyz",
	lo: "Lao",
	la: "Latin",
	lv: "Latvian",
	ln: "Lingala",
	lt: "Lithuanian",
	lg: "Luganda",
	lb: "Luxembourgish",
	mk: "Macedonian",
	mai: "Maithili",
	mg: "Malagasy",
	ms: "Malay",
	ml: "Malayalam",
	mt: "Maltese",
	mi: "Maori",
	mr: "Marathi",
	// mni-Mtei: "Meiteilon (Manipuri)",
	mni: "Meiteilon (Manipuri)",
	// Mtei: "Meiteilon (Manipuri)",
	lus: "Mizo",
	mn: "Mongolian",
	my: "Myanmar (Burmese)",
	ne: "Nepali",
	no: "Norwegian",
	ny: "Nyanja (Chichewa)",
	or: "Odia (Oriya)",
	om: "Oromo",
	ps: "Pashto",
	fa: "Persian",
	pl: "Polish",
	pt: "Portuguese (Portugal, Brazil)",
	pa: "Punjabi",
	qu: "Quechua",
	ro: "Romanian",
	ru: "Russian",
	sm: "Samoan",
	sa: "Sanskrit",
	gd: "Scots Gaelic",
	nso: "Sepedi",
	sr: "Serbian",
	st: "Sesotho",
	sn: "Shona",
	sd: "Sindhi",
	si: "Sinhala (Sinhalese)",
	sk: "Slovak",
	sl: "Slovenian",
	so: "Somali",
	es: "Spanish",
	su: "Sundanese",
	sw: "Swahili",
	sv: "Swedish",
	tl: "Tagalog (Filipino)",
	tg: "Tajik",
	ta: "Tamil",
	tt: "Tatar",
	te: "Telugu",
	th: "Thai",
	ti: "Tigrinya",
	ts: "Tsonga",
	tr: "Turkish",
	tk: "Turkmen",
	ak: "Twi (Akan)",
	uk: "Ukrainian",
	ur: "Urdu",
	ug: "Uyghur",
	uz: "Uzbek",
	vi: "Vietnamese",
	cy: "Welsh",
	xh: "Xhosa",
	yi: "Yiddish",
	yo: "Yoruba",
	zu: "Zulu",
};

interface LanguageState {
	language: LanguagesSupportedISO639;
	setLanguage: (language: LanguagesSupportedISO639) => void;
	getLanguages: (isPro: boolean) => LanguagesSupportedISO639[];
	getNotSupportedLanguages: (isPro: boolean) => LanguagesSupportedISO639[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
	language: "en",
	setLanguage: (language: LanguagesSupportedISO639) => set({ language }),
	getLanguages: (isPro: boolean) => {
		// If the user is pro, return all supported languages
		if (isPro)
			return Object.keys(
				LanguagesSupportedISO639Map
			) as LanguagesSupportedISO639[];

		// If not pro, return only the first two languages
		return Object.keys(LanguagesSupportedISO639Map).slice(
			0,
			2
		) as LanguagesSupportedISO639[];
	},
	getNotSupportedLanguages: (isPro: boolean) => {
		if (isPro) return []; // No unsupported languages for "pro" users
		return Object.keys(LanguagesSupportedISO639Map).slice(
			2
		) as LanguagesSupportedISO639[]; // Excluding the first two supported languages
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
