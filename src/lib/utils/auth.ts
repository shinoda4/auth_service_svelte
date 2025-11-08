import type { Cookies } from "@sveltejs/kit";


export const isAuthenticated = (cookie: Cookies) => {
    if (!cookie.get('access')) {
        return false
    }
    return true
}