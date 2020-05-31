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
    <span style="color:#909399">状态: </span><span :class='{ isA:q.status=="未发布",isB:q.status=="已发布",isC:q.status=="已截止" }'>{{q.status }}</span>
  </div>
  <div class="text item" style="color:#409EFF">
    <span style="color:#909399">截止时间: </span>{{ q.deadline===""?"无":formatUTC("YYYY-mm-dd HH:MM",q.deadline) }}
  </div>
</el-card>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      question: [
      ]
    }
  },
  created () {
    this.$http.post('getQuestionaireInfo', { userName: this.$store.state.userName }).then(
      response => {
        this.question = response.data.data
        console.log(this.question)
        console.log('请求问卷信息数组成功')
      }
    ).catch(e => { console.log(e) })
  },
  methods: {
    formatUTC (fmt, utc) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      const Tpos = utc.indexOf('T')
      const Zpos = utc.indexOf('Z')
      const day = utc.substr(0, Tpos)
      const hours = utc.substr(Tpos + 1, Zpos - Tpos - 1)
      const datetime = day + ' ' + hours // 2017-03-31 08:02:06

      // 处理成为时间戳
      let timeStamp = new Date(Date.parse(datetime)).getTime() / 1000

      // 增加8个小时，北京时间比utc时间多八个时区
      timeStamp = timeStamp + 8 * 60 * 60

      // 时间戳转为时间
      const date = new Date(parseInt(timeStamp) * 1000)
      // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
      };
      return fmt
    },
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
      this.$http.post('createQuestionaire', { userName: this.$store.state.userName }).then(
        response => {
          console.log('创建问卷成功')
        }
      ).catch(e => { console.log(e) })
      this.$router.push({
        path: '/edit' + 0 // 跳转路由
      })
    }
  }
}
</script>
<style lang="less" scoped>
.isA{
  color:#E6A23C;
}
.isB{
  color:#67C23A;
}
.isC{
  color:#F56C6C;
}
  .el-card {
      margin: 3% 0 0 5%;
      float: left;
  }
  .el-row {
    margin-top: 60px;
    background-color: #f7f8fa;
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
