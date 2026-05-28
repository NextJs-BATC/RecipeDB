import { fetchRecipeById } from "@/app/lib/data";
import EditForm from "@/app/ui/recipes/edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit Recipe",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;

	const recipe = await fetchRecipeById(params.id);

	return (
		<main className="p-6">
			<h1 className="mb-6 text-3xl font-bold">Edit Recipe</h1>

			<EditForm recipe={recipe} />
		</main>
	);
}
