<template>
  <div>
    <headers class="header"></headers>
    <div class="content">
      <div>
        <button @click="ajax">发起请求</button>
        <button @click="getinfo">获取用户信息</button>
      </div>
    </div>
    <footers class="footer"></footers>
  </div>
</template>
<script>
  import {login,userinfo} from '@/axios/api'; //接口请求方法
  import {Md5Key, md5} from '@/ServersConfing/serversconfing';
  import headers from '@/components/MainHeader'
  import footers from '@/components/footer'

  export default {
    components: {
      headers,
      footers
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      async ajax() {
        let passwrold = md5('0000')
        const params = {
          Account: 'system',
          Password: passwrold,
          LoginType: '0'
        };
        let res = await login(params);
        let Token = res.data[0].Token
        if(res!=''){
          localStorage.setItem("TOKEN",Token)
        }
      },
      async getinfo(){
        const params = {
          UserID: 'system',
          LoginType: '0'
        };
        let res = await userinfo(params);
      }
    }
  }
</script>

<style scoped>

</style>
