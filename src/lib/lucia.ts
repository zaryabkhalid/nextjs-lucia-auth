import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";

const adaptor = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adaptor, {
	sessionCookie: {
		name: "session_cookie",
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
});
