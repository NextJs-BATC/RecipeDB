import { fetchRecipeById } from "@/app/lib/data";
import EditForm from "@/app/ui/recipes/edit-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Edit Recipe",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;

	const recipe = await fetchRecipeById(params.id);

	return (
		<main className="p-6">
			<div className="mb-6 flex items-center justify-between gap-4">
				<h1 className="mb-6 text-3xl font-bold">Edit Recipe</h1>
				<div className="flex items-center gap-3">
					<Link
						href="/dashboard/recipes"
						className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>
						Dashboard
					</Link>
				</div>
			</div>
			<EditForm recipe={recipe} />
		</main>
	);
}
