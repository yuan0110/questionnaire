<template>
    <el-container>
      <!-- 子导航栏 -->
    <el-header>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item @click="con(myindex)">编辑</el-menu-item>
        <el-menu-item :index="publishPath">投放</el-menu-item>
        <el-menu-item :index="statPath">统计</el-menu-item>
     </el-menu>
    <el-button @click='preview(myindex)'>预览</el-button>
    <el-button @click='del(myindex)'>开始回收</el-button>
    </el-header>
    <router-view></router-view>
    </el-container>

</template>

<script>
export default {
  data () {
    return {
      editPath: '',
      publishPath: '',
      statPath: '',
      myindex: 0
    }
  },
  created () {
    this.myindex = this.$route.params.id
    this.editPath = '/edit/' + this.myindex
    this.publishPath = '/publish/' + this.myindex
    this.statPath = '/stat/' + this.myindex
  },
  methods: {
    async con (index) {
      this.$http.post('getQuestionnaireStatus', { userName: this.$store.state.userName, index: index }).then(
        response => {
          const status = response.data.data
          if (status === '已发布') {
            this.$confirm('对问卷进行编辑将使问卷状态变为未发布，需要重新发布, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post('setQuestionnaireStatus', { userName: this.$store.state.userName, index: index }).then(
                response => {
                  console.log('重置状态成功')
                }
              ).catch(e => { console.log(e) })
              this.$message({
                type: 'success',
                message: '问卷已变为未发布!'
              })
              this.$router.push({ path: '/edit/' + this.myindex })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消编辑'
              })
            })
          }
        }
      ).catch(e => { console.log(e) })
    },
    // 预览
    preview (index) {
      this.$router.push({ path: '/myform/' + this.$store.state.userName + '/' + this.myindex })
    },
    del (index) {
      this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('deleteQuestionaire', { userName: this.$store.state.userName, index: index }).then(
          response => {
            console.log('删除问卷成功')
          }
        ).catch(e => { console.log(e) })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$router.push({
          path: '/home'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
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
