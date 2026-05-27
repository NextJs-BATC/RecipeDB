"use server";

import { sql } from "./db";
import bcrypt from "bcrypt";

export async function seedUser() {
	const hashedPassword = await bcrypt.hash("password123", 10);

	await sql`
    INSERT INTO users (email, password)
    VALUES ('test@example.com', ${hashedPassword})
    ON CONFLICT (email) DO NOTHING;
  `;
}
