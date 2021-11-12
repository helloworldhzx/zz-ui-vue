import button from "./button";
import alert from "./alert";
import input from "./input";
import icon from "./icon";

const components = [button, alert, input, icon];

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    })
};

// 判断是否是直接srcipt引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    button,
    alert, input, icon
}
