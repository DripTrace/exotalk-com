import { FirestoreAdapter } from "@auth/firebase-adapter";
import {
	collection,
	query,
	getDocs,
	where,
	serverTimestamp,
	doc,
	setDoc,
} from "firebase/firestore";
import { NextAuthOptions, getServerSession, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { adminAuth, adminDb } from "./firebase-admin";
import { db } from "./firebase";
import { DocumentData } from "firebase-admin/firestore";
import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";

declare module "next-auth" {
	interface Session {
		user: {
			id?: string;
			availableLanguages?: string[];
			hasSelectedSecondLanguage?: boolean;
		} & DefaultSession["user"];
		firebaseToken?: string;
	}
}

type firestoreDocument = Record<string, DocumentData>;

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
				token.sub = user.id;
				token.trigger = trigger;
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
						const userData = {
							userRole: "standard",
							availableLanguages: ["en"],
							hasSelectedSecondLanguage: false,
							lastUpdated: new Date().toISOString(),
						};

						await adminDb
							.collection("users")
							.doc(session.user.id)
							.set(userData, { merge: true });

						await setDoc(
							doc(db, "users", session.user.id),
							userData,
							{ merge: true }
						);
					} else {
						console.log("returning user");
					}

					// Get the latest user data after potential updates
					const userDoc = await adminDb
						.collection("users")
						.doc(session.user.id)
						.get();

					const userData = userDoc.data();
					if (userData) {
						session.user.availableLanguages =
							userData.availableLanguages || ["en"];
						session.user.hasSelectedSecondLanguage =
							userData.hasSelectedSecondLanguage;
					}
				}
			}
			return session;
		},
	},
	pages: {
		newUser: "/pricing",
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

export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions);
}
