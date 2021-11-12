<template>
    <div
        class="zz-alert"
        v-show="visible"
        :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
    >
        <i class="zz-alert__icon" v-if="showIcon"></i>
        <div class="zz-alert__content">
            <span class="zz-alert__title">
                <slot name="title">{{title}}</slot>
            </span>
            <p class="zz-alert__description" v-if="$slots.default && !description"><slot></slot></p>
            <p class="zz-alert__description" v-if="description && !$slots.default">{{description}}</p>
            <i class="zz-alert__closebtn"
               :class="{'is-customed': closeText !=='', 'zz-icon-close': closeText !== ''}"
               v-show="closable"
               @click="close()"
            >
                {{closeText}}
            </i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "zzAlert",
        data(){
            return {
                visible: true
            }
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            showIcon: Boolean,
            description: {
                type: String
            },
            type: {
                type: String,
                default: 'info'
            },
            closeText: {
                type: String
            },
            closable: {
                type: Boolean,
                default: true
            },
            center: Boolean,
            effect: {
                type: String,
                default: 'dark',
                validator: function(value) {
                    return ['light', 'dark'].indexOf(value) !== -1;
                }
            }
        },
        computed: {
            typeClass(){
                return `zz-alert--${this.type}`
            }
        },
        methods:{
            close(){
                this.visible = false;
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
