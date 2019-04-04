<template>
  <div>
    <headers></headers>
    <div>
      <van-cell title="打开子页面(看路由变化)" is-link to="/test/test1"/>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
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
  @import '../../css/mixin';
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
