import {
    useWebApp,
    useWebAppRequests,
    useWebAppCloudStorage,
    useWebAppPopup,
    useWebAppViewport,
    useWebAppTheme,
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

            this.setWebAppData()

            if (this.webAppData.version > '6.0') {
                this.setWebAppData()
                this.setInitData()
                this.setTheme()
                this.setViewport()
                this.setInitOrder()
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
        },

        setInitData() {
            useWebAppCloudStorage().getStorageItem('initData').then((data, err) => {
                if (!data && !err) {
                    this.initDataUnsafe = useWebApp().initDataUnsafe
                    useWebAppCloudStorage().setStorageItem('initData', JSON.stringify(this.initDataUnsafe))
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
                                    this.userData = response.responseUnsafe
                                    useWebAppCloudStorage().setStorageItem('userData', JSON.stringify(response.responseUnsafe))
                                    resolve(response.responseUnsafe)
                                } else {
                                    useWebAppPopup().showConfirm('Для оформления заказа, нужно поделиться телефоном, повторите попытку', (ok) => {
                                        if (ok) {
                                            storageInit()
                                        } else {
                                            useWebAppPopup().showAlert('Если вы не хотите делиться контактами, укажите их в ручную')
                                            resolve(false)
                                        }
                                    })
                                }
                            })
                        }
                        storageInit()
                    } else {
                        this.userData = JSON.parse(data)
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
                        console.log(this.initDataUnsafe)
                        useWebAppPopup().showAlert('Невозможно определить локацию, укажите Ваш адрес в ручную')
                        resolve(false)
                    }, {
                        enableHighAccuracy: true,
                        maximumAge: 1000,
                        timeout: 3600
                    })
                } else {
                    useWebAppPopup().showAlert('Невозможно определить локацию, укажите Ваш адрес в ручную')
                    resolve(false)
                }
            })
        },
    }
})
