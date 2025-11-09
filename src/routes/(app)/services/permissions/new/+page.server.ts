import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    return {};
};

export const actions: Actions = {
    default: async ({ request, fetch, cookies }) => {
        const formData = await request.formData();

        const body = {
            permission_code: formData.get('permission_code'),
            permission_name: formData.get('permission_name'),
            description: formData.get('description')
        };

        const res = await fetch(`${env.AUTH_SERVICE_URL}/api/permissions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access') ?? ''}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorText = await res.text();
            return fail(res.status, { error: errorText || 'Failed to create permission' });
        }

        // 成功后跳转回权限列表页
        throw redirect(303, '/services/permissions');
    }
};
