import LogoImage from "@logos/favicon.svg";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
function Logo() {
	return (
		<Link href="/" prefetch={false} className="overflow-hidden pb-2">
			<div className="flex items-center">
				<div className="flex items-center w-14 h-14">
					<AspectRatio
						ratio={16 / 9}
						className="flex items-center justify-center"
					>
						<Image
							priority
							src={LogoImage}
							alt="Exotalk logo"
							className="rounded-full dark:filter dark:invert"
						/>
					</AspectRatio>
				</div>
				<b className="pl-2">Exotalk</b>
			</div>
		</Link>
	);
}

export default Logo;
