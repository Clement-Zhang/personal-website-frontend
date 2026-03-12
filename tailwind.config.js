/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // add this line to scan all React files
    ],
    theme: {
        extend: {
            fontFamily: { comic: ['"Comic Sans MS"', ...fontFamily.sans] },
            colors: {
                chatbot: {
                    message: '#35363A',
                },
                dark: '#b5b4b1',
            },
        },
    },
    plugins: [],
};
