import type { Actions } from './$types';

export const actions = {
    class: async ({ request }) => {
        console.log('hi');
        const formData = await request.formData();

        const timeCount = formData.get('time-rows');

        console.log(timeCount);

        return;
    }
} satisfies Actions;
