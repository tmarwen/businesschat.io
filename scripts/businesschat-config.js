const supportedLangs = {
    ltr: ['EN'],
    rtl: ['AR']
}

class BusinesschatConfig {

    isLTR(lang) {
        return supportedLangs.ltr.includes(lang)
    }

    isRTL(lang) {
        return supportedLangs.rtl.includes(lang)
    }

}

module.exports = new BusinesschatConfig