export var app = angular.module('HousecallAPP', [])
export var rootScope

export var formatDate = function (date) {
    // var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    // var h = date.getHours()
    var minute = date.getMinutes() < 10 ? '0' + minute : minute
    var second = date.getSeconds() < 10 ? '0' + second : second
    return m + '/' + d
}

var deepCopy = function (obj) {
    var newObj = {}
    for (var item in obj) {
        if (typeof obj[item] === 'object') {
            newObj[item] = deepCopy(obj[item])
        } else {
            newObj[item] = obj[item]
        }
    }
    return newObj
}
