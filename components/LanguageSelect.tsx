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
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { toast } from "sonner";
import { useEffect } from "react";

function LanguageSelect() {
	const { data: session } = useSession();

	const [language, setLanguage] = useLanguageStore((state) => [
		state.language,
		state.setLanguage,
	]);

	const { addUserLanguage, availableLanguages } =
		useAvailableLanguagesStore();

	const subscription = useSubscriptionStore((state) => state.subscription);
	const isPro = subscription?.status === "active";

	// Load user's language settings on mount
	useEffect(() => {
		const loadUserLanguages = async () => {
			if (!session?.user?.id) return;

			const userRef = doc(db, "users", session.user.id);
			const userDoc = await getDoc(userRef);
			const userData = userDoc.data();

			if (userData?.secondLanguage) {
				setLanguage(userData.secondLanguage as LanguagesSupported);
				addUserLanguage(userData.secondLanguage as LanguagesSupported);
			}
		};

		loadUserLanguages();
	}, [session, setLanguage, addUserLanguage]);

	const pathName = usePathname();
	const isChatPage = pathName.includes("/chat");

	if (!isChatPage) return null;

	return (
		<div>
			<Select
				value={language}
				onValueChange={(value: LanguagesSupported) =>
					setLanguage(value)
				}
			>
				<SelectTrigger className="w-[150px] text-black dark:text-white">
					<SelectValue
						placeholder={LanguagesSupportedMap[language]}
					/>
				</SelectTrigger>

				<SelectContent>
					{subscription === undefined ? (
						<LoadingSpinner />
					) : (
						<ScrollArea className="h-72 w-48 rounded-md border">
							{/* For all users, show English and their selected second language */}
							{session?.user?.availableLanguages?.map((code) => (
								<SelectItem
									key={code}
									value={code as LanguagesSupported}
								>
									{
										LanguagesSupportedMap[
											code as LanguagesSupported
										]
									}
								</SelectItem>
							))}

							{/* For Pro users, show all other languages */}
							{isPro &&
								Object.entries(LanguagesSupportedMap)
									.filter(
										([code]) =>
											!session?.user?.availableLanguages?.includes(
												code
											)
									)
									.map(([code, name]) => (
										<SelectItem
											key={code}
											value={code as LanguagesSupported}
										>
											{name}
										</SelectItem>
									))}

							{/* For free users, show locked languages */}
							{!isPro &&
								Object.entries(LanguagesSupportedMap)
									.filter(
										([code]) =>
											!session?.user?.availableLanguages?.includes(
												code
											)
									)
									.map(([code, name]) => (
										<Link
											href="/register"
											key={code}
											prefetch={false}
										>
											<SelectItem
												key={code}
												value={
													code as LanguagesSupported
												}
												disabled
												className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
											>
												{name} (PRO)
											</SelectItem>
										</Link>
									))}
						</ScrollArea>
					)}
				</SelectContent>
			</Select>
		</div>
	);
}

export default LanguageSelect;
