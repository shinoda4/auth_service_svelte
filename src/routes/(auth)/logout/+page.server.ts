import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    // 清理认证 cookie
    cookies.delete('access', { path: '/' });
    cookies.delete('refresh', { path: '/' });

    // 可选：清理其他 session 数据或 locals
    // locals.user = null;

    // 重定向到登录页
    // throw redirect(303, '/auth/login');
    return {
        message: 'You have been logged out successfully.'
    };
};
