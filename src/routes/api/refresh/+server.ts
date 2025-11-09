// src/routes/api/refresh/+server.ts
import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

// 刷新令牌的 API 端点
const REFRESH_ENDPOINT = `${env.AUTH_SERVICE_URL}/api/auth/jwt/refresh/`;

export const POST: RequestHandler = async ({ fetch, cookies }) => {
    const refreshToken = cookies.get('refresh');

    if (!refreshToken) {
        return new Response(JSON.stringify({ message: 'No refresh token' }), { status: 401 });
    }

    // 1. 调用后端认证服务进行刷新
    const refreshRes = await fetch(REFRESH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken })
    });

    if (refreshRes.ok) {
        const tokens = await refreshRes.json();

        // 2. 成功：更新 httpOnly Cookie
        cookies.set('access', tokens.access, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });

        // 可选：如果 refresh token 也会更新，也需要设置
        // cookies.set('refresh', tokens.refresh, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });

        // 3. 返回新的 Access Token 给拦截器
        return new Response(JSON.stringify({ access: tokens.access }), { status: 200 });
    } else {
        // 4. 刷新失败：清理 Cookie 并返回 401
        cookies.delete('access', { path: '/' });
        cookies.delete('refresh', { path: '/' });
        return new Response(JSON.stringify({ message: 'Refresh failed' }), { status: 401 });
    }
};