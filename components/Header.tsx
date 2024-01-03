import React from "react";
import Logo from "./Logo";
import { DarkModeToggle } from "./DarkModeToggle";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";

async function Header() {
	const session = await getServerSession(authOptions);
	// console.log(session);

	return (
		// <header className="sticky top-0 z-50 bg-[#f8f9fd] dark:bg-[#070502]">
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
			{/* // <header className="sticky top-0 z-50 bg-white dark:bg-[#070502]">
		// <header className="sticky top-0 z-50 bg-[#f8f9fd] dark:bg-[#060602]"> */}
			{/* <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-[#f8f9fd] dark:bg-[#070502] max-w-7xl mx-auto"> */}
			<nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
				{/* <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-[#070502] max-w-7xl mx-auto"> */}
				{/* <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-[#f8f9fd] dark:bg-[#080805] max-w-7xl mx-auto"> */}
				<Logo />

				<div className="flex-1 flex items-center justify-end space-x-4">
					<LanguageSelect />

					{session ? (
						<>
							<Link href={"/chat"} prefetch={false}>
								{/* <MessagesSquare className="text-[#070502] dark:text-[#f8f9fd]" /> */}
								{/* <MessagesSquare className="text-[#060602] dark:text-[#f8f9fd]" /> */}
								<MessagesSquareIcon className="text-dark-gray-900 dark:text-white" />
							</Link>
							<CreateChatButton />
						</>
					) : (
						<Link href="/pricing">Pricing</Link>
					)}

					<DarkModeToggle />
					<UserButton session={session} />
				</div>
			</nav>

			<UpgradeBanner />
		</header>
	);
}

export default Header;
