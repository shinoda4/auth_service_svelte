// src/hooks.server.ts
import { env } from "$env/dynamic/private";

export const handle = async ({ event, resolve }) => {
    const access = event.cookies.get('access');
    const refresh = event.cookies.get('refresh');

    if (access) {
        const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/me/`, {
            headers: { 'Authorization': `Bearer ${access}` }
        });

        if (res.status === 401 && refresh) {
            const refreshRes = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/jwt/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh })
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                event.cookies.set('access', data.access, { path: '/' });
            } else {
                event.cookies.delete('access', { path: '/' });
                event.cookies.delete('refresh', { path: '/' });
            }
        }
    }

    return resolve(event);
};
