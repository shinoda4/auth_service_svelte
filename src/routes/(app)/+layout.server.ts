import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
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
		const refreshed = await refreshJWTToken(cookies);
		if (!refreshed) {
			return {
				user: null,
				isAuthenticated: false,
				expired: false
			};
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


const refreshJWTToken = async (cookie: Cookies) => {
	if (!cookie.get('refresh')) {
		return false
	}
	const refresh = cookie.get('refresh')
	try {
		const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/jwt/refresh/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh })
		});
		if (!res.ok) {
			return false
		}
		const data = await res.json();
		cookie.set('access', data.access, { httpOnly: true, path: '/' });
		return true
	} catch (err) {
		return false
	}
}