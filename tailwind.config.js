/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // add this line to scan all React files
    ],
    theme: {
        extend: {
            fontFamily: { comic: ['"Comic Sans MS"', ...fontFamily.sans] },
        },
    },
    plugins: [],
};
