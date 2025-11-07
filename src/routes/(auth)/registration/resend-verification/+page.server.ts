import { env } from "$env/dynamic/private";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    resend: async ({ request, fetch }) => {
        const formData = await request.formData();
        const email = formData.get('email')?.toString();

        if (!email) {
            return fail(400, { error: 'Email is required' });
        }

        try {
            const res = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/users/resend_activation/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.status === 204) {
                return { success: 'Verification email has been resent.' };
            } else {
                const data = await res.json();
                // 将字段错误拼成一条可读信息
                const errorMessage = Object.entries(data)
                    .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
                    .join(' | ');
                return fail(res.status, { error: errorMessage });
            }
        } catch (err) {
            return fail(500, { error: 'Network error' });
        }
    }
};
