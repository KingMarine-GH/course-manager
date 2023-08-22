import './firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { invalidateAll } from '$app/navigation';
import { writable } from 'svelte/store';

import type { User } from 'firebase/auth';

const auth = getAuth();

function userStore() {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.warn('Auth is not initialized/disabled in this browser');
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe
        };
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return {
        subscribe
    };
}

export const user = userStore();
