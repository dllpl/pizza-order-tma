import {
    useWebApp,
    useWebAppCloudStorage, useWebAppPopup, useWebAppRequests
} from 'vue-tg'

export const useTgWebAppStore = defineStore('tgWebAppStore', {
    state: () => ({
        webAppData: null,
        dataUnsafe: null,
        contactData: null
    }),

    actions: {

        init() {
            this.webAppData = useWebApp()

            if(this.webAppData.version > '6.0') {
                this.initDataUnsafe()
                this.contactData()
            }
        },

        initDataUnsafe() {
            useWebAppCloudStorage().getStorageItem('initDataUnsafe').then((data) => {
                if(typeof data === "string" && data === '') {
                    this.dataUnsafe = useWebApp().initDataUnsafe
                    useWebAppCloudStorage().setStorageItem('initDataUnsafe', JSON.stringify(this.dataUnsafe))
                } else {
                    this.dataUnsafe = JSON.parse(data)
                }
            })
        },

        contactData() {
            useWebAppCloudStorage().getStorageItem('contactData').then((data) => {
                if(typeof data === "string" && data === '') {
                    useWebAppRequests().requestContact((ok, response) => {
                        if(ok) {
                            this.contactData = response.responseUnsafe.contact
                            useWebAppCloudStorage().setStorageItem('contactData', JSON.stringify(response.responseUnsafe.contact))
                        } else {
                            useWebAppPopup().showAlert('Контакт не получен')
                        }
                    })
                } else {
                    useWebApp().contactData = JSON.parse(data)
                }
            })
        }
    }
})
