// src/routes/services/permissions/+page.server.ts (修正版)
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import type { Cookies } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

async function fetchPermissions(fetch: any, cookies: Cookies, params: URLSearchParams) {
    return fetch(`${env.AUTH_SERVICE_URL}/api/permissions/?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${cookies.get('access') ?? ''}`
        }
    });
}

export const load: PageServerLoad = async ({ fetch, url, cookies }) => {
    const limit = url.searchParams.get('limit') || '10';
    const offset = url.searchParams.get('offset') || '0';
    const search = url.searchParams.get('search') || '';
    const params = new URLSearchParams({ limit, offset });
    if (search) params.append('search', search);
    for (const [key, value] of url.searchParams.entries()) {
        if (key.includes('__')) params.set(key, value);
    }

    let res = await fetchPermissions(fetch, cookies, params);

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            throw redirect(302, '/login');
        }

        try {
            console.log(await res.json());
        } catch (e) {
            // ignore
        }
        console.error('Failed to fetch permissions (Final):', res.status);
        return { count: 0, results: [], next: null, previous: null };
    }

    // 5. 成功返回
    const data = await res.json();
    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results,
        query: Object.fromEntries(url.searchParams)
    };
};