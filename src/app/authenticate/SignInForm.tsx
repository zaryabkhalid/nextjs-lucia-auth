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

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const SignInForm = () => {
	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof signinSchema>) {
		console.log(values);
	}

	return (
		<Card className="min-w-[500px]	">
			<CardHeader>
				<CardTitle> Welcome Back!</CardTitle>
				<CardDescription>Sign in to your account to continoue.</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2">
				<Form {...form}>
					<form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
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

						<Button type="submit" className="w-full mt-5">
							Login
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
export default SignInForm;
