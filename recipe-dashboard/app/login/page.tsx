import LoginForm from "@/app/ui/login-form";
import Link from "next/link";

export default function LoginPage() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md rounded-lg border p-6 shadow">
				<h1 className="mb-6 text-3xl font-bold">Login</h1>

				<LoginForm />

				<p className="mt-4 text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="text-blue-500">
						Register
					</Link>
				</p>
			</div>
		</main>
	);
}
