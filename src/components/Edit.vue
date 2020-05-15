<template>
    <el-container>
            <!-- 侧边栏 -->
    <el-aside width="200px">
      <!-- 侧边栏菜单区 -->
      <el-menu default-active="2" active-text-color="#409EFF">
        <!-- 一级菜单 -->
        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
          <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>
          <!-- 二级菜单 -->
          <el-menu-item index="subItem.id" v-for="subItem in item.children"
          :key="subItem.id">
            <!-- 图标 -->
            <i class="el-icon-location"></i>
            <!-- 文本 -->
            <span>{{subItem.authName}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="1">处理中心</el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 右侧内容主题 -->
    <el-main>
        <div v-for="form in forms" :key="form.id">

            {{form.title}}
        </div>

main
    </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      forms: [
        { id: 1, type: '1', title: 't1', text: 't1' },
        { id: 2, type: '2', title: 't2', text: 't2' },
        { id: 3, type: '1', title: 't1', text: 't1' },
        { id: 4, type: '2', title: 't2', text: 't2' }
      ]
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {

    // 获取所有菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return 1
      this.menulist = res.data
      console.log(res)
    }
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
