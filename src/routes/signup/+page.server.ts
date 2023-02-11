import { auth } from '$lib/server/lucia';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// On page load, redirect authenticated users to the home page
export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate();
    if (session) throw redirect(302, '/');
    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');

        // Validate form data
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw error(400, 'Invalid email or password');
        }

        try {
            const user = await auth.createUser({
                key: {
                    // The authentication provider we're using
                    providerId: 'email',
                    // The user's email
                    providerUserId: email,
                    password
                },
                attributes: {
                    email
                }
            });

            // Create and set the session cookies
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        } catch {
            // Email already taken
            throw error(409, 'Email already taken');
        }
    }
};
