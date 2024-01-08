"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import {
	User,
	limitedMessagesRef,
	messagesRef,
} from "@/lib/converters/Message";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			input: "",
		},
	});

	const { data: session } = useSession();
	const subscription = useSubscriptionStore((state) => state.subscription);
	const { toast } = useToast();
	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.input.length === 0) {
			return;
		}

		if (!session?.user) {
			return;
		}

		// We need to get the users current chats to check if they're about to exceed the PRO plan
		const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
			(doc) => doc.data()
		).length;

		// check if the user is about to exceed the PRO plan which is 20 messages inside a chat
		const isPro =
			//   subscription?.role === "pro" && subscription.status === "active";
			subscription?.status === "active";

		if (!isPro && messages >= 20) {
			toast({
				title: "Free plan limit exceeded",
				description:
					"You've'exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
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

			return;
		}

		// -----------------------------

		const userToStore: User = {
			id: session.user.id!,
			name: session.user.name!,
			email: session.user.email!,
			image: session.user.image || "",
			role: session.user.role!,
		};

		addDoc(messagesRef(chatId), {
			input: values.input,
			timestamp: serverTimestamp(),
			user: userToStore,
		});

		form.reset();
	}

	return (
		<div className="sticky bottom-0">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
				>
					<FormField
						control={form.control}
						name="input"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input
										className="border-none bg-transparent dark:placeholder:text-white/70"
										placeholder="Enter message in ANY language..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="bg-violet-600 text-white">
						Send
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default ChatInput;
