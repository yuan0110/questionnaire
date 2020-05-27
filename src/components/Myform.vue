<template>
<div>
问卷标题： {{this.Questionnaires[myindex].title}}
    <el-form :model="Questionnaires[myindex]">
      <el-form-item v-for="(q,index) in Questionnaires[myindex].questions" :key="index" :label="q.question">
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
      title: '',
      Questionnaires: [
        {
          title: '问卷一',
          questions: [
            {
              type: 'input',
              question: '单行输入问题',
              answer: ''
            },
            {
              type: 'radio',
              question: '您是否觉得宿舍不够干净？',
              choices: ['非常', '一般', '否'],
              answer: ''
            },
            {
              type: 'checkbox',
              question: '多选问题',
              choices: ['选项1', '选项2'],
              answer: []
            }
          ]
        },
        {
          title: '问卷二',
          questions: [
            {
              type: 'radio',
              question: '单选问题',
              choices: ['1', '2', '3'],
              answer: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    submitForm () {
      this.$message.success({ message: '提交', duration: 1000 })
    }

  },
  created () {
    this.myindex = this.$route.params.id
    this.title = this.Questionnaires[this.myindex].title
  }
}
</script>
