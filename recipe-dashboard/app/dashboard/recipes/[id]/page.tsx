import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/app/lib/data";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const recipe = await fetchRecipeById(id);

	if (!recipe) notFound();

	return (
		<main className="p-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-3xl font-bold">{recipe.title}</h1>
				<Link
					href={`/dashboard/recipes/${recipe.id}/edit`}
					className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Edit Recipe
				</Link>
				<Link
					href="/dashboard/recipes"
					className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Dashboard
				</Link>
			</div>

			<div className="relative mb-6 h-80 w-full overflow-hidden rounded-lg">
				<Image src={recipe.image_url} alt={recipe.title} fill className="object-cover" />
			</div>

			<div className="space-y-6">
				<section>
					<h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
					<p className="whitespace-pre-line text-gray-700">{recipe.ingredients}</p>
				</section>

				<section>
					<h2 className="mb-2 text-xl font-semibold">Steps</h2>
					<p className="whitespace-pre-line text-gray-700">{recipe.steps}</p>
				</section>
			</div>
		</main>
	);
}
