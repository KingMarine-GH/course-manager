import './firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { invalidateAll } from '$app/navigation';
import { writable } from 'svelte/store';

import type { User } from 'firebase/auth';

const auth = getAuth();

export const user = writable<User | null>();

let userNotWritable: User | null = null;
user.subscribe((userState) => (userNotWritable = userState));

onAuthStateChanged(auth, (userObj) => {
    console.log('update in the firebase onAuthState');

    if (userNotWritable && !userObj) {
        invalidateAll();
    }

    user.set(userObj);
});

user.subscribe((obj) => console.log('update to the user writable', obj?.displayName));
