<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>问卷平台</span>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/create">创建问卷</el-menu-item>
        <el-menu-item index="/edit">我的问卷</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank"></a></el-menu-item>
     </el-menu>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 路由占位符 -->
      <router-view></router-view>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }

  }
}

</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header {
    border: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 20px;
    > div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }

}

</style>
