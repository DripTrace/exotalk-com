import { FirestoreAdapter } from "@auth/firebase-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { adminAuth, adminDb } from "./firebase-admin";
import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
				}
			}
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
	session: {
		strategy: "jwt",
	},
	adapter: FirestoreAdapter(adminDb),
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