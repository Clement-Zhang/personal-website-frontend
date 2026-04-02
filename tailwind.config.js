/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // add this line to scan all React files
    ],
    theme: {
        extend: {
            colors: {
                chatbot: {
                    message: '#35363A',
                },
            },
        },
    },
    plugins: [],
};
