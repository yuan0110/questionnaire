<template>
    <el-container>
      <!-- 子导航栏 -->
    <el-header>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item :index="editPath">编辑</el-menu-item>
        <el-menu-item index="/welcome">投放</el-menu-item>
        <el-menu-item :index="statPath">统计</el-menu-item>
     </el-menu>
    <el-button @click='preview(myindex)'>预览</el-button>
    <el-button >开始回收</el-button>
    </el-header>
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
    <el-main>
    <el-input type="input" v-model="questionnaire.title"></el-input>
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
          <el-button type="primary" icon="el-icon-delete" style='float:right;margin-left:5%' size="mini" round @click="deleteQuestion(index)"></el-button>
          <el-button v-if="q.type!='input'" type="primary" icon="el-icon-plus" style='float:right;margin-left:5%' size="mini" round @click="addChoices(index)"></el-button>
          <el-button class="handle" type="primary" icon="el-icon-rank" style='float:right;margin-left:5%' size="mini" round></el-button>
          <el-input type="input"  v-model="q.question"></el-input>
          <div class="input_vr_icon" v-if="q.type=='input'" ></div>
          <div v-if="q.type=='checkbox'">
          <el-checkbox disabled v-for="(c,cindex) in q.choices" :key="cindex" :label="c+cindex">
            <el-input type="input" v-model='q.choices[cindex]'></el-input>
            <el-button @click="deleteChoices(index, cindex)" class="el-input__icon el-icon-close"></el-button>
          </el-checkbox>
          </div>
          <div  v-if="q.type=='radio'">
          <el-radio disabled v-for="(c,cindex) in q.choices" :key="cindex" :label="c+cindex">
            <el-input type="input" v-model='q.choices[cindex]'></el-input>
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
    <el-button type="primary" style="margin-left:20%">发布并分享</el-button>
    </div>
    </el-main>
    </el-container>

</template>

<script>
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      // myindex 被我选中的问卷索引
      drag: false,
      editPath: '',
      statPath: '',
      userName: this.$store.state.userName,
      myindex: 0,
      questionnaire:
        {
          title: '',
          status: '',
          deadline: '',
          questions: []
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
        // console.log(val)
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
    this.editPath = '/edit/' + this.myindex
    const getQuestionReq = {
      userName: this.$store.state.userName,
      index: this.myindex
    }
    // console.log(getQuestionReq)
    this.$http.post('getQuestionnaire', getQuestionReq).then(
      response => {
        this.questionnaire = response.data.data
      }
    ).catch(e => { console.log(e) })
    // this.questionnaire.deadline.setTime(this.questionnaire.deadline.getTime() + 1 * 3600 * 1000 * 24)
    this.statPath = '/stat/' + this.myindex
  },
  mounted () {
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    console.log(this.questionnaire.deadline)
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
  border: none;
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
    > div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
    position: fixed;
    width: 100%;
    z-index: 500;
}
</style>
