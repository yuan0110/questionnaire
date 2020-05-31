<template>
<el-row >
  <el-card style="text-align:center" class="box-card" shadow="hover">
  <el-button type="text" @click='create()'>+新建</el-button>
  <div class="text item">
    无模板
  </div>
  <div class="text item">
    三种题型：单选、多选、文本框
  </div>
</el-card>
    <el-card  v-for="(q,index) in question" :key="index" class="box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{q.title}}</span>
    <i style="float: right; padding: 3px 0; margin:0 2px" class="el-icon-delete" @click='del(index)'></i>
    <i style="float: right; padding: 3px 0; margin:0 2px" class="el-icon-s-promotion" @click='changestatus(index)'></i>
    <i style="float: right; padding: 3px 0; margin:0 2px" class="el-icon-edit" @click="edit(index)"></i>
  </div>
  <div class="text item">
    {{'状态 ' + q.status }}
  </div>
  <div class="text item">
    {{'截止时间 ' + q.deadline }}
  </div>
</el-card>
</el-row>
</template>

<script>
// import bus from '../components/Bus.js'
export default {
  data () {
    return {
      question: [
        { title: '问卷一', status: '未发布', deadline: '2020-5-20 12:00' },
        { title: '问卷二', status: '已截止', deadline: '2020-5-20 12:00' }
      ]
    }
  },
  created () {
    console.log(this.userName)
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    del (index) {
      this.question.splice(index, 1)
    },
    changestatus (index) {
      if (this.question[index].status === '未发布') {
        this.question[index].status = '已发布'
      }
    },
    edit (index) {
      this.$router.push({ path: '/edit/' + index })
    },
    create (index) {
      this.$router.push({
        path: '/edit' // 跳转路由
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .el-card {
      margin: 3% 0 0 5%;
      float: left;
  }
  .el-row {
    margin-top: 60px;
    background-color: #f7f8fa;
    margin-bottom: 20px;
    width: 100%;
    z-index: 999;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 15%;
  }
</style>
