import alert from "./src/alert";

// 按需引入时注册组件
alert.install = function (Vue) {
    Vue.component(alert.name, alert);
};

export default alert;
