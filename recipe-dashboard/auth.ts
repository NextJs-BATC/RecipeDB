import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sql } from "@/app/lib/db";

export const { auth, signIn, signOut, handlers } = NextAuth({
	session: {
		strategy: "jwt",
	},

	providers: [
		Credentials({
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const email = credentials.email as string;
				const password = credentials.password as string;

				const users = await sql`
          SELECT * FROM users
          WHERE email = ${email}
        `;

				const user = users[0];

				if (!user) {
					return null;
				}

				const passwordsMatch = await bcrypt.compare(password as string, user.password);

				if (!passwordsMatch) {
					return null;
				}

				return {
					id: user.id,
					name: user.name,
					email: user.email,
				};
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},
});
