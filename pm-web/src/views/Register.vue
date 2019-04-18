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
            <el-form-item>
              <el-input v-model="user.repassword" placeholder="确认密码" show-password>
                <template slot="prepend">
                  <font-awesome-icon :icon="['fas', 'unlock-alt']"/>
                </template>
              </el-input>
            </el-form-item>
            <div class="login-action-register relation">
              <el-button @click="register" type="primary" size="medium" class="btn-w90">注册</el-button>
              <el-button type="success" size="medium" class="btn-w90" @click="change">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <div class="login-rigit">456</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      labelPosition: "top",
      user: {
        userName: "",
        password: "",
        repassword: ""
      }
    };
  },
  methods: {
    register() {
      var vm = this;
      var params = vm.user;
      if (params.userName == "") {
        this.$notify({
          title: "注意",
          message: "请输入用户名",
          type: "warning"
        });
      } else if (params.userName !== "") {
        var param = {
          userName: params.userName
        };
        vm.axios
          .get("/api/userExist", { params: param })
          .then(function(response) {
            var data = response.data;
            if (data.code == 401) {
              vm.$notify.error({
                title: "错误",
                message: "该用户名已存在"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (params.password == "") {
        this.$notify({
          title: "注意",
          message: "请输入密码",
          type: "warning"
        });
      } else if (params.repassword == "") {
        this.$notify({
          title: "注意",
          message: "请二次确认密码",
          type: "warning"
        });
      } else if (params.password !== params.repassword) {
        this.$notify.error({
          title: "错误",
          message: "二次密码不一致"
        });
      } else {
        vm.axios
          .post("/api/userRegister", params)
          .then(function(response) {
            var data = response.data;
            if (data.code == 200) {
              vm.$message({
                message: data.message,
                type: "success"
              });
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
      }
    },
    change() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.login-action-register {
  margin-top: 1.5rem;
  text-align: center;
}
</style>