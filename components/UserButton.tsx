"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
// import LoadingSpinner from "./LoadingSpinner";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";
import LoadingSpinner from "./loadingSpinner";
// import LoadingSpinner from "./LoadingSpinner";

function UserButton({ session }: { session: Session | null }) {
	const subscription = useSubscriptionStore((state) => state.subscription);

	// Session ...
	if (!session)
		return (
			<Button className="" variant={"outline"} onClick={() => signIn()}>
				Sign In
			</Button>
		);
	return (
		session && (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar
						// name="Russell Palma"
						// image="https://cdn.discordapp.com/attachments/1105210253269794846/1116053121815289856/DripTrace_space_mission_3d_game_demo_in_the_style_of_esoteric_i_31659453-ccc8-4484-a945-448d8700fdee.png?ex=659ed0f7&is=658c5bf7&hm=27e81baf73330b00a45b9e31df7667b06642b370140731e9f2d8bd02b438214a&"
						name={session.user?.name}
						image={session.user?.image}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
					<DropdownMenuSeparator />

					{subscription === undefined && (
						<DropdownMenuItem>
							<LoadingSpinner />
						</DropdownMenuItem>
					)}

					{/* {subscription?.role === "pro" && ( */}
					{subscription?.status === "active" && (
						<>
							<DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-{#E935C1] animate-pulse">
								<StarIcon fill="#E935C1" />
								<p>PRO</p>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<ManageAccountButton />
							</DropdownMenuItem>
						</>
					)}

					<DropdownMenuItem onClick={() => signOut()}>
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	);
}

export default UserButton;
