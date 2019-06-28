/*
 * @Description: axios to Vue
 */

import apiExample from './interface/example'
import apiLogin from './interface/login'
import apiRegister from './interface/register'
import apiPublish from './interface/publish'
import apiSubstitute from './interface/substitute'
import apiMine from './interface/mine'

const install = Vue => {
    if (install.installed)
        return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return Object.assign(
                    {},
                    apiExample,
                    apiRegister, 
                    apiLogin, 
                    apiPublish, 
                    apiSubstitute,
                    apiMine
                )
            }
        }
    })
}

export default install