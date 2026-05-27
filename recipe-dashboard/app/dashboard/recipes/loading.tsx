export default function Loading() {
	return (
		<div className="p-6">
			<h1 className="mb-6 text-3xl font-bold">Loading Recipes...</h1>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="animate-pulse rounded-lg border p-4">
						<div className="mb-4 h-40 rounded bg-gray-200"></div>

						<div className="mb-2 h-6 rounded bg-gray-200"></div>

						<div className="h-4 rounded bg-gray-200"></div>
					</div>
				))}
			</div>
		</div>
	);
}
