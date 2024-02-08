import { FirestoreAdapter } from "@auth/firebase-adapter";
import {
	collection,
	query,
	getDocs,
	addDoc,
	where,
	serverTimestamp,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { adminAuth, adminDb } from "./firebase-admin";

type firestoreDocument = Record<string, DocumentData>;

import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import { db } from "./firebase";
import { DocumentData } from "firebase-admin/firestore";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

//@ts-ignore
export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		jwt: async ({ user, token, trigger, account, profile, session }) => {
			if (user) {
				// console.log("jtwCallback: ", token);
				// const authTokenQuery = query(
				// 	collection(db, "users"),
				// 	where("email", "==", token.email)
				// );
				// const authTokenSnapshot = await getDocs(authTokenQuery);
				// const userCollection: Record<string, Object> = {};
				// authTokenSnapshot.forEach((doc) => {
				// 	const a = doc.data();
				// 	a["_id"] = doc.id;
				// 	userCollection[doc.id] = a;
				// });
				// const userToken: any = Object.values(userCollection)[0];
				// console.log("userTokenDatabase: ", userToken);

				token.sub = user.id;
				token.trigger = trigger;
				// token.account = account;
				// token.profile = profile;
			}

			return token;
		},
		session: async ({ session, token }) => {
			if (session?.user) {
				if (token?.sub) {
					session.user.id = token.sub;

					const authTokenQuery = query(
						collection(db, "users"),
						where("email", "==", token.email)
					);
					const authTokenSnapshot = await getDocs(authTokenQuery);
					let userCollection: firestoreDocument = {};
					authTokenSnapshot.forEach((doc) => {
						let a = doc.data();
						a["_id"] = doc.id;
						userCollection[doc.id] = a;
					});

					const firebaseToken = await adminAuth.createCustomToken(
						token.sub
					);
					console.log(firebaseToken);
					session.firebaseToken = firebaseToken;

					if (token.trigger == "signUp") {
						// session.user.isNew = true;

						// const userToken: firestoreDocument =
						// 	Object.values(userCollection)[0];
						// console.log("userTokenDatabase: ", userToken);

						const userData = {
							userRole: "standard",
							availableLanguages: ["en"],
							// timestamp: serverTimestamp(),
						};
						// const userDoc = doc(db, "users", session.user.id);
						// await updateDoc(userDoc, userData);

						await adminDb
							.collection("users")
							.doc(session.user.id)
							.update(userData);

						console.log(
							`${session.user.id} is given the standard role`
						);
					} else {
						// session.user.isNew = false;
						console.log("returning user");
					}
					// session.user.availableLanguages =
					// userCollection?.availableLanguages || ["en"]; // Default to English if not set
					const userToken: firestoreDocument =
						Object.values(userCollection)[0];
					if (userToken) {
						const { availableLanguages } = userToken;
						session.user.availableLanguages =
							availableLanguages as string[];
						console.log(userToken);
					}

					// console.log(userToken);
					// Query Firestore for the user's available languages
					// const userRef = doc(adminDb, "users", session.user.id);
					// const userDoc = await getDoc(userRef);
					// if (user.exists()) {
					// 	const userData = userDoc.data();
					// 	session.user.availableLanguages =
					// 		userData.availableLanguages || ["en"]; // Default to English if not set
					// }
				}
			}
			return session;
		},
		// signIn: async (user) => {
		// 	return true;
		// },
	},
	pages: {
		newUser: "/pricing",
		// signIn: "/signin",
	},
	session: {
		strategy: "jwt",
		maxAge: THIRTY_DAYS,
		updateAge: THIRTY_MINUTES,
	},
	//@ts-ignore
	adapter: FirestoreAdapter(adminDb),
	events: {},
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions);
}
