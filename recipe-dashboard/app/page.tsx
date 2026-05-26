import Link from "next/link";

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6">
			<h1 className="mb-6 text-4xl font-bold">Recipe Dashboard</h1>

			<p className="mb-6 text-gray-500">Manage your recipes with Next.js and Auth.js</p>

			<Link href="/login" className="rounded-md bg-blue-500 px-4 py-2 text-white">
				Login
			</Link>
		</main>
	);
}
