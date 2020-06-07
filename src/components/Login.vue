<template>
    <div class="login_container" v-loading="loading" element-loading-text="登录中......">
       <div class="login_box">
           <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <span >问卷管理系统</span>
            <!-- 登陆表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form" >
                <!-- 用户名 -->
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" prefix-icon="iconfont icon-3702mima" type="passWord"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        userName: '',
        passWord: ''
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        userName: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        passWord: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
    this.loginForm.userName = this.$store.state.userName
    this.loginForm.passWord = this.$store.state.passWord
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮
    login () {
      this.loading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('login', this.loginForm)
        if (res.status !== 200) {
          this.resetLoginForm()
          return this.$message.error('登陆请求失败失败,请重新输入账号')
        }
        if (res.data.token === '') {
          return this.$message.error('密码错误,请重新输入密码')
        }
        this.$message.success({ message: '登陆成功', duration: 1000 })
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到后台主页
        this.$store.state.userName = this.loginForm.userName
        this.$store.state.passWord = this.loginForm.passWord
        this.loading = false
        this.$router.push({
          path: 'home'
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
span{
  font-size:100%;
  text-align: center;
  position: absolute;
  top: 28%;
  width:100%;
}
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
