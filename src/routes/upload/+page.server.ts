import type { PageServerLoad, Actions } from "./$types";
import { redirect, fail } from "@sveltejs/kit";
import { z } from "zod";

export const load: PageServerLoad = async ({ parent }) => {
	// This will run the parent layout load function first
	const { user } = await parent();

	if (!user) {
		throw redirect(303, "/login");
	}

	return {
		user,
	};
};

export const actions = {
	upload: async ({ request, fetch, locals }) => {
		const form = await request.formData();
		const file = form.get("csv") as File;

		if (!file) {
			return fail(400, { error: "No file uploaded" });
		}

		const user = locals.user;
		if (!user || !user.token) {
			return fail(401, { error: "Unauthorized" });
		}

		const formData = new FormData();
		formData.append("csvfile", file);

		try {
			const response = await fetch("http://154.3.237.106:8080/upload", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
				body: formData,
			});

			if (!response.ok) {
				const errorText = await response.text();
				return fail(response.status, { error: errorText || "Upload failed" });
			}

			return { success: "File uploaded successfully and is being processed" };
		} catch (error) {
			console.error("Upload error:", error);
			return fail(500, { error: "An error occurred during upload" });
		}
	},
} satisfies Actions;
