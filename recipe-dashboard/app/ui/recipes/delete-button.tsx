"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteRecipe } from "@/app/lib/actions";

export default function DeleteButton({ id }: { id: string }) {
	const deleteRecipeWithId = deleteRecipe.bind(null, id);

	return (
		<form action={deleteRecipeWithId}>
			<button className="rounded bg-red-500 p-2 text-white hover:bg-red-600">
				<TrashIcon className="w-5" />
			</button>
		</form>
	);
}
