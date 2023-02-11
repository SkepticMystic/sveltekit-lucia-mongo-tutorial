import { MONGO_URI } from '$env/static/private';
import mongoose from 'mongoose';
import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';

export const handle = handleHooks(auth);

try {
    await mongoose.connect(MONGO_URI, { autoIndex: false, dbName: 'test' });
} catch (error) {
    console.log(error);
}
