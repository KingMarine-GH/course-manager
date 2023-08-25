const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {}
    },

    plugins: [daisyui],
    safelist: [
        'row-start-1',
        'row-start-2',
        'row-start-3',
        'row-start-4',
        'row-start-5',
        'row-start-6',
        'row-start-7',
        'row-start-8',
        'row-start-9'
    ]
};

module.exports = config;
