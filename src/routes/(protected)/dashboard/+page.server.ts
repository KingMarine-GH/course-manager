import type { Actions } from './$types';

export const actions = {
    class: async (event) => {
        console.log('received');
        return;
    }
} satisfies Actions;
