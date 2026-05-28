"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
			callbackUrl: "/dashboard/recipes",
		});

		if (result?.error) {
			setError("Invalid credentials");
			return;
		}

		window.location.href = "/dashboard/recipes";
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6 shadow"
		>
			<input
				name="email"
				type="email"
				placeholder="Email"
				className="w-full rounded border p-2"
			/>

			<input
				name="password"
				type="password"
				placeholder="Password"
				className="w-full rounded border p-2"
			/>

			<button type="submit" className="rounded bg-blue-500 p-2 text-white">
				Login
			</button>

			{error && <p className="text-sm text-red-500">{error}</p>}
		</form>
	);
}
