<template>
    <div style="margin-top: 60px; z-index:100">
        <h3>欢迎使用本问卷平台，若你有什么问题可以在此留言</h3>
  <el-table
      border
      :data="tableData">
      <el-table-column
        prop="user"
        label="用户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="留言">
      </el-table-column>
    </el-table>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="留言内容" prop="name" style="width:50%">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">确认填写</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>

    </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入问题', trigger: 'blur' },
          { min: 1, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$http.post('getMessageBoard').then(
      response => {
        this.tableData = response.data.data
        console.log('请求留言板成功')
      }
    ).catch(e => { console.log(e) })
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('addMessageBoard', { user: this.$store.state.userName, content: this.ruleForm.name }).then(
            response => {
              this.tableData.push({ user: this.$store.state.userName, content: this.ruleForm.name })
              console.log('发布留言成功')
            }
          ).catch(e => { console.log(e) })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
div{
    width:100%;
    display: inline-block;
    text-align: center;//使子项目水平居中
}
.el-form{
    margin-top:5%;
}
.el-table{
    width:70%;
}
</style>
