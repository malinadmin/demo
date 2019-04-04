<template>
  <div>
    <div class="header">
      <van-nav-bar
        left-text="取消"
        @click-left="onClickLeft"
        title="请选择部门"
        @click-right="onClickRight"
      >
        <van-icon name="" slot="right" v-if="radio!=''||result!=''">确认选择</van-icon>
      </van-nav-bar>
    </div>
    <div class="contents">
      <van-search
        v-model="DeptName"
        placeholder="请输入部门名称"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <!--单选-->
      <div v-for="(item,index) in list" :key="index" @click="change(item)" v-if="menberlexin=='radio'">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell :title="item.F_FullName">
              <van-radio :name="item"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <!--多选-->
      <van-checkbox-group v-model="result" v-if="menberlexin=='result'">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in list"
            clickable
            :key="index"
            :name="item"
            :title="`${item.F_FullName}`"
            @click="toggle(index)"
          >
            <van-checkbox :name="item" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="nodata" v-if="list.length==''">暂无数据</div>
    </div>
  </div>
</template>

<script>
  import {Md5Key, md5, AjaxHttp, Toast,} from '@/ServersConfing/serversconfing.js';

  export default {
    props: ["menberlexin"],  //menberlexin=radio为单选menberlexin=result为多选
    name: 'hello',
    data() {
      return {
        list: [{F_FullName:"王五",F_DepartmentId:"1"},{F_FullName:"王五",F_DepartmentId:"2"}],
        result: [], //多选
        radiotext: '',
        DeptName:'',
        radio: '',
        text: '',
        CompanyId: '', //公司id(不传)
        ParentId: '', //部门父级编号
        UserID: localStorage.getItem("UserID"),
      }
    },
    mounted() {
      //this.getlist();
    },
    watch: {},
    methods: {
      onClickRight() {
        let obj = [];
        if (this.menberlexin == 'result') {
          //如果是用车人
          obj = []
          for (let i = 0; i < this.result.length; i++) {
            obj.push({name: this.result[i].F_FullName, value: this.result[i].F_DepartmentId})
          }
        } else {
          //obj.push({value: this.radio, name: this.radiotext})
          console.log(this.radio)
        }
        this.$emit('childByValue', obj)
      },
      onClickLeft() {
        let obj = ''
        this.$emit('childByValue', obj)
      },
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
      onSearch(){

      },
      getlist() {
        let MD5 = md5(this.CompanyId + this.ParentId + Md5Key);
        let getapi = "GetDepartments|CompanyId=" + this.CompanyId + "|ParentId=" + this.ParentId + "|MD5=" + MD5;
        let suscess = (e) => {
          if (e.data.result == 1) {
            if (e.data.list != '') {
              this.list = e.data.list;
            }
          } else {
            Toast.fail(e.data.message);
          }
        }
        let error = function (e) {
          Toast.fail(e.data.message);
        }
        AjaxHttp(getapi, suscess, error);
      }
    }
  }
</script>

<style scoped>
  .footer {
    display: flex;
  }

  .footer div {
    flex: 1;
  }

  .header {
    position: static;
  }

  .content {
    padding-top: 0;
  }
</style>
