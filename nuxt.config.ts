// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    ssr: false,

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
        host: '192.168.88.175',
    },

    compatibilityDate: '2024-08-08',
    modules: ['@pinia/nuxt'],
})
