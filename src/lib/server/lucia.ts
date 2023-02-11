import { dev } from '$app/environment';
import adapter from '@lucia-auth/adapter-mongoose';
import lucia from 'lucia-auth';
import mongoose, { Model } from 'mongoose';

export const User = mongoose.model(
    'user',
    new mongoose.Schema(
        {
            // _id is a required field, and will be generated by Lucia
            _id: String,
            // email is not strictly required by Lucia, but we'll be using it
            email: String
        },
        // Let Lucia handle the _id field
        { _id: false }
    )
);

mongoose.model(
    'session',
    new mongoose.Schema(
        {
            _id: String,
            user_id: {
                type: String,
                required: true
            },
            active_expires: {
                type: Number,
                required: true
            },
            idle_expires: {
                type: Number,
                required: true
            }
        },
        { _id: false }
    )
);

mongoose.model(
    'key',
    new mongoose.Schema(
        {
            _id: String,
            user_id: {
                type: String,
                required: true
            },
            // Not strictly required by Lucia, but we'll be using it
            hashed_password: String,
            primary: {
                type: Boolean,
                required: true
            }
        },
        { _id: false }
    )
);

export const auth = lucia({
    // Pass the existing mongoose connection to the adapter
    adapter: adapter(mongoose),
    // Let Lucia know which environment we're in
    env: dev ? 'DEV' : 'PROD',
    // When Lucia returns a user from the database, it will pass it through this function
    transformUserData: ({ id, email }) => ({
        userId: id,
        email
    })
});

// Expose the types for the rest of the app
export type Auth = typeof auth;
