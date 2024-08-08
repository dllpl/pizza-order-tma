import {
    useWebApp,
    useWebAppRequests,
    useWebAppCloudStorage,
    useWebAppPopup,
    useWebAppTheme
} from 'vue-tg'

export const useTgWebAppStore = defineStore('tgWebAppStore', {
    state: () => ({
        webAppData: null,
        userData: null,
        geo: null,
        theme: null,
        viewport: null,
        order: [],
    }),
    actions: {

        setWebAppData() {
            if(useWebApp().version > '6.0') {
                this.webAppData = useWebApp()
            }
        },

        setUserData() {
            useWebAppCloudStorage().getStorageItem('userData').then((err, data) => {
                if (!data && !err) {
                    function storageInit() {
                        useWebAppRequests().requestContact((ok, response) => {

                            if (ok) {
                                useWebAppCloudStorage().setStorageItem('userData', JSON.stringify(response))
                                this.userData = response
                            } else {
                                useWebAppPopup().showConfirm('Для оформления заказа, нужно поделиться телефоном, повторите попытку', (ok) => {
                                    if (ok) {
                                        storageInit()
                                    } else {
                                        useWebAppPopup().showAlert('К сожалению, Вы не сможете оформить заказ')
                                        useWebApp().close()
                                    }
                                })
                            }
                        })
                    }
                    storageInit()
                } else {
                    this.userData = err
                }
            })
        },

        setGeo() {
            window.navigator.geolocation.getCurrentPosition((position) => {
                alert(position)
                this.geo = position
            }, () => {
                useWebAppPopup().showAlert('Невозможно определить локацию')
            })
        },

        setChatId(chatId) {
            this.chatId = chatId
        }
    }
})
