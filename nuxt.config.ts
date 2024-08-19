// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    ssr: true,

    app: {
        head: {
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                }
            ],
            script: [{src: 'https://telegram.org/js/telegram-web-app.js'}],
        }
    },

    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    devServer: {
        host: '127.0.0.1',
    },

    compatibilityDate: '2024-08-08',
    modules: ['@pinia/nuxt'],
})
