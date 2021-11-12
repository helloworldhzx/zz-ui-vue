import button from "./src/button";

// 按需引入时注册组件
button.install = function (Vue) {
    Vue.component(button.name, button);
};

export default button;
