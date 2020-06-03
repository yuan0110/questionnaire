<template>
    <el-container>
      <!-- 侧边栏 -->
    <el-aside width='15%'>
      <!-- 侧边栏菜单区 -->
      <span><br>您可以通过点击来生成题目<br>
      </span>
      <el-button @click='single()'>单选题</el-button>
    <el-button @click='multi()'>多选题</el-button>
    <el-button @click='text()'>文本框</el-button>
    </el-aside>
    <!-- 右侧内容主题 -->
    <el-main v-loading="loading">
    <el-input type="input" v-model="questionnaire.title" onfocus="this.select()"></el-input>
    <draggable tag="div"
               v-bind="dragOptions"
               class="list-group"
               handle=".handle"
               v-model="questionnaire.questions"
               @update="datadragEnd"
               @start="drag = true"
               @end="drag = false">
      <transition-group type="transition"
                        :name="!drag ? 'flip-list' : null">
        <el-card class='list-group-item' v-for="(q,index) in questionnaire.questions" :key="index">
          <span>{{(index+1)+'、  '}}</span>
          <el-popconfirm title="这条问题确定删除吗？" v-on:onConfirm="deleteQuestion(index)">
            <el-button slot="reference" type="primary" icon="el-icon-delete" style='float:right;margin-left:5%' size="mini" round></el-button>
          </el-popconfirm>
          <el-button v-if="q.type!='input'" type="primary" icon="el-icon-plus" style='float:right;margin-left:5%' size="mini" round @click="addChoices(index)"></el-button>
          <el-button class="handle" type="primary" icon="el-icon-rank" style='float:right;margin-left:5%' size="mini" round></el-button>
          <el-input type="input"  v-model="q.question" onfocus="this.select()"></el-input>
          <div class="input_vr_icon" v-if="q.type=='input'" ></div>
          <div v-if="q.type=='checkbox'">
          <el-checkbox disabled v-for="(c,cindex) in q.choices" :key="cindex" :label="c+cindex">
            <el-input type="input" v-model='q.choices[cindex]' onfocus="this.select()"></el-input>
            <el-button @click="deleteChoices(index, cindex)" class="el-input__icon el-icon-close"></el-button>
          </el-checkbox>
          </div>
          <div  v-if="q.type=='radio'">
          <el-radio disabled v-for="(c,cindex) in q.choices" :key="cindex" :label="c+cindex">
            <el-input type="input" v-model='q.choices[cindex]' onfocus="this.select()"></el-input>
            <el-button @click="deleteChoices(index, cindex)" class="el-input__icon el-icon-close"></el-button>
          </el-radio>
          </div>
        </el-card>
      </transition-group>
    </draggable>
    <div style="margin-bottom:5%" class="block">
    <span style="margin-left:15%" class="demonstration">问卷截止时间:</span>
    <el-date-picker
      v-model="questionnaire.deadline"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      size="large"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="primary" style="margin-left:20%" @click="goToPublish()">发布并分享</el-button>
    </div>
    </el-main>
    </el-container>

</template>

<script>
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      loading: true,
      drag: false,
      userName: this.$store.state.userName,
      myindex: 0,
      questionnaire:
        {
          title: '',
          status: '',
          deadline: '',
          questions: []
        },
      getQuestionReq: {
      },
      pickerOptions: {
        shortcuts: [{
          text: '三天后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 1 * 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 7 * 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一月后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 30 * 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  watch: {
    questionnaire: {
      handler: function (val, oldval) {
        var myDate = new Date()
        myDate.toLocaleString()
        // 对已发布和已截止的问卷进行状态更新
        if (this.questionnaire.deadline != null) {
          const line = new Date(this.questionnaire.deadline)
          // 存储在后台以及当前时间都是使用国际标准时进行比较的，结果无误（即数据以UTC保存但是前端显示时为GMT北京时间）
          if (line < myDate && this.questionnaire.status === '已发布') {
            this.questionnaire.status = '已截止'
          }
          if (line > myDate && this.questionnaire.status === '已截止') {
            this.questionnaire.status = '已发布'
          }
        } else { // 即不设定截止日期
          if (this.questionnaire.status === '已截止') this.questionnaire.status = '已发布'
        }
        const saveQuestionaireReq = {
          userName: this.$store.state.userName,
          index: this.myindex,
          questionnaire: this.questionnaire
        }

        this.$http.post('saveQuestionaire', saveQuestionaireReq).then(
          response => {
            console.log('保存问卷：' + response.status)
          }
        ).catch(e => { console.log(e) })
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  components: {
    draggable
  },
  computed: {
    dragOptions () {
      return {
        animation: 200, // 动画时间
        disabled: false, // false可拖拽，true不可拖拽
        group: 'description',
        ghostClass: 'ghost'
      }
    }
  },
  created () {
    this.myindex = this.$route.params.id
    this.getQuestionReq = {
      userName: this.$store.state.userName,
      index: this.myindex
    }
    this.$http.post('getQuestionnaire', this.getQuestionReq).then(
      response => {
        this.questionnaire = response.data.data
        this.loading = false
      }
    ).catch(e => { console.log(e) })
  },
  mounted () {
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    addChoices (index) {
      const cho = this.questionnaire.questions[index].choices.length
      this.questionnaire.questions[index].choices.push('选项' + (cho + 1))
    },
    deleteChoices (index, cindex) {
      this.questionnaire.questions[index].choices.splice(cindex, 1)
    },
    deleteQuestion (index) {
      this.questionnaire.questions.splice(index, 1)
    },
    datadragEnd (evt) { // 拖动后整个questions数组的顺序也会变化，可提交至后台
      evt.preventDefault()
    },
    goToPublish () {
      var myDate = new Date()
      myDate.toLocaleString()
      if (this.questionnaire.status === '未发布') {
        const line = new Date(this.questionnaire.deadline)
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
            this.$http.post('publish', this.getQuestionReq).then(
              response => {
                this.$router.push({ path: '/publish/' + this.myindex })
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
      } else {
        if (this.questionnaire.status === '已发布') {
          this.$router.push({ path: '/publish/' + this.myindex })
        } else {
          this.$message({
            type: 'info',
            message: '当前问卷已截止，请修改截止时间'
          })
        }
      }
    },
    single () {
      // 用空项补齐答案
      var answer = []
      if (this.questionnaire.questions[0]) {
        for (var i = 0; i < this.questionnaire.questions[0].answer.length; i++) {
          answer.push('')
        }
      }
      this.questionnaire.questions.push(
        {
          type: 'radio',
          question: '单选问题',
          choices: ['选项1', '选项2'],
          answer: answer
        }
      )
      const conelement = document.getElementsByClassName('el-container')[1]
      this.$nextTick(function () {
        window.scrollTo(0, conelement.scrollHeight)
      })
    },
    multi () {
      // 用空项补齐答案
      var answer = []
      if (this.questionnaire.questions[0]) {
        for (var i = 0; i < this.questionnaire.questions[0].answer.length; i++) {
          answer.push([])
        }
      }
      this.questionnaire.questions.push(
        {
          type: 'checkbox',
          question: '多选问题',
          choices: ['选项1', '选项2'],
          answer: answer

        }
      )
      const conelement = document.getElementsByClassName('el-container')[1]
      this.$nextTick(function () {
        window.scrollTo(0, conelement.scrollHeight)
      })
    },
    text () {
      // 用空项补齐答案
      var answer = []
      if (this.questionnaire.questions[0]) {
        for (var i = 0; i < this.questionnaire.questions[0].answer.length; i++) {
          answer.push('')
        }
      }
      this.questionnaire.questions.push(
        {
          type: 'input',
          question: '单行输入问题',
          answer: answer
        }
      )
      const conelement = document.getElementsByClassName('el-container')[1]
      this.$nextTick(function () {
        window.scrollTo(0, conelement.scrollHeight)
      })
    },
    // 预览
    preview (index) {
      this.$router.push({ path: '/myform/' + this.myindex })
    }
  }
}

</script>
<style>
.el-card__body{
  width:90%;
}
.el-card__body>.el-input>.el-input__inner{
  -web-kit-appearance: none;
  -moz-appearance: none;
  font-size: 1.2em;
  height: 2.9em;
  border:none;
  color: #6a6f77;
  outline: 0;
}
.el-radio__label>.el-input>.el-input__inner,
.el-checkbox__label>.el-input>.el-input__inner{
    -web-kit-appearance: none;
  -moz-appearance: none;
  border: none;
  color: #6a6f77;
  outline: 0;
}
.el-main>.el-input>.el-input__inner{
  -web-kit-appearance: none;
  -moz-appearance: none;
  font-size: 1.4em;
  height: 2.9em;
  border: none;
  color: #6a6f77;
  outline: 0;
  text-align: center;
  background-color: #f7f8fa;
 }
</style>
<style lang="less" scoped>
.el-input{
  border:1px solid  rgba(200,200,200,0);;
}
.el-input:hover{
  border: 1px dotted lightblue;
}
.el-radio,
.el-checkbox {
  margin-left:5%;
}
.el-checkbox__label>.el-button,
.el-radio__label>.el-button{
    border:none;
}
.el-checkbox__label>.el-button:hover,
.el-radio__label>.el-button:hover{
    background-color: #fff;
    border:none;
}
.input_vr_icon {
   -moz-appearance: textfield-multiline;
    -webkit-appearance: input;
    border: 1px solid gray;
    font: medium -moz-fixed;
    font: -webkit-small-control;
    height: 28px;
    margin: 5px 0 2px 5%;
    width: 40%;
}
/*.el-input__inner:hover {
  border:1px dotted gray;
}*/
.el-card {
  margin: 3% 0 0 5%;
  .el-input{
    margin:0 0 0 5%;
    padding:0 0 0 0;
  }
}
.el-aside {
    border: 1px solid #eee;
    background-color: #f7f8fa;
    text-align: center;
    height: 100%;
    position: fixed;
    z-index: 999;
    margin-top: 120px;
}
.el-main {
    border: 1px solid #eee;
    margin-left: 15%;
    margin-top: 120px;
}
.el-button {
  margin: 5px 0 0 0;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.el-container {
  width: 100%;
  .handle {
    cursor: move;
  }
  .list-group {
    margin-bottom: 50px;
    .list-group-item {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border: 1px solid #ccc;
      line-height: 40px;
    }
  }
}
.el-header {
    background-color: #ffffff;
    border: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 20px;
    margin-top: 60px;
    position: fixed;
    width: 100%;
    z-index: 500;
    > div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
}
</style>
