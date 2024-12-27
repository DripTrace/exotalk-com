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
// import { useSubscriptionStore } from "@/store/store";
// import { useToast } from "./ui/use-toast";
// import { ToastAction } from "./ui/toast";
// import { useRouter } from "next/navigation";

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
	// const subscription = useSubscriptionStore((state) => state.subscription);
	// const { toast } = useToast();
	// const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!values.input || values.input.length === 0) {
			console.warn("Input is empty.");
			return;
		}

		if (!session?.user) {
			console.error("User is not authenticated.");
			return;
		}

		const userToStore: User = {
			id: session.user.id!,
			name: session.user.name!,
			email: session.user.email!,
			image: session.user.image || "",
		};

		try {
			console.log("Submitting message:", values.input);
			console.log("User Data:", userToStore);

			await addDoc(messagesRef(chatId), {
				input: values.input,
				timestamp: serverTimestamp(),
				user: userToStore,
			});

			form.reset();
			console.log("Message submitted successfully.");
		} catch (error) {
			console.error("Failed to submit message:", error);
		}
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
