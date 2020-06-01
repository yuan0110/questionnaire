<template>
<div>
问卷标题： {{this.Questionnaire.title}}
    <el-form :model="Questionnaire">
      <el-form-item v-for="(q,index) in Questionnaire.questions" :key="index" :label="q.question">
        <el-input v-if="q.type=='input'" v-model="q.answer"></el-input>
        <el-checkbox-group v-if="q.type=='checkbox'" v-model="q.answer">
          <el-checkbox v-for="(c,index) in q.choices" :key="index" :label="c"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="q.type=='radio'" v-model="q.answer">
          <el-radio v-for="(c,index) in q.choices" :key="index" :label="c"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
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
      Questionnaire:
        {
          title: '问卷标题',
          questions: [
            {
              type: 'input',
              question: '单行输入问题',
              answer: []
            },
            {
              type: 'radio',
              question: '单选问题',
              choices: ['选项1', '选项2'],
              answer: []
            },
            {
              type: 'checkbox',
              question: '多选问题',
              choices: ['选项1', '选项2'],
              answer: []
            }
          ]
        }
    }
  },
  methods: {
    submitForm () {
      this.$message.success({ message: '提交', duration: 1000 })
    }

  },
  created () {
    this.myindex = this.$route.params.id
    this.userName = this.$route.params.userName
    console.log(this.userName + ' ' + this.myindex)
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
