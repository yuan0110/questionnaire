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
    <el-main>

    <h1 style="text-align: center">问卷标题： {{title}}</h1>
    <draggable tag="div"
               v-model="Questionnaires[myindex].questions"
               v-bind="dragOptions"
               class="list-group"
               @update="datadragEnd"
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
        <el-card class='list-group-item' v-for="(q,index) in Questionnaires[myindex].questions" :key="index">
          <p v-if="q.type=='checkbox'" style="margin-top: 0;margin-bottom: 0">{{q.question}}</p>
          <p v-if="(q.type=='radio')||(q.type=='input')" style="margin-top: 0">{{q.question}}</p>
          <el-input v-if="q.type=='input'" v-model="q.answer"></el-input>
        <el-checkbox-group  v-if="q.type=='checkbox'" v-model="q.answer">
          <el-checkbox style="margin-top: 2%" v-for="(c,index) in q.choices" :key="index" :label="c"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group  v-if="q.type=='radio'" v-model="q.answer">
          <el-radio style="margin-top: 2%" v-for="(c,index) in q.choices" :key="index" :label="c"></el-radio>
        </el-radio-group>
        </el-card>
      </transition-group>
    </draggable>
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

  },
  mounted () {
    this.myindex = this.$route.query.choose
    this.title = this.Questionnaires[this.myindex].title
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    var that = this
    var elementResizeDetectorMaker = require('element-resize-detector')
    const conelement = document.getElementsByClassName('el-container')[1]
    console.log(conelement)
    var erd = elementResizeDetectorMaker()
    erd.listenTo(conelement, function (element) {
      var height = element.scrollHeight
      that.$nextTick(function () {
        console.log('Size: ' + height)
        window.scrollTo(0, conelement.scrollHeight)
      })
    })
  },
  methods: {
    datadragEnd (evt) { // 拖动后整个questions数组的顺序也会变化，可提交至后台
      evt.preventDefault()
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.Questionnaires[this.myindex].questions[1].question)
    },
    single () {
      this.Questionnaires[this.myindex].questions.push(
        {
          type: 'radio',
          question: '单选问题',
          choices: ['选项1', '选项2'],
          answer: ''
        }
      )
    },
    multi () {
      this.Questionnaires[this.myindex].questions.push(
        {
          type: 'checkbox',
          question: '多选问题',
          choices: ['选项1', '选项2'],
          answer: []
        }
      )
    },
    text () {
      this.Questionnaires[this.myindex].questions.push(
        {
          type: 'input',
          question: '单行输入问题',
          answer: ''
        }
      )
    }
  }
}

</script>

<style lang="less" scoped>
.el-card{
  float: none;
}
.el-aside {
    border: 1px solid #eee;
    background-color: #f7f8fa;
    text-align: center;
    height: 100%;
    position: fixed;
    z-index: 999;
    margin-top: 60px;
}
.el-main {
    border: 1px solid #eee;
    margin-left: 15%;
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

.container {
  width: 100%;
  text-align: center;
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
      height: 40px;
      line-height: 40px;
      width: 300px;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
