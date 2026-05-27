import { sql } from "./db";
import { auth } from "@/auth";
import { Recipe } from "./definitions";

export async function fetchRecipes() {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new Error("Unauthorized");
		}

		const data = await sql<Recipe[]>`
      SELECT *
      FROM recipes
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;

		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipes.");
	}
}

export async function fetchRecipeById(id: string) {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new Error("Unauthorized");
		}

		const data = await sql<Recipe[]>`
      SELECT *
      FROM recipes
      WHERE id = ${id}
      AND user_id = ${session.user.id}
    `;

		return data[0];
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe.");
	}
}
