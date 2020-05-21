<template>
    <el-container>
            <!-- 侧边栏 -->
    <el-aside width="200px">
      <!-- 侧边栏菜单区 -->
      <span><br>您可以通过点击来生成题目<br>
      </span>
      <el-button @click='single()'>单选题</el-button>
    <el-button @click='multi()'>多选题</el-button>
    <el-button @click='text()'>文本框</el-button>
    </el-aside>
    <!-- 右侧内容主题 -->
    <el-main>

    <h1>问卷标题： {{title}}</h1>
    <draggable tag="ul"
               :list="list"
               v-bind="dragOptions"
               class="list-group"
               handle=".handle"
               @start="drag = true"
               @end="drag = false">
      <transition-group type="transition"
                        :name="!drag ? 'flip-list' : null">
        <!--<li class="list-group-item"
            v-for="(element, idx) in list"
            :key="element.name">
          <span class="handle">拖</span>
          <span class="text">{{ element.name }} </span>
          <span class="close"
                @click="removeAt(idx)">删</span>
        </li>-->
        <el-card v-for="(q,index) in Questionnaires[myindex].questions" :key="index" :label="q.question">
          <el-input v-if="q.type=='input'" v-model="q.answer"></el-input>
        <el-checkbox-group v-if="q.type=='checkbox'" v-model="q.answer">
          <el-checkbox v-for="(c,index) in q.choices" :key="index" :label="c"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="q.type=='radio'" v-model="q.answer">
          <el-radio v-for="(c,index) in q.choices" :key="index" :label="c"></el-radio>
        </el-radio-group>
        </el-card>
      </transition-group>
    </draggable>
    <!--<el-form :model="Questionnaires[myindex] " >
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
    </el-form>-->

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
    single () {
      console.log('c')
    },
    multi () {
      console.log('c')
    },
    text () {
      console.log('c')
    }

  }
}

</script>

<style lang="less" scoped>

.el-aside {
    border: 1px solid #eee;
    background-color:"#ABD4ED";
    text-align: center;
}
.el-main {
    border: 1px solid #eee
}
.el-button {
  margin: 5px 0 0 0;
}
</style>
