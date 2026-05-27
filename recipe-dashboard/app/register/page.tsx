import RegisterForm from "@/app/ui/register-form";
import Link from "next/link";

export default function Page() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md rounded-lg border p-6 shadow">
				<h1 className="mb-6 text-3xl font-bold">Register</h1>

				<RegisterForm />

				<p className="mt-4 text-sm">
					Already have an account?{" "}
					<Link href="/login" className="text-blue-500">
						Login
					</Link>
				</p>
			</div>
		</main>
	);
}
