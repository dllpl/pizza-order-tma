/** @type {import('tailwindcss').Config} */


module.exports = {
    darkMode: "class",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                tg: {
                    default: '#0088cc',
                    dark: '#007ab8',
                    light: '#33a1e6',
                    background: '#e6f3f9',
                    primary: '#0088cc',
                    secondary: '#4a4a4a',
                    muted: '#999999',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
