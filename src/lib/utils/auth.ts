import { env } from "$env/dynamic/private";
import { redirect, type Cookies } from "@sveltejs/kit";


export const isAuthenticated = async (cookies: Cookies) => {
    const access = cookies.get('access');
    if (!access) return false;

    const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/me/`, {
        headers: { 'Authorization': `Bearer ${access}` }
    });
    return res.ok;
};

