<template>
  <div 
    :class="[
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
    ]"
    @mouseenter="hovering=true"
    @mouseleave="hovering=false"
  >
    <template v-if="type!=='textarea'">
      <!-- 前置元素 -->
      <div class="zz-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :value="nativeInputValue"
        ref="input"
        v-bind="$attrs"
        :disabled="inputDisabled"
        class="zz-input__inner"
        :type="showPassword?passwordVisible?'text':'password':type"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
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
          <i 
            v-if="isClearVisible" 
            class="zz-input__icon zz-icon-circle-close zz-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <!-- 显示密码按钮 -->
          <i v-if="isPswVisible" class="zz-input__icon zz-icon-view zz-icon__clear" @click="handlePswVisible"></i>
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
    <textarea 
      v-else
      :value="nativeInputValue"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      class="zz-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="zz-textarea__count">{{ textLength }}/{{ upperLimit }}</span>
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
  data(){
    return {
      isComposing: false,
      passwordVisible: false,
      focused: false,
      hovering: false
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
    nativeInputValue(){
      return this.value ?? ""
    },
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
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering)
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
  },
  watch:{},
  mounted(){
    this.setNativeInputValue()
  },
  methods: {
    focus(){
      this.$nextTick(() => {
        this.getInput().focus();
      })
    },
    getInput(){
      return this.$refs.input || this.$refs.textarea
    },
    setNativeInputValue(){
      const input = this.getInput();
      console.log(input.value, this.nativeInputValue);
      if (!input) return;
      if(input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue
    },
    handleCompositionStart(){
      this.isComposing = true
    },
    handleCompositionUpdate(event){},
    handleCompositionEnd(event){
      if(this.isComposing){
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event){
      if (this.isComposing) return;
      this.$emit("input", event.target.value)
      this.$nextTick(this.setNativeInputValue);
    },
    handleFocus(event){
      this.focused = true
      this.$emit("focus", event)
    },
    handleBlur(event){
      this.focused = false
      this.$emit("blur", event)
    },
    handleChange(event){
      this.$emit("change", event)
    },
    handlePswVisible(){
      this.passwordVisible = !this.passwordVisible;
      this.focus()
    },
    clear(){
      this.$emit("input", "")
      this.$emit("change", "")
      this.$emit("clear")
    }
  }
}
</script>

<style>

</style>