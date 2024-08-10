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
            // useWebAppCloudStorage().removeStorageItems(['initData'])
            if (useWebApp().version > '6.0') {
                this.setWebAppData()
                this.setTheme()
                this.setViewport()

                // this.setUserData()

                this.setInitOrder()

                // this.setGeo()


            }
        },

        setInitOrder() {
            useWebAppCloudStorage().getStorageItem('pizzaOrder').then((data) => {
                if (data) {
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
                    useWebAppCloudStorage().setStorageItem('initData', JSON.stringify(this.initDataUnsafe))
                    alert(JSON.stringify(this.initDataUnsafe))
                } else {
                    this.initDataUnsafe = JSON.parse(data)
                }
            })
        },

        setUserData() {
            return new Promise((resolve, reject) => {
                useWebAppCloudStorage().getStorageItem('userData').then((data, err) => {
                    if (!data && !err) {
                        const storageInit = () => {
                            useWebAppRequests().requestContact((ok, response) => {
                                if (ok) {
                                    useWebAppCloudStorage().setStorageItem('userData', JSON.stringify(response.responseUnsafe))
                                    resolve(response.responseUnsafe)
                                } else {
                                    useWebAppPopup().showConfirm('Для оформления заказа, нужно поделиться телефоном, повторите попытку', (ok) => {
                                        if (ok) {
                                            storageInit()
                                        } else {
                                            useWebAppPopup().showAlert('Для оформления заказа, нужно поделиться телефоном')
                                            reject('Для оформления заказа, нужно поделиться телефоном')
                                        }
                                    })
                                }
                            })
                        }
                        storageInit()
                    } else {
                        resolve(JSON.parse(data))
                    }
                })
            })
        },

        setGeo() {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.geo = position.coords
                        resolve(position.coords)
                    }, () => {
                        reject('Невозможно определить локацию')
                    }, {
                        enableHighAccuracy: true,
                        maximumAge: 1000,
                        timeout: 3600
                    })
                } else {
                    reject('Невозможно определить локацию')
                }
            })
        },
    }
})
