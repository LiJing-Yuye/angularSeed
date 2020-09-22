import { getDiamondPromotion } from './customize.js'
import * as $ from 'jquery'
import { rootScope } from './common.js'

export var NativeCMD = {
    CMD_SENDDATA: 0x10010012,

    CMD_SCAN: 0x10020001,
    CMD_SET_DEV_INFO: 0x10020004,
    CMD_REMOVE_DEVICE: 0x10020010,

    CMD_DELETE_HIS_NET: 0x10020036,

    CMD_RESULT_GET_HIS_DEVICES: 0x10020051,
    CMD_RESULT_GET_HIS_ISCVULS: 0x10020053,
    CMD_BLOCK_NETWORK: 0x10020061,

    CMD_INSTALL: 0x10040001,
    CMD_UNINSTALL: 0x10040002,
    CMD_UNINSTALL_CLEAN: 0x10040003,

    EVENT_PROGRAM_STARTUP: 0x80000001,
    EVENT_PROGRAM_EXIT: 0x80000002,
    EVENT_PROGRAM_CLOSE: 0x80000003,
    EVENT_PROGRAM_MINIMIZE: 0x80000004,
    EVENT_PROGRAM_RELAUNCH: 0x80000005,

    CMD_OPEN_THIRDPARTY_LICENSE: 0x10080008,
    CMD_LANUCH_AIRSUPPORT: 0x10080009,
    CMD_GET_VERSION: 0x10080010,
    CMD_GET_EVENT_SETTING: 0x10080011,
    CMD_SET_EVENT_SETTING: 0x10080012,
    CMD_GET_USER_LOCALE: 0x10080013,
    CMD_VIEW_ONE_DEVICE: 0x10080014,
    CMD_GET_ONLINE_STATUS: 0x10080015,
    CMD_LANUCH_ABOUT_PAGE: 0x10080016,
    CMD_LANUCH_SETTING_PAGE: 0x10080017,
    CMD_GET_SHOW_TUTORIAL: 0x10080018,
    CMD_GET_DIAMOND_PROMOTE_URL: 0x10080019,
    CMD_GET_DIAMONDBOX_EXIST: 0x10080020,

    0x10010012: 'CMD_SENDDATA',
    0x10020001: 'CMD_SCAN',
    0x10020004: 'CMD_SET_DEV_INFO',
    0x10020010: 'CMD_REMOVE_DEVICE',

    0x10020036: 'CMD_DELETE_HIS_NET',

    0x10020051: 'CMD_RESULT_GET_HIS_DEVICES',
    0x10020053: 'CMD_RESULT_GET_HIS_ISCVULS',
    0x10020061: 'CMD_BLOCK_NETWORK',
    0x10040001: 'CMD_INSTALL',
    0x10040002: 'CMD_UNINSTALL',
    0x10040003: 'CMD_UNINSTALL_CLEAN',

    0x80000001: 'EVENT_PROGRAM_STARTUP',
    0x80000002: 'EVENT_PROGRAM_EXIT',
    0x80000003: 'EVENT_PROGRAM_CLOSE',
    0x80000004: 'EVENT_PROGRAM_MINIMIZE',
    0x80000005: 'EVENT_PROGRAM_RELAUNCH',

    0x10080008: 'CMD_OPEN_THIRDPARTY_LICENSE',
    0x10080009: 'CMD_LANUCH_AIRSUPPORT',
    0x10080010: 'CMD_GET_VERSION',
    0x10080011: 'CMD_GET_EVENT_SETTING',
    0x10080012: 'CMD_SET_EVENT_SETTING',
    0x10080013: 'CMD_GET_USER_LOCALE',
    0x10080014: 'CMD_VIEW_ONE_DEVICE',
    0x10080015: 'CMD_GET_ONLINE_STATUS',
    0x10080016: 'CMD_LANUCH_ABOUT_PAGE',
    0x10080017: 'CMD_LANUCH_SETTING_PAGE',
    0x10080018: 'CMD_GET_SHOW_TUTORIAL',
    0x10080019: 'CMD_GET_DIAMOND_PROMOTE_URL',
    0x10080020: 'CMD_GET_DIAMONDBOX_EXIST'
}

var PLATFORM_TYPE = {
    WINDWOS: 'Windows',
    MAC: 'Mac'
}

export function underline2Camel(obj) {
    if (typeof obj === 'string') {
        return obj.replace(/_([a-z])/g, function (g) {
            return g[1].toUpperCase()
        })
    }
    var res = {}
    for (var propertyeName in obj) {
        var newPropertyeName = propertyeName
            .toLowerCase()
            .replace(/_([a-z])/g, function (g) {
                return g[1].toUpperCase()
            })
        res[newPropertyeName] = obj[propertyeName]
    }
    return res
}

function Native(platform) {
    this.platform = platform
    return this
}

Native.prototype.beforeInovke = function (funcName, args) {
    console.log('[Request: ' + funcName + '] ' + args)
}

Native.prototype.afterInovke = function (funcName, args) {
    console.log('[Response: ' + funcName + '] ' + args)
}

Native.prototype.gdprAcceptShareCrashAndUsage = function (str) {
    var res
    var param = JSON.stringify(str)

    this.beforeInovke('gdprAcceptShareCrashAndUsage', param)
    if (this.platform == 'MAC') {
        res = window.webkit.messageHandlers.gdprAcceptShareCrashAndUsage.postMessage(
            param
        )
    } else {
        res = window.external.gdprAcceptShareCrashAndUsage(param)
    }

    this.afterInovke('gdprAcceptShareCrashAndUsage', res)
    return res
}

Native.prototype.userEditDeviceInfor = function (str) {
    var res
    var param = JSON.stringify(str)

    this.beforeInovke('userEditDeviceInfor', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        res = window.webkit.messageHandlers.userEditDeviceInfor.postMessage(
            param
        )
    } else {
        res = ''
        setTimeout(function () {
            window.external.OnMsgFromWeb(NativeCMD.CMD_SET_DEV_INFO, param)
        }, 0)
    }

    this.afterInovke('userEditDeviceInfor', res)
    return res
}

Native.prototype.openUrl = function (str_json) {
    var param = JSON.stringify(str_json)

    this.beforeInovke('openUrl', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.openUrl.postMessage(param)
    } else {
        if (str_json['action'] === 'promotion') {
            str_json['url'] = getDiamondPromotion(str_json['param'])
            param = JSON.stringify(str_json)
        }
        window.external.OpenDefaultOuterBrowser(param)
    }

    this.afterInovke('openUrl')
    return
}

Native.prototype.getDeviceHistory = function (str) {
    var res
    var param = JSON.stringify(str)

    this.beforeInovke('getDeviceHistory', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        res = window.webkit.messageHandlers.getDeviceHistory.postMessage(param)
    } else {
        res = window.external.OnMsgFromWeb(
            NativeCMD.CMD_RESULT_GET_HIS_DEVICES,
            param
        )
        setTimeout(function () {
            setDeviceHistory(res)
        }, 0)
    }

    this.afterInovke('getDeviceHistory', res)
}

Native.prototype.getISCHistory = function (str) {
    var res
    var param = JSON.stringify(str)

    this.beforeInovke('getISCHistory', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        res = window.webkit.messageHandlers.getISCHistory.postMessage(param)
    } else {
        res = window.external.OnMsgFromWeb(
            NativeCMD.CMD_RESULT_GET_HIS_ISCVULS,
            param
        )
        //put it to asyn
        setTimeout(function () {
            setISCHistory(res)
        }, 0)
    }

    this.afterInovke('getISCHistory', res)
}

Native.prototype.getAllSSID = function () {
    var res

    this.beforeInovke('getAllSSID')
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.getAllSSID.postMessage(null)
    } else {
        res = window.external.getAllSSID()
        setTimeout(function () {
            setAllSSID(res)
        }, 1)
    }

    this.afterInovke('getAllSSID', res)
}

Native.prototype.scanNowAction = function () {
    var res

    this.beforeInovke('scanNowAction')
    if (this.platform == PLATFORM_TYPE.MAC) {
        res = window.webkit.messageHandlers.scanNowAction.postMessage(null)
    } else {
        res = window.external.OnMsgFromWeb(NativeCMD.CMD_SCAN, '{}')
    }

    this.afterInovke('scanNowAction', res)
    return res
}

Native.prototype.getSDKStatus = function () {
    this.beforeInovke('getSDKStatus')
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.getSDKStatus.postMessage(null)
    }
    this.afterInovke('getSDKStatus')
}

Native.prototype.InitializeSDK = function () {
    this.beforeInovke('InitializeSDK')
    if (this.platform == PLATFORM_TYPE.WINDWOS) {
        window.external.InitializeSDK()
    }
    this.afterInovke('InitializeSDK')
}

Native.prototype.Install = function () {
    this.beforeInovke('install')
    if (this.platform == PLATFORM_TYPE.WINDWOS) {
        window.external.OnMsgFromWeb(NativeCMD.CMD_INSTALL, '{}')
    }
    this.afterInovke('install')
}

var LevelMapping = {
    Debug: 1,
    Info: 2,
    Warning: 3,
    Error: 4
}
var DefaultLevel = LevelMapping['Error']
Native.prototype.WriteJSLog = function (str, level) {
    var levelNew = level || 'Debug'
    var request = {
        content: str.toString(),
        level: levelNew
    }

    if (LevelMapping[level] < DefaultLevel) {
        return
    }

    var param = JSON.stringify(request)

    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.WriteJSLog.postMessage(param)
    } else {
        window.external.WriteJSLog(param)
    }
}

Native.prototype.welcomeAcceptAndContinue = function () {
    this.beforeInovke('welcomeAcceptAndContinue')
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.welcomeAcceptAndContinue.postMessage(null)
    } else {
        window.external.welcomeAcceptAndContinue()
    }
    this.afterInovke('welcomeAcceptAndContinue')
}

Native.prototype.getAirSupportState = function () {
    this.beforeInovke('getAirSupportState')
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.getAirSupportState.postMessage(null)
    } else {
        var result = window.external.getAirSupportState()
        setAirSupportState(JSON.stringify({ state: result }))
    }
    this.afterInovke('getAirSupportState')
}

Native.prototype.forgetDevice = function (str) {
    var param = JSON.stringify(str)
    this.beforeInovke('forgetDevice', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.forgetDevice.postMessage(param)
    } else {
        native.CMDEXEC(NativeCMD.CMD_REMOVE_DEVICE, param)
    }
    this.afterInovke('forgetDevice')
}

Native.prototype.setDraggable = function (str) {
    if (this.platform == PLATFORM_TYPE.MAC) {
        var param = JSON.stringify(str)
        this.beforeInovke('setDraggable', param)
        window.webkit.messageHandlers.setDraggable.postMessage(param)
        this.afterInovke('setDraggable')
    }
}

Native.prototype.pasteboardCopy = function (str) {
    var param = JSON.stringify(str)
    this.beforeInovke('pasteboardCopy', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.pasteboardCopy.postMessage(param)
    } else {
        window.external.PasteboardCopy(param)
    }
    this.afterInovke('pasteboardCopy')
}

Native.prototype.getHostMac = function () {
    if (this.platform == PLATFORM_TYPE.MAC) {
        this.beforeInovke('getHostMac')
        window.webkit.messageHandlers.getHostMac.postMessage(null)
        this.afterInovke('getHostMac')
    }
}

Native.prototype.userEvent = function (str) {
    var param = JSON.stringify(str)
    this.beforeInovke('userEvent', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.userEvent.postMessage(param)
    } else {
        native.CMDEXEC(NativeCMD.CMD_SENDDATA, param)
    }
    this.afterInovke('userEvent')
}

Native.prototype.getDevOLStatus = function (str) {
    var param = JSON.stringify(str)
    this.beforeInovke('getDevOLStatus', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.getDevOLStatus.postMessage(param)
    } else {
        native.CMDEXEC(NativeCMD.CMD_GET_ONLINE_STATUS, '{}')
    }
    this.afterInovke('getDevOLStatus')
}

Native.prototype.removeWifiHistory = function (str) {
    var param = JSON.stringify(str)
    this.beforeInovke('removeWifiHistory', param)
    if (this.platform == PLATFORM_TYPE.MAC) {
        window.webkit.messageHandlers.removeWifiHistory.postMessage(param)
    } else {
        window.external.OnMsgFromWeb(NativeCMD.CMD_DELETE_HIS_NET, param)
    }
    this.afterInovke('removeWifiHistory')
}

Native.prototype.TriggerMainUIToScan = function () {
    this.beforeInovke('TriggerMainUIToScan')
    window.external.TriggerMainUIToScan()
    this.afterInovke('TriggerMainUIToScan')
}

Native.prototype.GetBannerAd = function () {
    if (this.platform == PLATFORM_TYPE.WINDWOS) {
        this.beforeInovke('GetBannerAd')
        var result = window.external.GetBannerAd()
        this.afterInovke('GetBannerAd')
        return JSON.parse(result)
    }

    return null
}

Native.prototype.CMDEXEC = function (CMD, param) {
    this.beforeInovke(NativeCMD[CMD], param)
    var result
    var jsonResult = {}
    if (this.platform == PLATFORM_TYPE.WINDWOS) {
        result = window.external.OnMsgFromWeb(CMD, param)
        try {
            jsonResult = JSON.parse(result)
        } catch (e) {
            console.log(e)
        }
    }
    this.afterInovke(NativeCMD[CMD], result)
    return jsonResult
}

export var console
export var native

export var PLATFORM
// if (window.parent && window.parent.PLATFORM) {
//     //location.href += window.parent.location.search
// }

if (location.href.indexOf('?debug') !== -1) {
    PLATFORM = PLATFORM_TYPE.WINDWOS
    native = new Native(PLATFORM)
    document.write(
        '<script src="Common/js/debug.js" type="text/javascript"></script>'
    )
    $(function () {
        //NewNetworkPage and NewDevicePage 's border in CSS
        if (
            window.location.href.indexOf('NewNetworkPage') == -1 &&
            window.location.href.indexOf('NewDevicePage') == -1
        ) {
            document.body.style.border = '1px solid #c4c4c4'
            document.body.style.boxSizing = 'border-box'
        }
    })
} else if (location.href.indexOf('?windows') !== -1) {
    PLATFORM = PLATFORM_TYPE.WINDWOS
    native = new Native(PLATFORM)
    console = {
        log: function (str) {
            native.WriteJSLog(str)
        }
    }

    $(function () {
        //NewNetworkPage and NewDevicePage 's border in CSS
        if (
            window.location.href.indexOf('NewNetworkPage') == -1 &&
            window.location.href.indexOf('NewDevicePage') == -1
        ) {
            document.body.style.border = '1px solid #c4c4c4'
            document.body.style.boxSizing = 'border-box'
        }
    })
} else if (location.href.indexOf('?mac') !== -1) {
    PLATFORM = PLATFORM_TYPE.MAC
    native = new Native(PLATFORM)
    console = {
        log: function (str) {
            native.WriteJSLog(str)
        }
    }
}

export function updateDeviceInfo() {
    broadcast('updateDeviceInfo', arguments)
}
export function updateSDKStatus() {
    broadcast('updateSDKStatus', arguments)
}
export function updateISCInfo() {
    broadcast('updateISCInfo', arguments)
}
export function currentWifiChanged() {
    broadcast('currentWifiChanged', arguments)
}
export function ScanErrorHandle() {
    broadcast('ScanErrorHandle', arguments)
}
export function goToUIPage() {
    broadcast('goToUIPage', arguments)
}
export function updateUIState() {
    broadcast('updateUIState', arguments)
}

export function setAirSupportState() {
    broadcast('setAirSupportState', arguments)
}
export function setAllSSID() {
    broadcast('setAllSSID', arguments)
}
export function setDeviceHistory() {
    broadcast('setDeviceHistory', arguments)
}
function setISCHistory() {
    broadcast('setISCHistory', arguments)
}
export function setDeviceOpenConsole() {
    broadcast('setDeviceOpenConsole', arguments)
}
export function setHostMac() {
    broadcast('setHostMac', arguments)
}
export function updateDevOLStatus() {
    broadcast('updateDevOLStatus', arguments)
}
export function updateDeviceOLStatus() {
    broadcast('updateDevOLStatus', arguments)
}
export function notifyUserWithPopup() {
    broadcast('notifyUserWithPopup', arguments)
}

export function inform_isc_one_device_finish() {
    broadcast('informIscOneDeviceFinish', arguments)
}
export function installFinish() {
    broadcast('installFinish', arguments)
}
export function uninstallFinish() {
    broadcast('uninstallFinish', arguments)
}
export function update_one_new_device() {
    broadcast('addNewDevice', arguments)
}
export function updateDimaondBoxExist() {
    broadcast('updateDimaondBoxExist', arguments)
}
export function changeBanner() {
    broadcast('changeBanner', arguments)
}
export function resetBanner() {
    broadcast('resetBanner', arguments)
}

function broadcast(funcName, args) {
    //console.log('[emit] ' + funcName, args);
    var data = {}
    if (args[0] && typeof args[0] == 'string') {
        try {
            // remove non-printable and other non-valid JSON chars
            var str = args[0]
                .replace(/[\u0000-\u0019]+/g, '')
                .replace('/[\x00-\x1F\x7F-\x9F]/g', '')
                .trim()
            data = JSON.parse(str.trim())
        } catch (e) {
            native.WriteJSLog('[Call : ' + funcName + '] error', 'Error')
            native.WriteJSLog('[FromSDKError] ' + e, 'Error')
            native.WriteJSLog('[FromSDKError] ' + args[0], 'Error')
            return
        }
    }
    if (!rootScope) {
        console.log('[' + funcName + '] not ready')
        setTimeout(function () {
            broadcast(funcName, args)
        }, 500)
    } else {
        console.log('[Call : ' + funcName + '] start: ' + JSON.stringify(data))
        rootScope.$broadcast(funcName, data)
        console.log('[Call : ' + funcName + '] over')
    }
    return data
}
