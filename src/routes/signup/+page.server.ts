import type { Actions } from "./$types";
import { z } from "zod";
import { fail, redirect } from "@sveltejs/kit";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

// on load if logged in redirect to /
export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, "/");
	}
};

export const actions = {
	signup: async (event) => {
		const formData = await event.request.formData();
		const { username, password } = Object.fromEntries(formData);
		const parsed = loginSchema.safeParse({ username, password });
		if (!parsed.success) {
			return fail(400, { error: "Invalid credentials" });
		}

		let signedup = false;

		try {
			const signupResponse = await fetch("http://154.3.237.106:8082/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});

			if (!signupResponse.ok) {
				return fail(signupResponse.status, {
					error: "An error occurred during login",
				});
			}

			if (signupResponse.status === 200) {
				signedup = true;
			}
		} catch (error) {
			console.error("Login error:", error);
			return fail(500, {
				error: "An unexpected error occurred. Please try again later.",
			});
		}

		throw redirect(303, `/login?created=${signedup}`);
	},
} satisfies Actions;
