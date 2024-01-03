"use client";

import { useSubscriptionStore } from "@/store/store";
import { StarIcon } from "@heroicons/react/20/solid";

function ProBadge() {
	const subscription = useSubscriptionStore((state) => state.subscription);

	const isLoadingSubscription = subscription === undefined;
	const isSubscribed = subscription?.status === "active";
	// subscription?.status === "active" && subscription?.role === "pro";

	if (isLoadingSubscription) return null;

	return (
		<div>
			{isSubscribed ? (
				<div className="flex items-center">
					<p>PRO</p>
					<StarIcon className="w-5 h-5 text-yellow-500" />
				</div>
			) : (
				<div>
					<StarIcon className="w-5 h-5 text-gray-500" />
				</div>
			)}
		</div>
	);
}

export default ProBadge;
