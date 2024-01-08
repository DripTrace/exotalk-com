import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

function UserAvatar({
	name,
	image,
	className,
}: {
	name?: string | null;
	image?: string | null;
	className?: string;
}) {
	return (
		<Avatar className={cn("bg-[#f8f9fd] text-[#070502]", className)}>
			{image && (
				<Image
					src={
						image ||
						"https://cdn.discordapp.com/attachments/1105210253269794846/1116053131625767044/DripTrace_space_mission_3d_game_demo_in_the_style_of_esoteric_i_02047b7b-ce72-41b5-8236-ebb0c93bdd9c.png?ex=659ed0f9&is=658c5bf9&hm=31e9f9a0b2036f08a61f282ad3c8e6c140f637d75cb458296421b37524a669bd&"
					}
					alt={name || "User Name"}
					width={40}
					height={40}
					className="rounded-full"
				/>
			)}
			{/* <AvatarImage src="https://cdn.discordapp.com/attachments/1105210253269794846/1116053112101285888/DripTrace_space_mission_3d_game_demo_in_the_style_of_esoteric_i_609265a6-8679-4962-9a6f-58454494e8ce.png?ex=659ed0f5&is=658c5bf5&hm=bcae36bfe113ea00b0b7def0b9e93657cb2379049ace6e2b73f506cdaca3fbea&" /> */}
			<AvatarFallback
				delayMs={1000}
				// className="dark:bg-[#f8f9fd] dark:text-[#070502] text-lg"
				className="dark:bg-[#f8f9fd] dark:text-[#060602] text-lg"
			>
				{name
					?.split(" ")
					.map((n) => n[0])
					.join("")}
			</AvatarFallback>
		</Avatar>
	);
}

export default UserAvatar;
