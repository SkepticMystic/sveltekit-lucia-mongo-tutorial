import { auth } from '$lib/server/lucia';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
    const session = await locals.validate();
    if (!session) throw error(401, 'Not authenticated');

    await auth.invalidateSession(session.sessionId); // Invalidate db session
    locals.setSession(null); // Remove cookie

    throw redirect(302, '/signin');
};