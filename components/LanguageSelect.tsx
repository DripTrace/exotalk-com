"use client";

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
	useAvailableLanguagesStore,
	useLanguageStore,
	useSubscriptionStore,
} from "@/store/store";
import LoadingSpinner from "./loadingSpinner";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { adminDb } from "@/firebase-admin";
import { doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";

function LanguageSelect() {
	const { data: session } = useSession();
	console.log(session);

	// async function updateUserAvailableLanguages(
	// 	userId: string,
	// 	languages: string[]
	// ) {
	// 	const userRef = doc(db, "users", userId);
	// 	await updateDoc(userRef, {
	// 		availableLanguages: languages,
	// 	});
	// }

	const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
		useLanguageStore((state) => [
			state.language,
			state.setLanguage,
			state.getLanguages,
			state.getNotSupportedLanguages,
		]);

	const { addUserLanguage, availableLanguages } = useAvailableLanguagesStore(
		(state) => ({
			addUserLanguage: state.addUserLanguage,
			availableLanguages: state.availableLanguages,
		})
	);

	const handleLanguageSelection = async (language: LanguagesSupported) => {
		// Update Zustand state
		addUserLanguage(language);

		// Update Firestore document for the user
		if (session) {
			const userRef = doc(db, "users", session.user.id as string); // Adjust to match your users collection path
			try {
				await updateDoc(userRef, {
					availableLanguages: [...availableLanguages, language],
				});
				console.log(`adding ${language} to language selection`);
			} catch (error) {
				console.error(
					"Failed to update user's available languages:",
					error
				);
			}
		}
	};

	const subscription = useSubscriptionStore((state) => state.subscription);
	console.log(subscription);
	//   const isPro = subscription?.role === "pro";
	const isPro = subscription?.status === "active";

	const pathName = usePathname();
	const isChatPage = pathName.includes("/chat");

	return (
		isChatPage && (
			<div>
				<Select
					// onValueChange={(value: LanguagesSupported) =>
					// 	setLanguage(value)
					// }
					onValueChange={(e: LanguagesSupported) =>
						handleLanguageSelection(e)
					}
				>
					<SelectTrigger className="w-[150px] text-black dark:text-white">
						<SelectValue
							placeholder={LanguagesSupportedMap[language]}
							className=""
						/>
					</SelectTrigger>

					<SelectContent>
						{subscription === undefined ? (
							<LoadingSpinner />
						) : (
							<>
								<ScrollArea className="h-72 w-48 rounded-md border">
									{/* {availableLanguages.map((language) => (
										<SelectItem
											key={language}
											value={language}
										>
											{LanguagesSupportedMap[language]}
										</SelectItem>
									))} */}
									{getLanguages(isPro).map((language) => (
										<SelectItem
											key={language}
											value={language}
										>
											{LanguagesSupportedMap[language]}
										</SelectItem>
									))}
									{getNotSupportedLanguages(isPro).map(
										(language) => (
											<Link
												href={"/register"}
												key={language}
												prefetch={false}
											>
												<SelectItem
													key={language}
													value={language}
													disabled
													className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
												>
													{
														LanguagesSupportedMap[
															language
														]
													}{" "}
													(PRO)
												</SelectItem>
											</Link>
										)
									)}
								</ScrollArea>
							</>
						)}
					</SelectContent>
				</Select>
			</div>
		)
	);
}

export default LanguageSelect;
