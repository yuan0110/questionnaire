<template>
<div class="myform_container">
 <div class="content_box">
   <div class="begin_content">
       <p class="title">
       {{this.Questionnaire.title}}
       </p>
    <div class="bar"></div>
   </div>
   <div class="question_box">
    <el-form :model="Questionnaire">
      <el-form-item v-for="(q,index) in Questionnaire.questions" :key="index" :label="q.question">
        <el-input v-if="q.type=='input'" v-model="answers.questions[index].answer[0]"></el-input>
        <el-checkbox-group v-if="q.type=='checkbox'" v-model="answers.questions[index].answer[0]">
          <el-checkbox v-for="(c,index) in q.choices" :key="index" :label="c"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="q.type=='radio'" v-model="answers.questions[index].answer[0]">
          <el-radio v-for="(c,index) in q.choices" :key="index" :label="c"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button>取消</el-button></el-form-item>
    </el-form>
    </div>
    <div class="clearfloat"></div>
    </div>
 </div>
</template>>
<script>
export default {
  data () {
    return {
      myindex: '',
      userName: '',
      Questionnaire: {},
      answers: { questions: [] }
    }
  },
  methods: {
    async submitForm () {
      for (var i = 0; i < this.Questionnaire.questions.length; i++) {
        if (this.answers.questions[i].answer[0] === '') {
          return this.$message.error('问题答案不能为空，请重新输入')
        }
      }
      const { data: res } = await this.$http.post('submitAnswer', {
        index: this.myindex, userName: this.userName, answers: this.answers
      })
      console.log(res)
      console.log(this.answers)
    },
    async getQuestionnaire () {
      const { data: res } = await this.$http.post('myForm', {
        index: this.myindex, userName: this.userName
      })
      this.Questionnaire = res.data
      console.log(res.data)
      for (var i = 0; i < this.Questionnaire.questions.length; i++) {
        if (this.Questionnaire.questions[i].type === 'checkbox') {
          this.answers.questions.push({ answer: [[]] })
        } else {
          this.answers.questions.push({ answer: [''] })
        }
      }
    }
  },
  created () {
    this.myindex = this.$route.params.id
    this.userName = this.$route.params.userName
    this.getQuestionnaire()
  }
}
</script>
<style lang="less">
.el-header {
    background-color: #ffffff;
    border: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 30px;
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
.el-form-item__label{
    font-weight:bold;
    font-size:35px;
}

div{
    display: block;
    left:0%;
    top:0%;
}
.myform_container{
    background-color: #F5F5F5;
    height: 100%;
}
.begin_content{
    display: block;
    margin-top: 20px;
}
.title{
    font-weight:bold;
    font-size:18px;
}
.bar{
    float: left;
    width: 100%;
    height: 3px;
    background-color: #53a4f4;
}
.content_box{
    width: 80%;
    background-color: #fff;
    padding: 1% 5% 3%;
    position: absolute;
    left: 5%;
    top: 5%;
    border-radius: 10px 0px 0px 10px;
    border:1px solid #ccc;
    max-height:85%;
    overflow-y:auto;
}
.question_box{
    margin-top: 20px;
}
.clearfloat{
   clear:both;
   height:0;
   font-size:1px;
   line-height:0px;
}
</style>
