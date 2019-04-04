<template>
    <div>
      <ul id="PicUpload">
        <li>
          <viewer :images="signImages">
            <img v-for="src in signImages" :src="src" :key="src" width="50">
          </viewer>
        </li>
      </ul>
    </div>
</template>
<script>
  import {Md5Key, md5, AjaxHttp, Toast,Dialog} from '@/ServersConfing/serversconfing.js';
    export default {
        components: {

        },
        //接收一个附件编码和附件主键OperationCode为附件编码OperationID为主键
        props:{
          OperationCode: String,
          OperationID: String,
          required: true
        },
        data() {
            return {
              UserID:localStorage.getItem("UserID"),
              signImages: []
            }
        },
        mounted() {
            //this.AccessoriesList();
        },
        methods: {
          AccessoriesList(){
            let MD5 = md5(this.UserID + this.OperationCode + this.OperationID + Md5Key);
            let getapi = "AccessoriesList|UserID=" + this.UserID + "|OperationCode=" + this.OperationCode + "|OperationID=" + this.OperationID+ "|MD5=" + MD5;
            let suscess = (e) => {
              if (e.data.result == 1) {
                for (let i = 0; i < e.data.list.length; i++) {
                  if (e.data.list[i].FileType === 'jpg' || e.data.list[i].FileType === 'png' || e.data.list[i].FileType === 'gif' || e.data.list[i].FileType === 'JPG') {
                    this.signImages.push(e.data.list[i].FullPath)
                  } else {
                    //其它附件
                  }
                }
              } else {
                Toast(e.data.message);
              }
            }
            let error = function (e) {
              Toast(e.data.message);
            }
            AjaxHttp(getapi, suscess, error);
          }
        }
    }
</script>
<style scoped>
  #PicUpload li{
    flex: 1;
  }
  #PicUpload li img{
    width: 30%;
  }
</style>
