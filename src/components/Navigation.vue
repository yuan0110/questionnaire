<template>
    <el-container>
      <!-- 子导航栏 -->
    <el-header>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item :index="editPath">编辑</el-menu-item>
        <el-menu-item :index="publishPath">投放</el-menu-item>
        <el-menu-item index="">统计</el-menu-item>
     </el-menu>
    <el-button @click='preview(myindex)'>预览</el-button>
    <el-button >开始回收</el-button>
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
      myindex: 0
    }
  },
  created () {
    this.myindex = this.$route.params.id
    this.editPath = '/edit/' + this.myindex
    this.publishPath = '/publish/' + this.myindex
  },
  methods: {
    // 预览
    preview (index) {
      this.$router.push({ path: '/myform/' + this.$store.state.userName + '/' + this.myindex })
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
