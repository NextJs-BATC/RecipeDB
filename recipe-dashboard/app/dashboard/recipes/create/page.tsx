import RecipeForm from "@/app/ui/recipes/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Recipe",
};

export default function Page() {
	return (
		<main className="p-6">
			<RecipeForm />
		</main>
	);
}
