<template>
    <button
        :type="nativeType"
        @click="handleClick"
        class="zz-button"
        :disabled="buttonDisabled || loading"
        :class="[
            type? 'zz-button--'+type:'',
            size?'zz-button--'+size:'',
            {
                'is-disabled': disabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle,
            }
        ]"
    >
        <i v-if="loading" class="zz-icon-loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
    export default {
        name: "zzButton",
        props: {
            type: {
                type: String,
                default: 'default'
            },
            nativeType: {
                type: String,
                default: 'button'
            },
            icon: {
                type: String,
                default: ''
            },
            size: String,
            loading: Boolean,
            round: Boolean,
            circle: Boolean,
            plain: Boolean,
            disabled: Boolean,
            autofocus: Boolean
        },
        computed:{
            buttonDisabled(){
                return this.disabled
            }
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        }
    }
</script>

<style scoped>

</style>
