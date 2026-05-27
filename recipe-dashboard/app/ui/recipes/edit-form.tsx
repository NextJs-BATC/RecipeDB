"use client";

import { useActionState } from "react";
import { updateRecipe } from "@/app/lib/actions";
import { Recipe } from "@/app/lib/definitions";

export default function EditForm({ recipe }: { recipe: Recipe }) {
	const updateRecipeWithId = updateRecipe.bind(null, recipe.id);

	const initialState = {
		message: "",
		errors: {},
	};

	const [state, formAction] = useActionState(updateRecipeWithId, initialState);

	return (
		<form action={formAction} className="space-y-4">
			<input
				name="title"
				defaultValue={recipe.title}
				className="w-full rounded border p-2"
			/>

			<input
				name="image_url"
				defaultValue={recipe.image_url}
				className="w-full rounded border p-2"
			/>

			<textarea
				name="ingredients"
				defaultValue={recipe.ingredients}
				className="w-full rounded border p-2"
			/>

			<textarea
				name="steps"
				defaultValue={recipe.steps}
				className="w-full rounded border p-2"
			/>

			<button className="rounded bg-blue-500 px-4 py-2 text-white">Update Recipe</button>

			{state.message && <p className="text-red-500">{state.message}</p>}
		</form>
	);
}
