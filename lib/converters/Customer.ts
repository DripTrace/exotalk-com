import { db } from "@/firebase";
import {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
	doc,
} from "firebase/firestore";

export interface Customer {
	email?: string | null;
	stripeId: string;
	stripeLink: string;
}

const customerConverter: FirestoreDataConverter<Customer> = {
	toFirestore: function (customer: Customer): DocumentData {
		return {
			email: customer.email,
			stripeId: customer.stripeId,
			stripeLink: customer.stripeLink,
		};
	},
	fromFirestore: function (
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Customer {
		const data = snapshot.data(options);

		return {
			email: data.email,
			stripeId: data.stripeId,
			stripeLink: data.stripeLink,
		};
	},
};

export const customerRef = (userId: string) =>
	doc(db, "customers", userId).withConverter(customerConverter);
