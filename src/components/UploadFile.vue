<template>
  <div>
    <div class="flies_box">
      <div class="flies_header">
        <p>上传图片</p>
        <van-uploader
          :after-read="onRead"
          capture="camera"
          :accept="accept?accept:'image/gif, image/jpeg, image/png'"
          :multiple="multiple"
        >
          <div class="flies_but">本地上传</div>
        </van-uploader>
      </div>
      <ul class="flies_conts">
        <li v-for="(item,index) in flies" :key="index">
          <div>
            <viewer>
              <img :src="item.url">
            </viewer>
            <i @click="deleteFile(index)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Md5Key, md5, AjaxHttp, Toast, serveraddress} from '@/ServersConfing/serversconfing.js';
  import axios from 'axios';

  export default {
    name: "Files",
    data() {
      return {
        flies: [],//附件
        UserID: localStorage.getItem('UserID'),//用户id
      }
    },
    /*
    OperationID==>相关任务id(有即为新增)
    OperationCode==>附件编码(必传)
    multiple==>是否支持多选(true[支持]/false[不支持])
    accept==>支持选择类型(默认为图片)
    */
    props: ['OperationID', 'OperationCode', 'multiple', 'accept'],
    mounted() {
      if (this.OperationID) {
        this.getFiles()
      }
    },
    methods: {
      onRead(file) {
        //判断附件是多选还是单选
        if (file.constructor === Array) {
          for (let i of file) {
            this.upfiles(i)
          }
        } else if (file.constructor === Object) {
          this.upfiles(file)
        }
      },
      upfiles(file) {
        //上传附件
        let fd = new FormData()
        fd.append("upfile", file.file)
        let MD5 = md5(this.UserID + this.OperationCode + Md5Key)
        // 发送 POST 请求
        axios.post(serveraddress + "UploadFile|UserID=" + this.UserID + "|OperationCode=" + this.OperationCode + "|MD5=" + MD5, fd)
          .then((e) => {
            if (e.data.result == 1) {
              this.flies.splice(0, 0, {url: file.content, AttachmentID: e.data.list[0].AttachmentID})
              this.setfiles()
            } else {
              Toast(e.data.message)
            }
          })
          .catch((error) => {
            Toast("错误" + error)
          });
      },
      deleteFile(index) {
        //删除附件
        this.flies.splice(index, 1)
        this.setfiles()
      },
      getFiles() {
        //获取附件
        let MD5 = md5(this.UserID + this.OperationCode + this.OperationID + Md5Key)
        let getapi = "AccessoriesList|UserID=" + this.UserID + "|OperationCode=" + this.OperationCode + "|OperationID=" + this.OperationID + "|MD5=" + MD5
        let suscess = (e) => {
          if (e.data.result == 1) {
            for (let i of e.data.list) {
              this.flies.push({url: i.FullPath, AttachmentID: i.AttachmentID})
              this.setfiles()
            }
          } else {
            Toast(e.data.message)
          }
        }
        let error = (e) => {
          Toast(e.data.message)
        }
        AjaxHttp(getapi, suscess, error);
      },
      setfiles() {
        //返回附件编码
        let Attachments = []//附件编码
        for (let i of this.flies) {
          Attachments.push(i.AttachmentID)
        }
        this.$emit('flies', Attachments.join(","))
      }
    }
  }
</script>

<style scoped>
  .flies_conts {
    display: flex;
    flex-wrap: wrap;
  }

  .flies_conts li {
    width: 33.3%;
    margin-top: 0.25rem;
    display: flex;
    justify-content: center;
  }

  .flies_conts li div {
    width: 2.525rem;
    height: 1.75rem;
    position: relative;
  }

  .flies_conts li div img {
    width: 100%;
    height: 100%;
  }

  .flies_conts li div i {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 0.5rem;
    height: 0.5rem;
  }

  .flies_box {
    padding: 10px 0.375rem;
    border-radius: 3px;
    margin-bottom: 0.25rem;
    background-color: #fff;
    overflow: hidden;
  }

  .flies_header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //margin-bottom: 0.375rem;
  }

  .flies_header p {
    font-size: 14px;
    color: #000;
  }

  .flies_but {
    width: 1.7rem;
    height: 0.75rem;
    border-radius: 4px;
    background: linear-gradient(60deg, rgba(255, 132, 0, 1) 0%, rgba(255, 60, 0, 1) 100%);
    font-size: 13px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
