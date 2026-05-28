"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/lib/actions";

const initialState = {
	message: "",
	errors: {},
};

export default function RegisterForm() {
	const [state, formAction] = useActionState(registerUser, initialState);

	return (
		<form
			action={formAction}
			className="flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6 shadow"
		>
			<input name="name" placeholder="Name" className="w-full rounded border p-2" />

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

			<button className="rounded bg-blue-500 p-2 text-white">Register</button>

			{state.message && <p className="text-red-500">{state.message}</p>}
		</form>
	);
}
