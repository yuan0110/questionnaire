<template>
<div>
问卷标题： {{this.Questionnaire.title}}
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
        <el-button type="primary" @click="submitAnswer">提交</el-button>
        <el-button>取消</el-button></el-form-item>
    </el-form>
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
    async submitAnswer () {
      const { data: res } = await this.$http.post('submitAnswer', {
        index: this.myindex, userName: this.userName, answers: this.answers
      })
      console.log(res)
      console.log(this.answers)
    },
    async getQuestionnaire () {
      const { data: res } = await this.$http.post('getQuestionnaire', {
        index: this.myindex, userName: this.userName
      })
      this.Questionnaire = res.data
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
<style lang="less" scoped>
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
