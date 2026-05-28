import Link from "next/link";
import { deleteRecipe } from "@/app/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Confirm Delete",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;

	const deleteRecipeWithId = deleteRecipe.bind(null, id);

	return (
		<main className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
				<h1 className="mb-4 text-2xl font-bold">Delete Recipe</h1>

				<p className="mb-6 text-gray-600">Are you sure you want to delete this recipe?</p>

				<div className="flex gap-4">
					<form action={deleteRecipeWithId}>
						<button
							type="submit"
							className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
						>
							Delete
						</button>
					</form>

					<Link
						href="/dashboard/recipes"
						className="rounded border px-4 py-2 hover:bg-gray-100"
					>
						Cancel
					</Link>
				</div>
			</div>
		</main>
	);
}
