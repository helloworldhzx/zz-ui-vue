<template>
  <div :class="[
  type === 'textarea'?'zz-textarea':'zz-input',
  inputSize ? 'zz-input--'+ inputSize:'',
  {
    'is-disabled': inputDisabled,
    'is-exceed': inputExceed,
    'zz-input-group': $slots.prepend || $slots.append,
    'zz-input-group--prepend': $slots.prepend,
    'zz-input-group--append': $slots.append,
    'zz-input--suffix': $slots.suffix || suffixIcon,
    'zz-input--prefix': $slots.prefix || prefixIcon,
  }
  ]">
    <template v-if="type!=='textarea'">
      <!-- 前置元素 -->
      <div class="zz-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        v-bind="$attrs"
        :disabled="inputDisabled"
        class="zz-input__inner"
        :type="showPassword?'password':'text'"
      >
      <!-- 前置内容 -->
      <span class="zz-input__prefix" v-if="prefixIcon || $slots.prefix">
        <slot name="prefix">
          <i :class="['zz-input__icon', prefixIcon]"></i>
        </slot>
      </span>
      <!-- 后置内容 -->
      <span class="zz-input__suffix" v-if="isSuffixVisible">
        <span class="zz-input__suffix-inner">
          <template>
            <!-- 后置图标 -->
            <slot name="suffix">
              <i v-if="suffixIcon" :class="['zz-input__icon', suffixIcon]"></i>
            </slot>
          </template>

          <!-- 删除图标 -->
          <i v-if="isClearVisible" class="zz-input__icon zz-icon-circle-close zz-input__clear"></i>
          <!-- 显示密码按钮 -->
          <i v-if="isPswVisible" class="zz-input__icon zz-icon-view zz-icon__clear"></i>
          <!-- 显示字数 -->
          <span class="zz-input__count" v-if="isWordLimitVisible">
            <span class="zz-input__count-inner">{{textLength}}/{{upperLimit}}</span>
          </span>
        </span>
        <!-- 表单状态icon -->
        <!-- <i class="zz-input__icon" :class="['zz-input__validateIcon', 'zz-icon-circle-close']"></i> -->
      </span>
      <!-- 后置元素 -->
      <div class="zz-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea v-else name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
export default {
  name: 'zzInput',
  // form表单
  inject: {
    zzForm: {
      default: ""
    },
    zzFormItem: {
      default: ""
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    size: String,
    resize: String,
    suffixIcon: String,
    prefixIcon: String,
    tabindex: String,
    label: String,
    showWordLimit: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  computed:{
    textLength(){
      return (this.value || "").length
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    inputSize(){
      return this.size || (this.zzFormItem || {}).size;
    },
    inputDisabled(){
      return this.disabled
    },
    inputExceed(){
      return this.showWordLimit
    },
    isClearVisible(){
      console.log(this.clearable);
      return this.clearable
    },
    isWordLimitVisible(){
      return this.showWordLimit
    },
    isSuffixVisible(){
      return this.suffixIcon || this.$slots.suffix || this.isWordLimitVisible || this.isClearVisible || this.showPassword
    },
    isPswVisible(){
      return this.showPassword && !this.readonly && !this.inputDisabled
    }
  }
}
</script>

<style>

</style>