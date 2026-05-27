"use client";

import { useActionState } from "react";
import { createRecipe } from "@/app/lib/actions";

type FormState = {
	message: string;
	errors?: {
		title?: string[];
		image_url?: string[];
		ingredients?: string[];
		steps?: string[];
	};
};

const initialState: FormState = {
	message: "",
	errors: {},
};

export default function CreateForm() {
	const [state, formAction] = useActionState(createRecipe, initialState);

	return (
		<form action={formAction} className="space-y-4">
			{/* Title */}
			<div>
				<label className="block text-sm font-medium">Title</label>
				<input
					name="title"
					className="w-full rounded border p-2"
					placeholder="Recipe title"
				/>
				<div aria-live="polite" aria-atomic="true">
					{state.errors?.title?.map((err: string) => (
						<p key={err} className="text-sm text-red-500">
							{err}
						</p>
					))}
				</div>
			</div>

			{/* Image URL */}
			<div>
				<label className="block text-sm font-medium">Image URL</label>
				<input
					name="image_url"
					className="w-full rounded border p-2"
					placeholder="https://..."
				/>
				<div aria-live="polite" aria-atomic="true">
					{state.errors?.image_url?.map((err: string) => (
						<p key={err} className="text-sm text-red-500">
							{err}
						</p>
					))}
				</div>
			</div>

			{/* Ingredients */}
			<div>
				<label className="block text-sm font-medium">Ingredients</label>
				<textarea
					name="ingredients"
					className="w-full rounded border p-2"
					placeholder="One per line"
				/>
				<div aria-live="polite" aria-atomic="true">
					{state.errors?.ingredients?.map((err: string) => (
						<p key={err} className="text-sm text-red-500">
							{err}
						</p>
					))}
				</div>
			</div>

			{/* Steps */}
			<div>
				<label className="block text-sm font-medium">Steps</label>
				<textarea
					name="steps"
					className="w-full rounded border p-2"
					placeholder="Step-by-step instructions"
				/>
				<div aria-live="polite" aria-atomic="true">
					{state.errors?.steps?.map((err: string) => (
						<p key={err} className="text-sm text-red-500">
							{err}
						</p>
					))}
				</div>
			</div>

			{/* Submit */}
			<button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
				Create Recipe
			</button>

			{/* General message */}
			{state.message && <p className="text-sm text-red-500">{state.message}</p>}
		</form>
	);
}
