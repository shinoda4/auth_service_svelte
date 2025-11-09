import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';
import { isAuthenticated } from "../../lib/utils/auth";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const authenticated = await isAuthenticated(cookies)
	if (!authenticated) {
		return {
			user: null,
			isAuthenticated: false,
		}
	}
	const accessToken = cookies.get('access');
	try {
		let res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/me/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
		});
		let user = await res.json();
		return {
			user,
			isAuthenticated: true,
		};
	} catch (err) {
		return {
			user: null,
			isAuthenticated: false,
		};
	}
};
