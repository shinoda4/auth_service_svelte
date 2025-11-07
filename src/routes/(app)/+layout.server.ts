import type { LayoutServerLoad } from '../../../.svelte-kit/types/src/routes/$types';
import { env } from '$env/dynamic/private';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const accessToken = cookies.get('access');
	if (!accessToken) {
		return {
			user: null,
			isAuthenticated: false
		};
	}

	try {
		const res = await fetch(`${env.AUTH_SERVICE_URL}/api/me/`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (!res.ok) {
			return {
				user: null,
				isAuthenticated: false
			};
		}
		const user = await res.json();

		return {
			user,
			isAuthenticated: true
		};
	} catch (err) {
		return {
			user: null,
			isAuthenticated: false
		};
	}
};
