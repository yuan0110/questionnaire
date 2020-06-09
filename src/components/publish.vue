<template>
      <!-- 子导航栏 -->
    <div class="cover">
    <div v-show="status=='已发布'">
        <p>请复制以下链接进行分享或扫描二维码</p>
        <el-input disabled v-model="url">
            <el-button style="background-color:#91E3BE" slot="append" class="el-icon-tickets" @click="copy()"></el-button>
        </el-input>
        <div id="qrcode"></div>
    </div>
    <div v-show="status=='未发布'">
        <el-button type="primary" @click="pub()">发布并分享</el-button>
    </div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      status: '',
      url: '',
      getQuestionnaireStatusReq: {},
      deadline: ''
    }
  },
  created () {
    this.getQuestionnaireStatusReq = {
      userName: this.$store.state.userName,
      index: parseInt(this.$route.params.id)
    }
    const url = window.location.href.split('/')
    this.url = url.slice(0, -2).join('/') + '/myform/' + this.$store.state.userName + '/' + parseInt(this.$route.params.id)
    this.$http.post('getQuestionnaireStatus', this.getQuestionnaireStatusReq).then(
      response => {
        this.status = response.data.data
      }
    ).catch(e => { console.log(e) })
    this.$http.post('getQuestionnaire', this.getQuestionnaireStatusReq).then(
      response => {
        this.deadline = response.data.data.deadline
        console.log(this.deadline)
      }
    ).catch(e => { console.log(e) })
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      // 为id为qrcode的tag绑定一个二维码图
      const q = new QRCode('qrcode', {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: that.url // 生成二维码的链接
      })
      console.log(q)
    })
  },
  methods: {
    copy () {
      var Url2 = this.url
      var oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    pub () {
      var myDate = new Date()
      myDate.toLocaleString()
      const line = new Date(this.deadline)
      if (line < myDate) {
        this.$message({
          type: 'info',
          message: '当前截止时间低于当前时间，请修改截止时间'
        })
      } else {
        this.$confirm('确定发布问卷?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('publish', this.getQuestionnaireStatusReq).then(
            response => {
              this.status = '已发布'
            }
          ).catch(e => { console.log(e) })
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      }
    }
  }
}
</script>
<style lang="less">
.cover{
  margin-top:120px;
  background-color:#f7f8fa;
  height:100%;
  >div{
    margin: 10% 35% 0 35%;
    text-align:center;
    >.el-input>.el-input__inner{
      background-color: #D3F2E4;
    }
  }
}
#qrcode{
  display:flex;
  justify-content: center;
  margin-top:2%;
}
</style>
