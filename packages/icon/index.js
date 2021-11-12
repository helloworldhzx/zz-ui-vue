import ZzIcon from "./src/icon.vue";

ZzIcon.install = function(Vue){
  Vue.Component(ZzIcon.name, ZzIcon)
}

export default ZzIcon