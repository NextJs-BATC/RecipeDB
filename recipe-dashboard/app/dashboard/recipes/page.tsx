import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchRecipes } from "@/app/lib/data";
import DeleteButton from "@/app/ui/recipes/delete-button";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import LogoutButton from "@/app/ui/logout-button";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function Page() {
	const session = await auth();
	const recipes = await fetchRecipes();

	return (
		<main className="p-6">
			<div className="mb-6 flex items-center justify-between gap-4">
				<h1 className="text-2xl font-bold">Hello, {session?.user?.name ?? "User"}</h1>

				<div className="flex items-center gap-3">
					<Link
						href="/dashboard/recipes/create"
						className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>
						Create Recipe
					</Link>
					<LogoutButton />
				</div>
			</div>

			<h2 className="mb-6 text-3xl font-bold">Recipes</h2>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{recipes.map((recipe) => (
					<div key={recipe.id}>
						<Link href={`/dashboard/recipes/${recipe.id}`} className="block">
							<div className="overflow-hidden rounded-lg border shadow-sm transition hover:shadow-md">
								<div className="relative h-48 w-full">
									<Image
										src={recipe.image_url}
										alt={recipe.title}
										fill
										className="object-cover"
									/>
								</div>

								<div className="p-4">
									<h3 className="text-xl font-semibold">{recipe.title}</h3>
									<p className="mt-2 line-clamp-3 text-sm text-gray-500">
										{recipe.ingredients}
									</p>
								</div>
							</div>
						</Link>

						<div className="mt-4 flex justify-end gap-2">
							<Link
								href={`/dashboard/recipes/${recipe.id}/edit`}
								className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
								aria-label={`Edit ${recipe.title}`}
							>
								<PencilIcon className="w-5" />
							</Link>

							<DeleteButton id={recipe.id} />
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
