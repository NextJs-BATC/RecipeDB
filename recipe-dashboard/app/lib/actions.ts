"use server";

import { z } from "zod";
import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import bcrypt from "bcrypt";

type RecipeFormState = {
	message: string;
	errors?: {
		title?: string[];
		image_url?: string[];
		ingredients?: string[];
		steps?: string[];
	};
};

type RegisterFormState = {
	message: string;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
};

const CreateRecipe = z.object({
	title: z.string().min(1),
	image_url: z.string().min(1),
	ingredients: z.string().min(1),
	steps: z.string().min(1),
});

export async function createRecipe(
	prevState: RecipeFormState,
	formData: FormData,
): Promise<RecipeFormState> {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const validatedFields = CreateRecipe.safeParse({
		title: formData.get("title"),
		image_url: formData.get("image_url"),
		ingredients: formData.get("ingredients"),
		steps: formData.get("steps"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Recipe.",
		};
	}

	const { title, image_url, ingredients, steps } = validatedFields.data;

	try {
		await sql`
      INSERT INTO recipes (
        user_id,
        title,
        image_url,
        ingredients,
        steps
      )
      VALUES (
        ${session.user.id},
        ${title},
        ${image_url},
        ${ingredients},
        ${steps}
      )
    `;
	} catch (error) {
		return {
			message: "Database Error: Failed to Create Recipe.",
		};
	}

	revalidatePath("/dashboard/recipes");
	redirect("/dashboard/recipes");
}

export async function deleteRecipe(id: string): Promise<void> {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	try {
		await sql`
      DELETE FROM recipes
      WHERE id = ${id}
      AND user_id = ${session.user.id}
    `;
	} catch (error) {
		throw new Error("Failed to Delete Recipe");
	}

	revalidatePath("/dashboard/recipes");

	redirect("/dashboard/recipes?deleted=true");
}

export async function updateRecipe(
	id: string,
	prevState: RecipeFormState,
	formData: FormData,
): Promise<RecipeFormState> {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const validatedFields = CreateRecipe.safeParse({
		title: formData.get("title"),
		image_url: formData.get("image_url"),
		ingredients: formData.get("ingredients"),
		steps: formData.get("steps"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Update Recipe.",
		};
	}

	const { title, image_url, ingredients, steps } = validatedFields.data;

	try {
		await sql`
      UPDATE recipes
      SET
        title = ${title},
        image_url = ${image_url},
        ingredients = ${ingredients},
        steps = ${steps}
      WHERE id = ${id}
      AND user_id = ${session.user.id}
    `;
	} catch (error) {
		return {
			message: "Database Error: Failed to Update Recipe.",
		};
	}

	revalidatePath("/dashboard/recipes");
	redirect("/dashboard/recipes");
}

const RegisterUser = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

export async function registerUser(
	prevState: RegisterFormState,
	formData: FormData,
): Promise<RegisterFormState> {
	const validatedFields = RegisterUser.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Register User.",
		};
	}

	const { name, email, password } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await sql`
      INSERT INTO users (
        name,
        email,
        password
      )
      VALUES (
        ${name},
        ${email},
        ${hashedPassword}
      )
    `;
	} catch (error) {
		return {
			message: "Database Error: Failed to Register User.",
		};
	}

	redirect("/login");
}
