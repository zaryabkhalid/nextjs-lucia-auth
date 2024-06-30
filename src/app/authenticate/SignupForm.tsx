"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "./auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const signUpSchema = z
	.object({
		username: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const SignUpForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		const res = await signUp(values);

		if (res.success) {
			router.push("/dashboard");
			toast.success("Account created Successfully");
		} else {
			toast.error(res.error);
		}
	}

	return (
		<Card className="min-w-[500px]">
			<CardHeader>
				<CardTitle> Begin your journey 🧾 </CardTitle>
				<CardDescription>Create your account to continoue.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2">
				<Form {...form}>
					<form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Enter your username..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Enter your email..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password..."
											{...field}
											onChange={(e) => {
												e.target.value = e.target.value.trim();
												field.onChange(e);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Confirm Password"
											{...field}
											onChange={(e) => {
												e.target.value = e.target.value.trim();
												field.onChange(e);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full mt-5">
							Register
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
export default SignUpForm;
