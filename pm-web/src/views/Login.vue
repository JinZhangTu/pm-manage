<template>
  <div id="login">
    <div class="login-container">
      <div class="login-left">
        <div class="login-header">
          <span>
            <font-awesome-icon :icon="['fas', 'home']" size="lg"/>
          </span>
          <span>智慧小区物业管理系统</span>
        </div>
        <div class="login-from">
          <el-form :label-position="labelPosition" label-width="80px" :model="user">
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
              <el-button @click="onSubmit" size="medium" plain>登录</el-button>
              <el-button type="text" class="text-btn">注册</el-button>
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
  name: "login",
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
            vm.$message(data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
  top: 25vh;
  width: 50%;
  height: 50%;
  display: inline-flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-left {
  height: 100%;
  width: 50%;
  padding: 2rem 6rem;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
.login-right {
  height: 100%;
  width: 50%;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
.login-header {
  text-align: center;
  margin: 0 0 3.5rem 0;
}
.login-action {
  margin-top: 2rem;
  text-align: center;
}
.text-btn {
  position: absolute;
  bottom: 0;
  right: 5px;
  padding: 0;
}
</style>


