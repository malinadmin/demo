<template>
    <div>
      <headers class="header"></headers>
      <div class="content">
        <van-cell-group>
          <van-field
            v-model="username"
            label="邮箱"
            placeholder="请输入邮箱"
            :error-message="errors.first('email')"
            v-validate="'required|email'" name="email"
          />
        </van-cell-group>

        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
            to="/maintest"
          />
        </van-list>
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
              username:'',
              phone:'',
              list: [],
              loading: false,
              finished: false
            }
        },
        mounted () {

        },
        methods: {
          onLoad() {
            // 异步更新数据
            setTimeout(() => {
              for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1);
              }
              // 加载状态结束
              this.loading = false;

              // 数据全部加载完成
              if (this.list.length >= 40) {
                this.finished = true;
              }
            }, 500);
          }
        }
    }
</script>

<style scoped>

</style>
