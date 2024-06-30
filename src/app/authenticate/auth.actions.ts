"use server";

import { z } from "zod";
import { signUpSchema } from "./SignupForm";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: values.email,
			},
		});

		if (existingUser) {
			return { error: "User Already Exists", success: false };
		}

		const hashedPassword = await new Argon2id().hash(values.password);

		const newUser = await prisma.user.create({
			data: {
				email: values.email,
				username: values.username,
				hashedPassword,
			},
		});

		const session = await lucia.createSession(newUser.id, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);

		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return { user: newUser.id, success: true };
	} catch (error) {
		return { error: "Something went wrong", success: false };
	}
};
