<template>
    <div>
        <div>==========================================button==========================================================================</div>
        <zz-button plain @click="handleClick">朴素按钮</zz-button>
        <zz-button disabled plain>朴素按钮</zz-button>
        <zz-button disabled type="text">朴素按钮</zz-button>
        <zz-button :loading="true">123</zz-button>
        <zz-button type="primary" :loading="true">123</zz-button>
        <zz-button type="danger">123</zz-button>
        <zz-button type="warning">123</zz-button>
        <zz-button type="success">123</zz-button>
        <zz-button type="info">123</zz-button>
        <zz-button type="text">123</zz-button>
        <zz-button size="small">123</zz-button>
        <zz-button size="medium">123</zz-button>
        <zz-button size="mini">123</zz-button>
        <zz-button round>123</zz-button>
        <zz-button circle><i class="zz-icon-edit" /></zz-button>
        <div>===========================================alert=========================================================================</div>
        <zz-alert title="12344" />
        <zz-alert type="warning"  title="1234412" />
        <zz-alert type="error" title="1234412" />
        <zz-alert title="1234412" :closable="false" />
        <zz-alert title="1234412" closeText="closeText" />
        <div>=============================================icon=======================================================================</div>
        <zz-icon style="font-size:26px" name="edit"></zz-icon>
        <i class="zz-icon-edit"></i>
        <div>=============================================input=======================================================================</div>
        <zz-input placeholder="asd"></zz-input>
        <zz-input disabled></zz-input>
        <zz-input type="textarea"></zz-input>
        <zz-input>
            <zz-button slot="prepend">123</zz-button>
            <zz-button slot="append">123</zz-button>
        </zz-input>
        <zz-input>
            <i slot="suffix" class="zz-icon-s-tools"></i>
            <i slot="prefix" class="zz-icon-phone"></i>
        </zz-input>
        <zz-input prefix-icon="zz-icon-s-tools" ></zz-input>
        <zz-input suffix-icon="zz-icon-phone" ></zz-input>
        <zz-input clearable ></zz-input>
        <zz-input show-word-limit maxlength="100000" ></zz-input>
        <zz-input show-password ></zz-input>
    </div>
</template>

<script>
    export default {
        name: "App",
        methods:{
            handleClick(e){
                console.log(e)
            }
        }
    }
</script>

<style scoped>

</style>
