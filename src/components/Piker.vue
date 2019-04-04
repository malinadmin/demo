<template>
    <div>
      <van-picker
        show-toolbar
        title="请选择"
        :columns="arry"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </div>
</template>
<script>

    export default {
      props: ["columns"], //接收一个数组
      data() {
            return {
              arry:this.columns
            }
        },
        mounted() {

        },
      created(){

      },
      methods: {
          //确定
          onConfirm(val){
            this.$emit('pikers',val)
          },
          //取消
          onCancel(){
            this.$emit('pikers')
          },
          //清除data
          cleaerdata(){

          }
        }
    }
</script>
<style scoped>

</style>
