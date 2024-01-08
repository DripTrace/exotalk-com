import { FirestoreAdapter } from "@auth/firebase-adapter";
import {
	collection,
	query,
	getDocs,
	addDoc,
	where,
	serverTimestamp,
} from "firebase/firestore";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { adminAuth, adminDb } from "./firebase-admin";

import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";

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
		session: async ({ session, token }) => {
			if (session?.user) {
				if (token?.sub) {
					session.user.id = token.sub;

					const firebaseToken = await adminAuth.createCustomToken(
						token.sub
					);
					session.firebaseToken = firebaseToken;

					if (token.trigger == "signUp") {
						session.user.isNew = true;
					} else {
						session.user.isNew = false;
					}
				}
				console.log("newUser: ", session.user.isNew);
			}
			// console.log("sessionCallback: ", session);
			return session;
		},
		jwt: async ({ user, token, trigger, account, profile, session }) => {
			if (user) {
				token.sub = user.id;
				token.trigger = trigger;
				token.account = account;
				token.profile = profile;
				// undefined
				// token.session = session;
				// token.role = user.role;
			}
			console.log("userProfile: ", token.profile);
			console.log("userAccount: ", token.account);
			// undefined
			// console.log("userSession: ", token.session);
			console.log("userTrigger: ", token.trigger);
			// console.log("jwtCallback: ", token);

			return token;
		},
		// signIn: async (user) => {
		// 	return true;
		// },
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

// Use it in server contexts
export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions);
}
