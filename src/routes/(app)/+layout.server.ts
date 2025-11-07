import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const accessToken = cookies.get('access');
	const refreshToken = cookies.get('refresh');
	if (!accessToken) {
		if (!refreshToken) {
			return {
				user: null,
				isAuthenticated: false,
				expired: false
			};
		}
		return {
			user: null,
			isAuthenticated: false,
			expired: true
		}
	}

	try {
		const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/me/`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (!res.ok) {
			return {
				user: null,
				isAuthenticated: false,
				expired: false
			};
		}
		const user = await res.json();

		return {
			user,
			isAuthenticated: true,
			expired: false
		};
	} catch (err) {
		return {
			user: null,
			isAuthenticated: false,
			expired: false
		};
	}
};
