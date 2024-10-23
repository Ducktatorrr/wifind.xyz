import { redirect, type Handle } from "@sveltejs/kit";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	username: string;
	exp: number;
}

export const handle: Handle = async ({ event, resolve }) => {
	// Retrieve token from cookies
	const token = event.cookies.get("token");

	if (token) {
		try {
			// Decode the token to get user info and expiry
			const decoded = jwtDecode<DecodedToken>(token);

			// Check if token is expired
			if (decoded.exp * 1000 < Date.now()) {
				// Token expired, redirect to login
				event.cookies.delete("token", { path: "/" });
				event.locals.user = undefined;
				if (
					event.url.pathname !== "/login" &&
					event.url.pathname !== "/signup"
				) {
					throw redirect(303, "/login");
				}
			} else {
				// If token is valid, set user data in event.locals for access in server-side functions
				event.locals.user = {
					username: decoded.username,
					token: token,
				};
			}
		} catch (err) {
			// In case of token decode errors, redirect to login
			event.cookies.delete("token", { path: "/" });
			event.locals.user = undefined;
			if (event.url.pathname !== "/login" && event.url.pathname !== "/signup") {
				throw redirect(303, "/login");
			}
		}
	} else {
		// If no token and route is protected, redirect to login and clear everything else like user data
		event.locals.user = undefined;
		if (event.url.pathname !== "/login" && event.url.pathname !== "/signup") {
			throw redirect(303, "/login");
		}
	}

	return resolve(event);
};
