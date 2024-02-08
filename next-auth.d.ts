import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		firebaseToken?: string;
		user: {
			/** The user's postal address. */
			id?: string;
			availableLanguages?: string[];
			// isNew?: boolean;
			// role?: string;
		} & DefaultSession["user"];
	}
}
