var directive = {
    install: function (Vue) {
        Vue.directive("upper", { //v-upper
            bind(el, binding, vnode) {
                el.addEventListener('keyup', () => {
                    el.value = el.value ? el.value.toUpperCase() : el.value;
                });
            }
        });
    }
}

if (typeof exports === 'object') {
    module.exports = directive
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        return directive
    })
}