import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { parseErrorJson } from '$lib/utils/parse';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const { uid, token } = params;

    try {
        const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/activation/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid, token })
        });

        if (res.status === 204) {
            return { status: 'Account activated successfully!', error: null };
        } else if (res.status === 403) {
            return { status: "This activation link has already been used.", error: null };
        } else if (res.status === 400) {
            const errData = await res.json();
            const errorMessages = parseErrorJson(errData);
            return { status: null, error: errorMessages };
        }
        else {
            const data = await res.json();
            return { status: null, error: JSON.stringify(data) };
        }
    } catch (err) {
        return { status: null, error: 'Network error' };
    }
};
