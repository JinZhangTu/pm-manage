<template>
  <div id="login">
    <div class="login-container">
      <div class="login-left">
        <div class="login-header">
          <span class="mr-10">
            <font-awesome-icon class="color-main" :icon="['fas', 'home']" size="lg"/>
          </span>
          <span>智慧小区物业管理系统</span>
        </div>
        <div class="login-from">
          <el-form label-width="80px" :label-position="labelPosition" :model="user">
            <el-form-item>
              <el-input v-model="user.userName" placeholder="用户名">
                <template slot="prepend">
                  <font-awesome-icon :icon="['fas', 'user']"/>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="user.password" placeholder="密码" show-password>
                <template slot="prepend">
                  <font-awesome-icon :icon="['fas', 'unlock-alt']"/>
                </template>
              </el-input>
            </el-form-item>
            <div class="login-action relation">
              <el-button @click="onSubmit" type="primary" size="medium" class="btn-w90">登录</el-button>
              <el-button type="text" class="text-btn" @click="change">注册</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <div class="login-rigit">456</div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      labelPosition: "top",
      user: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    onSubmit() {
      let vm = this;
      vm.axios
        .post("/api/checkLogin", this.user)
        .then(function(response) {
          var data = response.data;
          if (data.code == 200) {
            vm.changeLogin({
              Authorization: data.token,
              name: data.content.name,
              admin: data.content.admin
            });
            vm.$router.push("/main");
          } else {
            vm.$message({
              message: data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    change() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
#login {
  width: 100%;
  height: 100%;
}
.login-container {
  position: relative;
  left: 25vw;
  width: 50%;
  height: 56%;
  top: 22vh;
  display: inline-flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-left {
  width: 50%;
  padding: 2rem 6rem;
}
.login-right {
  height: 100%;
  width: 50%;
}
.login-header {
  text-align: center;
  margin: 1.7rem 0 2.6rem 0;
}
.login-header span{
  font-size: 23px;
}
.login-action {
  margin-top: 2rem;
  text-align: center;
}
.text-btn {
  position: absolute;
  bottom: 0;
  right: 5px;
  top: 4px;
  padding: 0;
}
</style>


