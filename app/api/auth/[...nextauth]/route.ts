import { authOptions } from "@/auth";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";

// export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// 	const data = requestWrapper(req, res);
// 	return await NextAuth(...data);
// 	// return await NextAuth(authOptions);
// };

// export function requestWrapper(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ): [req: NextApiRequest, res: NextApiResponse, opts: NextAuthOptions] {
// 	const generateSessionToken = () => randomUUID();

// 	const fromDate = (time: number, date = Date.now()) =>
// 		new Date(date + time * 1000);

// 	// const adapter = PrismaAdapter(prisma);

// 	const opts = authOptions;

// 	return [req, res, opts];
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
