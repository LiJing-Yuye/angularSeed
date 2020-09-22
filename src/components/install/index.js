import tem from './InstallPage.html'
import installCtr from './InstallPage'

export default angular.module('install', []).component('install', {
    template: tem,
    controller: installCtr,
    controllerAs: 'ctrl'
}).name
