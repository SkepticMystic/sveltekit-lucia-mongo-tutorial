import { auth } from '$lib/server/lucia';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request, locals, url }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');

        // Validate form data
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw error(400, 'Invalid email or password');
        }

        try {
            const { userId } = await auth.validateKeyPassword('email', email, password);

            // Create and set the session cookies
            const session = await auth.createSession(userId);
            locals.setSession(session);
        } catch (e) {
            throw error(404, 'Invalid email or password');
        }

        // If the user was redirected to the sign in page,
        //   redirect them back to the page they were on
        // Otherwise, redirect them to the home page
        throw redirect(302, url.searchParams.get('redirect') ?? '/');
    }
};
