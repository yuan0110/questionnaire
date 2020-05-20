<template>
<el-row >
    <el-card  v-for="q in question" :key="q.id" class="box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{q.name}}</span>
    <el-button style="float: right; padding: 3px 0; margin:0 2px" type="text">删除</el-button>
    <el-button style="float: right; padding: 3px 0; margin:0 2px" type="text">发布</el-button>
    <el-button style="float: right; padding: 3px 0; margin:0 2px" type="text">编辑</el-button>
  </div>
  <div class="text item">
    {{'状态 ' + q.status }}
  </div>
  <div class="text item">
    {{'截止时间 ' + q.time }}
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
        { id: 'sdfds', name: '问卷一', status: '发布中', time: '2020-5-20 12:00' },
        { id: 's', name: '问卷二', status: '已截止', time: '2020-5-20 12:00' }
      ]
    }
  },
  created () {

  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }

  }

}
</script>
<style>
  .el-card{
      margin: 3% 0 0 5%;
      float: left;
  }
  .el-row {
    margin-bottom: 20px;
    width: 100%;
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
