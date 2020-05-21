<template>
    <el-container>
            <!-- 侧边栏 -->
    <el-aside width="200px">
      <!-- 侧边栏菜单区 -->

    </el-aside>
    <!-- 右侧内容主题 -->
    <el-main>

    <h1>问卷标题： {{title}}</h1>
    <el-form :model="Questionnaires[myindex] " >
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
        <el-button type="primary" >提交</el-button>
        <el-button>取消</el-button></el-form-item>
    </el-form>

    </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // myindex 被我选中的问卷索引
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
              question: '单选问题',
              choices: ['选项1', '选项2'],
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
  created () {

  },
  mounted () {
    this.myindex = this.$route.query.choose
    this.title = this.Questionnaires[this.myindex].title
  },
  methods: {

  }
}

</script>

<style lang="less" scoped>

.el-aside {
    border: 1px solid #eee;
}
.el-main {
    border: 1px solid #eee
}
</style>
