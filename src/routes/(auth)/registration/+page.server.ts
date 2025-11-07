import { env } from '$env/dynamic/private';
import { parseErrorJson } from '$lib/utils/parse';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    register: async ({ request, fetch }) => {
        const formData = await request.formData();
        const username = formData.get('username')?.toString();
        const email = formData.get('email')?.toString();
        const phoneNumber = formData.get('phoneNumber')?.toString();
        const password = formData.get('password')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();

        if (!username || !email || !phoneNumber || !password || !confirmPassword) {
            return fail(400, { error: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return fail(400, { error: 'Passwords do not match' });
        }

        const body = JSON.stringify({ username, email, phone_number: phoneNumber, password, re_password: confirmPassword })
        console.log(body);

        const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });

        if (!res.ok) {
            const errorData = await res.json();
            const errorMessage = parseErrorJson(errorData);
            return fail(res.status, { error: errorMessage });
        }

        throw redirect(303, `/registration/success?email=${encodeURIComponent(email)}`);
    }
};
