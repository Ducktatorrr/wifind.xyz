import type { Actions } from "./$types";
import { z } from "zod";
import { fail, redirect } from "@sveltejs/kit";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

interface DecodedToken {
	username: string;
	exp: number;
}

// on load if logged in redirect to /
export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, "/");
	}
};

export const actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const { username, password } = Object.fromEntries(formData);
		const parsed = loginSchema.safeParse({ username, password });
		if (!parsed.success) {
			return fail(400, { error: "Invalid credentials" });
		}

		let token: string;

		try {
			const tokenResponse = await fetch("http://154.3.237.106:8082/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});

			if (!tokenResponse.ok) {
				if (tokenResponse.status === 401) {
					return fail(401, { error: "Invalid username or password" });
				}
				return fail(tokenResponse.status, {
					error: "An error occurred during login",
				});
			}

			const data = await tokenResponse.json();
			token = data.token;

			// Decode the token to extract the expiration time
			const decoded = jwtDecode<DecodedToken>(token);
			const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
			const ttl = decoded.exp - currentTime; // Time to live in seconds

			if (ttl <= 0) {
				return fail(401, { error: "Token is already expired" });
			}

			event.cookies.set("token", token, {
				path: "/",
				httpOnly: true,
				secure: !import.meta.env.DEV,
				sameSite: "lax",
				maxAge: ttl, // Use the remaining TTL from the token's expiration time
			});
		} catch (error) {
			console.error("Login error:", error);
			return fail(500, {
				error: "An unexpected error occurred. Please try again later.",
			});
		}

		throw redirect(303, "/");
	},
} satisfies Actions;
