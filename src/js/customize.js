import { wordingJson, getLang } from '../Common/js/l10n.js'
import { NativeCMD, PLATFORM, native } from './bridge.js'
;(function () {
    const locale = getLang()
    if (locale == 'JA-JP') {
        wordingJson['imageAppLogo'] = 'img_lockup_jp@2x.png'
        wordingJson['imagePromoteDiamond'] =
            'https://drs2-client-conf.s3-us-west-1.amazonaws.com/drs-client-conf/DiamondPromoteImage_JP.png'
        wordingJson['homeBanner'] = 'main_banner_jp.png'
        wordingJson['scanBanner'] = 'scan_banner_en.png'
        wordingJson['maxDevices'] = 50
    } else {
        wordingJson['imageAppLogo'] = 'img_lockup@2x.png'
        wordingJson['imagePromoteDiamond'] =
            'https://drs2-client-conf.s3-us-west-1.amazonaws.com/drs-client-conf/DiamondPromoteImage.png'
        wordingJson['scanBanner'] = 'scan_banner_jp.png'
        wordingJson['maxDevices'] = 100
    }

    wordingJson.DRSSupportER =
        'http://gr.trendmicro.com/GREntry/NonPayment?Target=support_drs&OS=&SP=&PID=&FunID=#1&VID=&Locale=' +
        locale
    wordingJson.ISCIKBLink =
        'http://gr.trendmicro.com/GREntry/NonPayment?Target=iKB_ISC&OS=&SP=&PID=&FunID=#1&VID=&Locale=' +
        locale

    let includeProductNameKey = [
        'WholeProductName',
        'GDPRPageContent1',
        'GDPRPageContent2',
        'GDPRPageContent4',
        'installPageMessage',
        'unInstallPageTitle',
        'unInstallPageMessage',
        'unInstallPageTips'
    ]
    for (var index in includeProductNameKey) {
        var key = includeProductNameKey[index]
        wordingJson[key] = wordingJson[key].replace(
            /#ProductName#/g,
            wordingJson.ProductName
        )
    }

    var changeWordingMap = {
        Windows: {
            'EN-US': {
                GDPRPageDCNURL: wordingJson.DRSSupportER.replace(
                    '#1',
                    'GDPR_Win'
                ),
                GDPRPagePolicyURL:
                    'https://www.trendmicro.com/en_us/about/legal/privacy.html',
                LicenseAgreementUrl:
                    'https://www.trendmicro.com/en_us/about/legal.html',
                GDPRPageContent3: wordingJson['GDPRPageContent3_win']
            },
            'JA-JP': {
                GDPRPageDCNURL: wordingJson.DRSSupportER.replace(
                    '#1',
                    'GDPR_Win'
                ),
                GDPRPagePolicyURL:
                    'https://www.trendmicro.com/ja_jp/about/legal/privacy-policy.html',
                LicenseAgreementUrl:
                    'https://www.trendmicro.com/ja_jp/about/legal.html',
                GDPRPageContent3: wordingJson['GDPRPageContent3_win'],
                GDPRPageContent10: ''
            }
        },

        Mac: {
            'EN-US': {
                GDPRPageDCNURL: wordingJson.DRSSupportER.replace(
                    '#1',
                    'GDPR_Mac'
                ),
                GDPRPagePolicyURL:
                    'https://www.trendmicro.com/en_us/about/legal/privacy-policy-product.html',
                LicenseAgreementUrl:
                    'http://akagrbeta.trendmicro.com/GREntry/NonPayment?Target=EULA&OS=&SP=&PID=CV10&FunID=LicenseLink&VID=&Locale=EN-US'
            }
        }
    }

    var changeWording = changeWordingMap[PLATFORM][locale]
    for (key in changeWording) {
        wordingJson[key] = changeWording[key]
    }
})()

export var WebSiteUrls = {
    'EN-AU':
        'http://shop.trendmicro.com.au/homenetworksecurity-social/?utm_source=housecall_win',
    'EN-NZ':
        'http://shop.trendmicro.co.nz/homenetworksecurity-social/?utm_source=housecall_win',
    'EN-US':
        'https://www.trendmicro.com/en_us/forHome/products/homenetworksecurity.html?utm_source=housecall_win&utm_content=01',
    'EN-SG':
        'https://shop.sg.trendmicro-apac.com/homenetworksecurity/Default.asp?utm_source=housecall_win'
}

var faqUrls = {
    'EN-US':
        'https://www.trendmicro.com/en_us/forHome/products/housecall/home-networks.html#faqs-tm-anchor',
    'JA-JP': 'https://virusbuster.jp/vbhn/drs/details/?AAID=ui_drs_main'
}

var feedbackUrl =
    'https://ics-new.trendmicro-cloud.com/survey/HouseCallforHomeNetworks​-EN?os=value1&build=value2&language=value3&Country=value4'

export function getDiamondPromotion(param) {
    var promote = native.CMDEXEC(NativeCMD.CMD_GET_DIAMOND_PROMOTE_URL, '{}')
    var promoteUrl = promote['promote_url']
    if (param) {
        promoteUrl += '?' + param
    }
    return promoteUrl
}

export function getFAQLink() {
    var locale = getLang()
    if (faqUrls.hasOwnProperty(locale)) {
        return faqUrls[locale]
    } else {
        return faqUrls['EN-US']
    }
}

export function getFeedbackLink() {
    var versionResult = native.CMDEXEC(NativeCMD.CMD_GET_VERSION, '{}')
    var version = versionResult['version']

    var local = native.CMDEXEC(NativeCMD.CMD_GET_USER_LOCALE, '{}')
    local = local['user_locale'].toUpperCase()

    return feedbackUrl
        .replace('value1', 'Windows')
        .replace('value2', version)
        .replace('value3', getLang())
        .replace('value4', local)
}
