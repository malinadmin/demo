<template>
  <div>
    <headers class="header"></headers>
    <div class="content">
      <van-cell-group title="公用组件示例">
        <van-cell title="多个子页面"  is-link to="/test"/>
        <van-cell title="图片上传"   is-link  :to="{path:'/Demo',query:{nature:'upload'}}"/>
        <van-cell title="照片查看器"   is-link  :to="{path:'/Demo',query:{nature:'Ckimg'}}"/>
        <van-cell title="通用选择部门"   is-link  :to="{path:'/Demo',query:{nature:'bmlist'}}"/>
        <van-cell title="下拉框选择器"   is-link  :to="{path:'/Demo',query:{nature:'selectdown'}}"/>
      </van-cell-group>
    </div>
    <footers class="footer"></footers>
  </div>
</template>
<script>
  import {Md5Key, md5, AjaxHttp,Toast} from '@/ServersConfing/serversconfing.js';
  import headers from '@/components/MainHeader'
  import footers from '@/components/footer'
  export default {
    components: {
      headers,
      footers
    },
    data() {
      return {

      }
    },
    mounted () {

    },
    watch:{

    },
    activated(){

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
