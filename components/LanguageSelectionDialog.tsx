"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	LanguagesSupported,
	LanguagesSupportedMap,
	useLanguageStore,
	useAvailableLanguagesStore,
} from "@/store/store";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { toast } from "sonner";

export default function LanguageSelectionDialog() {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] =
		useState<LanguagesSupported | null>(null);

	// Get both the setter and current language from the store
	const [language, setLanguage] = useLanguageStore((state) => [
		state.language,
		state.setLanguage,
	]);

	const { addUserLanguage, availableLanguages } =
		useAvailableLanguagesStore();

	useEffect(() => {
		const checkLanguageSelection = async () => {
			if (!session?.user?.id) return;

			try {
				const userRef = doc(db, "users", session.user.id);
				const userDoc = await getDoc(userRef);
				const userData = userDoc.data();

				if (userData?.secondLanguage) {
					setSelectedLanguage(
						userData.secondLanguage as LanguagesSupported
					);
					setLanguage(userData.secondLanguage as LanguagesSupported);
					addUserLanguage(
						userData.secondLanguage as LanguagesSupported
					);
				}

				if (userData && !userData.hasSelectedSecondLanguage) {
					setIsOpen(true);
				}
			} catch (error) {
				console.error("Error checking language selection:", error);
			}
		};

		checkLanguageSelection();
	}, [session, setLanguage, addUserLanguage]);

	const handleLanguageSelection = async (language: LanguagesSupported) => {
		if (!session?.user?.id) return;

		try {
			await setDoc(
				doc(db, "users", session.user.id),
				{
					availableLanguages: ["en", language],
					hasSelectedSecondLanguage: true,
					secondLanguage: language,
					lastUpdated: new Date().toISOString(),
				},
				{ merge: true }
			);

			// Update all states
			setLanguage(language);
			setSelectedLanguage(language);
			addUserLanguage(language);

			toast.success(
				`${LanguagesSupportedMap[language]} selected as your second language!`
			);
			setIsOpen(false);
		} catch (error) {
			console.error("Error setting language:", error);
			toast.error("Failed to set your language preference");
		}
	};

	// Prevent dialog from being dismissed if no language is selected
	const onOpenChange = (open: boolean) => {
		if (!open && !selectedLanguage) {
			toast.error("Please select a second language");
			return;
		}
		setIsOpen(open);
	};

	if (!session?.user?.id) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Choose Your Second Language</DialogTitle>
					<DialogDescription>
						Select the second language you&apos;d like to use. This
						will be your free language alongside English. You can
						access more languages by upgrading to Pro.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Select
						onValueChange={(value: LanguagesSupported) =>
							handleLanguageSelection(value)
						}
						value={selectedLanguage || undefined}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a language" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(LanguagesSupportedMap)
								.filter(([code]) => code !== "en")
								.map(([code, name]) => (
									<SelectItem
										key={code}
										value={code as LanguagesSupported}
									>
										{name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>
			</DialogContent>
		</Dialog>
	);
}
