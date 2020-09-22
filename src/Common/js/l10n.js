export var wordingJson
export var DeviceListPageHtml
export var SecurityPageHtml
import * as $ from 'jquery'

function getLang() {
  var lang = (getUrlParam('lang') || '').replace('_', '-').toUpperCase()
  if (!lang) {
    lang = 'EN-US'
  }
  return lang
}

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function InitialData() {
  var l10nFile = getLang().replace('-', '_')
  var url = 'i18n/' + l10nFile + '.json'
  //   url = 'http://localhost/drs/i18n/EN_US.json'
  var data = $.ajax({
    url: url,
    async: false,
  }).responseText
  if (!data || data == 'null') {
    return
  }
  data = $.parseJSON(data)
  wordingJson = data
}

InitialData()
;(function () {
  var url = 'template/DeviceList/template.html'
  var data = $.ajax({ url: url, async: false }).responseText
  if (!data || data == 'null') {
    return
  }
  DeviceListPageHtml = data
})()
;(function () {
  var url = 'template/Security/template.html'
  var data = $.ajax({ url: url, async: false }).responseText
  if (!data || data == 'null') {
    return
  }
  SecurityPageHtml = data
})()
