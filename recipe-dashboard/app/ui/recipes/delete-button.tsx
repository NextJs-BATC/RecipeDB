"use client";

import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton({ id }: { id: string }) {
	return (
		<Link
			href={`/dashboard/recipes/${id}/delete`}
			className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
		>
			<TrashIcon className="w-5" />
		</Link>
	);
}
