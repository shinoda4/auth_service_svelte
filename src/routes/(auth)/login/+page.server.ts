import { env } from '$env/dynamic/private';
import { isAuthenticated } from '$lib/utils/auth';
import { parseErrorJson } from '$lib/utils/parse';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const authenticated = isAuthenticated(cookies);
    if (await authenticated) {
        throw redirect(303, '/');
    }
}

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('username')?.toString();
        const password = formData.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { error: 'All fields are required' });
        }

        const body = JSON.stringify({ username, password })
        console.log(body);

        const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        if (!res.ok) {
            const errorData = await res.json();
            const errorMessage = parseErrorJson(errorData);
            return fail(res.status, { error: errorMessage });
        }

        const data = await res.json();
        const accessToken = data.access;
        const refreshToken = data.refresh;

        cookies.set('access', accessToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
        });

        cookies.set('refresh', refreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
        });

        throw redirect(303, `/login/success?username=${encodeURIComponent(username)}`);
    }
};
