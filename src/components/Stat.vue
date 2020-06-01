<template>
    <el-card class="box-card">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="250"
      border
      stripe
      >
      <el-table-column v-for="(i, index) in questions" :key="index"
      :prop="1 + index + '、' + i.question" :label="1 + index + '、' + i.question" width="180"
      ></el-table-column>
    </el-table>

    <div v-for="(q, index) in questions" :key="index" class="text item" >
    <h4>{{index+1+'.'+q.question}} </h4>
    <el-table v-if="q.type==='input'"
      :data="chartDatas[index]"
      style="width: 100%"
      height="250"
      border
      stripe
      >
      <el-table-column  prop="index" label="编号" width="180"></el-table-column>
      <el-table-column  prop="answer" label="文本答案" width="180"></el-table-column>

    </el-table>

    <el-radio-group v-model="chartSettings[index].type" v-if="q.type!=='input'"  style="margin-bottom: 30px;">
    <el-radio-button label="pie">饼图</el-radio-button>
    <el-radio-button label="line">折线图</el-radio-button>
    <el-radio-button label="histogram">柱状图</el-radio-button>
    </el-radio-group>

    <ve-chart :data="chartDatas[index]" v-if="q.type!=='input'" :settings="chartSettings[index]"  style="border: 1px solid #eee;"></ve-chart>
    </div>
    </el-card>

</template>

<script>
/*
回收数据表，统计图
*/
export default {
  data () {
    return {
      // myindex 被我选中的问卷索引
      editPath: '',
      statPath: '',
      userName: this.$store.state.userName,
      myindex: 0,
      title: '',
      questions: [],
      tableData: [],
      chartDatas: [],
      chartSettings: []
    }
  },
  watch: {
    questions: {
      handler: function (val, oldval) {
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  components: {
  },
  computed: {
  },
  created () {
    this.myindex = this.$route.params.id
    this.getAnswer()
  },
  mounted () {

  },
  methods: {
    async getAnswer () {
      const { data: res } = await this.$http.post('getAnswer', {
        index: this.myindex, userName: this.userName
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取列表失败！')
      }
      this.$message.success('获取列表成功！')
      this.title = res.data.title
      this.questions = res.data.questions
      // 处理表格数据
      this.tableData = []
      for (var i = 0; i < this.questions[0].answer.length; i++) {
        var temp = {}
        for (var j = 0; j < this.questions.length; j++) {
          temp[j + 1 + '、' + this.questions[j].question] = this.questions[j].answer[i]
        }
        this.tableData.push(temp)
      }
      // 处理统计图数据
      for (i = 0; i < this.questions.length; i++) {
        var q = this.questions[i]
        if (q.type === 'input') {
          temp = []
          for (var k = 0; k < q.answer.length; k++) {
            temp.push({ answer: q.answer[k], index: k + 1 })
          }
          this.chartDatas.push(temp)
        } else if (q.type === 'radio') {
          temp = {
            columns: ['choice', '数量'],
            rows: []
          }
          for (j = 0; j < q.choices.length; j++) {
            var c = q.choices[j]
            var num = 0
            for (k = 0; k < q.answer.length; k++) {
              if (q.answer[k] === c) {
                num++
              }
            }
            temp.rows.push({ choice: c, 数量: num })
          }
          this.chartDatas.push(temp)
        } else if (q.type === 'checkbox') {
          temp = {
            columns: ['choice', '数量'],
            rows: []
          }
          for (j = 0; j < q.choices.length; j++) {
            c = q.choices[j]
            num = 0
            for (k = 0; k < q.answer.length; k++) {
              for (var l = 0; l < q.answer[k].length; l++) {
                if (q.answer[k][l] === c) {
                  num++
                }
              }
            }
            temp.rows.push({ choice: c, 数量: num })
          }
          this.chartDatas.push(temp)
        }
      }
      // 图表选择初始化
      for (i = 0; i < this.questions.length; i++) {
        this.chartSettings.push({ type: 'pie' })
      }
    }
  }
}
</script>

<style lang="less" scoped>

.el-card {
  margin: 0% 5% 0 5%;
  padding: 10%;
}

.el-button {
  margin: 5px 0 0 0;
}

</style>
