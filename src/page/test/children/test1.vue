<template>
    <div class="page">
      <headers class="header"></headers>
      <div>
        这里是二级页面
      </div>
    </div>
</template>
<script>
  import headers from '@/components/PageHeader'
    export default {
      components: {
        headers
      },
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>
<style lang="scss" scoped="" type="text/scss">
  @import '../../../css/mixin';
  .page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 45px;
    z-index: 9999;
    background-color: #fff;
  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
  }
</style>
