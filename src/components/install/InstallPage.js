// import 'css/InstallPage.css'
// import 'Common/font/style.css'
// import 'Common/js/jquery-1.11.1.js'
import { wordingJson } from '../../Common/js/l10n'
import * as $ from 'jquery'
// import 'Common/js/angular.1.2.32.min.js'
// import 'js/definition.js'
// import { rootScope } from '../../js/common.js'
import { NativeCMD, PLATFORM, native } from '../../js/bridge'
// import 'js/customize.js'
// import 'Common/Directive/max-min.js'

module.exports = function installCtr($scope) {
    // scope = $scope
    // rootScope = $rootScope
    $scope.i18n = $.extend({}, wordingJson)
    $scope.platform = PLATFORM
    $scope.isinstallFinish = false
    $scope.installProcess = 0
    native.Install()
    native.userEvent({
        event_category: 'User',
        event_action: 'Install_Open'
    })

    $scope.process = setInterval(function () {
        $scope.installProcess += 5
        if ($scope.installProcess >= 95) {
            clearInterval($scope.process)
        }
        $scope.$apply()
    }, 500)

    $scope.StartNow = function () {
        native.CMDEXEC(NativeCMD.EVENT_PROGRAM_RELAUNCH, '{}')
    }

    $scope.$on('installFinish', function () {
        $scope.installProcess = 100
        clearInterval($scope.process)
        $scope.isinstallFinish = true
        $scope.$apply()
    })
}
