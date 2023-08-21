import { initializeApp } from 'firebase-admin/app';
import { FIREBASE_ADMIN_EMAIL, FIREBASE_ADMIN_ID, FIREBASE_ADMIN_KEY } from '$env/static/private';
import { credential } from 'firebase-admin';

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

try {
    initializeApp({
        credential: credential.cert({
            clientEmail: FIREBASE_ADMIN_EMAIL,
            privateKey: FIREBASE_ADMIN_KEY,
            projectId: FIREBASE_ADMIN_ID
        })
    });
} catch (err: any) {
    if (!/already exists/u.test(err.message)) {
        console.error('Firebase Admin has failed to start');
    }
}

export const admin = {
    auth: getAuth(),
    firestore: getFirestore()
};
