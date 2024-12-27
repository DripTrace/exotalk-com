import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

const tiers = [
	{
		name: "Starter",
		id: null,
		href: "#",
		priceMonthly: null,
		description: "Get chatting right away with anyone, anywhere!",
		features: [
			"Unlimited Chats!",
			"Unlimited Chat Rooms!",
			"3 Participant limit in Chat", // Updated this line
			"Supports English & your choice of a second language",
			"48-hour support response time",
		],
	},
	{
		name: "Pro",
		id: "si_PIwRz5C2p21tcS",
		// id: "price_1QIO36DUVJyr2u4g8uE3M7Wz",
		href: "#",
		priceMonthly: "$5.99",
		description: "Unlock the Full Potential with Pro!",
		features: [
			"Everything in Starter",
			"Unlimited Participants in Chats",
			"Supports up to 20 unique languages! (more on the way)",
			"Multimedia support in chats (coming soon)",
			"1-hour, dedicated support response time",
			"Early access to New Features",
		],
	},
];

export async function PricingCards({ redirect }: { redirect: boolean }) {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
				{tiers.map((tier) => (
					<div
						key={tier.id}
						className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
					>
						<div>
							<h3
								id={tier.id + tier.name}
								className="text-base font-semibold leading-7 text-indigo-600"
							>
								{tier.name}
							</h3>
							<div className="mt-4 flex items-baseline gap-x-2">
								{tier.priceMonthly ? (
									<>
										<span className="text-5xl font-bold tracking-tight text-gray-900">
											{tier.priceMonthly}
										</span>
										<span className="text-base font-semibold leading-7 text-gray-600">
											/month
										</span>
									</>
								) : (
									<span className="text-5xl font-bold tracking-tight text-gray-900">
										Free
									</span>
								)}
							</div>
							<p className="mt-6 text-base leading-7 text-gray-600">
								{tier.description}
							</p>
							<ul
								role="list"
								className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
							>
								{tier.features.map((feature) => (
									<li key={feature} className="flex gap-x-3">
										<CheckIcon
											className="h-6 w-5 flex-none text-indigo-600"
											aria-hidden="true"
										/>
										{feature}
									</li>
								))}
							</ul>
						</div>
						{/* {tier.id && <CheckoutButton subscriptionId={tier.id} />} */}
						{redirect ? (
							<Link
								href="/register"
								className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
							>
								Get started today
							</Link>
						) : (
							tier.id && <CheckoutButton />
						)}
					</div>
				))}
			</div>
		</div>
	);
}
