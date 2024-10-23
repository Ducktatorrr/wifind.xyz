import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user && url.pathname !== "/login" && url.pathname !== "/signup") {
		throw redirect(303, "/login");
	}

	return {
		user: locals.user,
	};
};
