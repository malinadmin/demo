<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        isIos: false,
        transitionName: ''
      }
    },
    watch: {
      $route(to, from) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > 0) {
          if (to.meta.index < from.meta.index) {
            this.transitionName = 'slide-right';
          } else {
            this.transitionName = 'slide-left';
          }
        } else if (to.meta.index == 0 && from.meta.index > 0) {
          this.transitionName = 'slide-right';
        }
      }
    },
    mounted() {
      this.getDevice();
    },
    methods: {
      getDevice() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          this.isIos = true;
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    position: absolute;
    width: 100%;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }

  .slide-left-enter {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
