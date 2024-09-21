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
            return new Promise(async (resolve, reject) => {
                this.webAppData = useWebApp()

                if(this.webAppData.version > '6.0') {
                    this.dataUnsafe = await this.initDataUnsafe()
                    this.contactData = await this.initContactData()
                }

                resolve(true)
            })
        },

        initDataUnsafe() {
            return new Promise(async (resolve, reject) => {

                let dataUnsafe = null

                useWebAppCloudStorage().getStorageItem('initDataUnsafe').then((data) => {
                    if (typeof data === "string" && data === '') {
                        dataUnsafe = useWebApp().initDataUnsafe
                        useWebAppCloudStorage().setStorageItem('initDataUnsafe', JSON.stringify(dataUnsafe))
                    } else {
                        dataUnsafe = JSON.parse(data)
                    }
                    resolve(dataUnsafe)
                })
            })
        },

        initContactData() {
            return new Promise(async (resolve, reject) => {

                let contactData = null

                useWebAppCloudStorage().getStorageItem('contactData').then((data) => {

                    if (typeof data === "string" && data === '') {

                        useWebAppRequests().requestContact((ok, response) => {
                            if (ok) {
                                contactData = response.responseUnsafe.contact
                                useWebAppCloudStorage().setStorageItem('contactData', JSON.stringify(contactData))
                            } else {
                                useWebAppPopup().showAlert('Контакт не получен')
                            }
                        })

                    } else {
                        contactData = JSON.parse(data)
                    }
                    resolve(contactData)
                })
            })
        }
    }
})
