import {
    useWebApp,
    useWebAppRequests,
    useWebAppCloudStorage,
    useWebAppPopup,
    useWebAppViewport,
    useWebAppTheme
} from 'vue-tg'

export const useTgWebAppStore = defineStore('tgWebAppStore', {
    state: () => ({
        webAppData: null,
        initDataUnsafe: null,
        userData: null,
        geo: null,
        theme: null,
        viewport: null,

        order: [],

    }),

    actions: {

        init() {
            if (useWebApp().version > '6.0') {
                this.setWebAppData()
                this.setTheme()
                this.setViewport()

                this.setUserData()

                this.setInitOrder()

                this.setGeo()
            }
        },

        setInitOrder() {
            useWebAppCloudStorage().getStorageItem('pizzaOrder').then((data) => {
                if(data) {
                    this.order = JSON.parse(data);
                }
            })
        },

        setTheme() {
            this.theme = useWebAppTheme()
        },

        setViewport() {
            this.viewport = useWebAppViewport()
        },


        setWebAppData() {

            this.webAppData = useWebApp()

            useWebAppCloudStorage().getStorageItem('initData').then((data, err) => {
                if (!data && !err) {
                    this.initDataUnsafe = useWebApp().initDataUnsafe
                    useWebAppCloudStorage().setStorageItem('initData', JSON.stringify(this.webAppData.initDataUnsafe))
                } else {
                    this.initDataUnsafe = JSON.parse(data)
                }
            })
        },

        setUserData() {
            useWebAppCloudStorage().getStorageItem('userData').then((data, err) => {
                if (!data && !err) {
                    const storageInit = () => {
                        useWebAppRequests().requestContact((ok, response) => {
                            if (ok) {
                                useWebAppCloudStorage().setStorageItem('userData', JSON.stringify(response.responseUnsafe))
                                this.userData = response.responseUnsafe
                            } else {
                                useWebAppPopup().showConfirm('Для оформления заказа, нужно поделиться телефоном, повторите попытку', (ok) => {
                                    if (ok) {
                                        storageInit()
                                    } else {
                                        useWebAppPopup().showAlert('Для оформления заказа, нужно поделиться телефоном')
                                    }
                                })
                            }
                        })
                    }

                    storageInit()
                } else {
                    this.userData = JSON.parse(data)
                }
            })
        },

        setGeo() {
            navigator.geolocation.getCurrentPosition((position) => {
                alert(JSON.stringify(position.coords))
                this.geo = position.coords
            }, () => {
                // useWebAppPopup().showAlert('Невозможно определить локацию')
            }, {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 3600
            })
        },
    }
})
