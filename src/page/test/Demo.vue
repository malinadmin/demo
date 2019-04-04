<template>
  <div>
    <headers class="header"></headers>
    <div class="content">
      <UploadFile OperationCode="需要用到的附件编码" v-show="nature=='upload'"></UploadFile>
      <van-cell title="查看照片" v-show="nature=='Ckimg'">
        <FjList OperationID="附件id" OperationCode="附件编码"></FjList>
      </van-cell>
      <van-cell title="通用部门选择" value="点击选择部门(单选)" v-show="nature=='bmlist'" @click="chak('radio')"/>
      <van-cell title="通用部门选择" value="点击选择部门(多选)" v-show="nature=='bmlist'" @click="chak('result')"/>
      <van-cell title="下拉框选择器" :value="valuea=='' ? '点击选择a' : valuea" v-show="nature=='selectdown'"
                @click="selctdown('a')"/>
      <van-cell title="下拉框选择器" :value="valueb=='' ? '点击选择b' : valueb" v-show="nature=='selectdown'"
                @click="selctdown('b')"/>
    </div>
    <van-popup v-model="show" position="bottom" class="bottom" :close-on-click-overlay="false">
      <Departmentlist :menberlexin="menberlexin" v-on:childByValue="childByValue" v-if="show"></Departmentlist>
    </van-popup>
    <van-popup v-model="piker" position="bottom" :close-on-click-overlay="false">
      <Piker :columns="columns" v-on:pikers="pikers" ref="mypiker" v-if="piker"></Piker>
    </van-popup>
  </div>
</template>
<script>
  import headers from '@/components/PageHeader'
  import UploadFile from '@/components/UploadFile' //图片上传
  import FjList from '@/components/FjList' //图片查看
  import Departmentlist from '@/components/Departmentlist' //通用部门选择支持单选多选
  import Piker from '@/components/Piker' //piker选择器
  export default {
    components: {
      headers,
      UploadFile,
      FjList,
      Departmentlist,
      Piker
    },
    data() {
      return {
        nature: this.$route.query.nature,
        show: false,
        piker: false,
        valuea: '',
        valueb: '',
        menberlexin: '',
        columns: []
      }
    },
    mounted() {

    },
    methods: {
      chak(val) {
        this.show = true
        this.menberlexin = val
      },
      selctdown(val) {
        this.columns = []
        this.piker = true
        const isAllRed = this.handleTable(val).filter(f => f.name == 'a');
        isAllRed[0].method(this.getdata2(),val)

      },
      childByValue(val) {
        this.show = false
      },
      pikers(val) {
        this.piker = false
        const isAllRedb = this.handleTable(val.flage).filter(f => f.name == 'a');
        isAllRedb[0].methods(val)
      },
      //数据集放一块集中操作
      handleTable(key, condition) {
        let vm = this;
        const fruits = []
        fruits.push({
          name: key, condition: condition, method(obj,key) {
            vm.columns.push({keyid: obj[0].keyid, text: obj[0].text, flage: key})
            //
          },
          methods(val) {
              return val
          }
        })
        return fruits
      },
      //获取数据字典方法
      getdata(){
        let arry = []
        arry.push({keyid: '1', text: '是'})
        return arry
      },
      //获取数据字典方法示例2
      getdata2(){
        let arry = []
        arry.push({keyid: '0', text: '是'},{keyid: '1', text: '是'},{keyid: '2', text: '是'})
        return arry
      }
    }
  }
</script>
<style scoped>
  .bottom {
    height: 100%;
  }
</style>
