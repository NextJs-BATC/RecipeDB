export default function Loading() {
	return (
		<div className="p-6 animate-pulse">
			<div className="mb-6 h-10 w-48 rounded bg-gray-200"></div>

			<div className="space-y-4">
				<div className="h-10 rounded bg-gray-200"></div>
				<div className="h-10 rounded bg-gray-200"></div>
				<div className="h-32 rounded bg-gray-200"></div>
				<div className="h-32 rounded bg-gray-200"></div>
			</div>
		</div>
	);
}
