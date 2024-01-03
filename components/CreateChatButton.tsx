"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
	addChatRef,
	chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatsMembers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "./loadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { MessageSquarePlusIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
	const { data: session } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const subscription = useSubscriptionStore((state) => state.subscription);
	// console.log(subscription);

	const createNewChat = async () => {
		if (!session?.user.id) return;

		setLoading(true);
		toast({
			title: "Creating new chat...",
			description: "Hold tight while we create your new chat...",
			duration: 3000,
		});

		// We need to get the users current chats to check if they're about to exceed the PRO plan
		const chats = (
			await getDocs(chatMembersCollectionGroupRef(session.user.id))
		).docs.map((doc) => doc.data());

		// check if the user is about to exceed the PRO plan which is 3 chats
		const isPro = subscription?.status === "active";
		//   subscription?.role === "pro" && subscription.status === "active";

		if (!isPro && chats.length >= 3) {
			toast({
				title: "Free plan limit exceeded",
				description:
					"You've'exceeded the limit of chats for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
				variant: "destructive",
				action: (
					<ToastAction
						altText="Upgrade"
						onClick={() => router.push("/register")}
					>
						Upgrade to PRO
					</ToastAction>
				),
			});

			setLoading(false);

			return;
		}

		const chatId = uuidv4();
		await setDoc(addChatRef(chatId, session.user.id), {
			userId: session.user.id!,
			email: session.user.email!,
			timestamp: serverTimestamp(),
			isAdmin: true,
			chatId: chatId,
			image: session.user.image || "",
		})
			.then(() => {
				toast({
					title: "Success",
					description: "Your chat has been created!",
					className: "bg-green-600 text-white",
					duration: 2000,
				});
				router.push(`/chat/${chatId}`);
			})
			.catch(() => {
				toast({
					title: "Error",
					description: "There was an error creating your chat!",
					variant: "destructive",
				});
			})
			.finally(() => setLoading(false));
	};

	if (isLarge)
		return (
			<div>
				<Button variant={"default"} onClick={createNewChat}>
					{loading ? <LoadingSpinner /> : "Create a New Chat"}
				</Button>
			</div>
		);

	return (
		<div>
			<Button size={"icon"} variant={"ghost"} onClick={createNewChat}>
				{loading ? <LoadingSpinner /> : <MessageSquarePlusIcon />}
			</Button>
		</div>
	);
}

export default CreateChatButton;
