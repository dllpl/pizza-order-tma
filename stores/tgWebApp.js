import {
    useWebApp,
    useWebAppCloudStorage, useWebAppPopup, useWebAppRequests,
    useWebAppBiometricManager
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

                if (this.webAppData.version > '6.0') {
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
                    resolve(dataUnsafe)``
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
                        data = data.replace('0594925', '******')
                        contactData = JSON.parse(data)
                    }
                    resolve(contactData)
                })
            })
        },

        authenticateBiometric() {
            return new Promise((resolve, reject) => {
                if(this.webAppData.platform !== 'tdesktop' && this.webAppData.version > '7.2') {
                    useWebAppBiometricManager().initBiometric(() => {
                        const biometricSettings = useWebAppBiometricManager().openBiometricSettings()
                        if(biometricSettings.isBiometricAvailable) {
                            useWebAppBiometricManager().authenticateBiometric('Это нужно, чтобы подтвердить Ваш заказ', (ok, token) => {
                                if(ok) {
                                    if(!token.length) {

                                        token = Math.random().toString(36).substring(2, 15);

                                        useWebAppBiometricManager().updateBiometricToken(token, () => {
                                            resolve({
                                                ok: true,
                                                token: token,
                                                deviceId: biometricSettings.deviceId,
                                                message: 'Мы верифицировали Ваш заказ',
                                            })
                                        })
                                    } else {
                                        resolve({
                                            ok: true,
                                            token,
                                            deviceId: biometricSettings.deviceId,
                                            message: 'Мы верифицировали Ваш заказ',
                                        })
                                    }

                                } else {
                                    resolve({
                                        token,
                                        ok: false,
                                        message: 'Мы не смогли верифицировать Ваш заказ',
                                    })
                                }
                            })
                        } else {
                            resolve({
                                ok: false,
                                message: 'Мы не смогли верифицировать Ваш заказ',
                            })
                        }
                    })
                } else {
                    resolve({
                        ok: true
                    })
                }
            })
        },
    }
})
