import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { expired } = await parent();

    if (browser && expired) {
        alert('Your session has expired. Please log in again.');
        throw redirect(302, '/login');
    }

    return { expired };
};
