import { isAuthenticated } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    // This page doesn't need any server-side data for now
    if (!isAuthenticated(cookies)) {
        throw redirect(303, '/services/redirect-to-login');
    }
    return {};
}