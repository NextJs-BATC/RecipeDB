import bcrypt from "bcrypt";

async function main() {
	const hashedPassword = await bcrypt.hash("password", 10);

	console.log(hashedPassword);
}

main();
