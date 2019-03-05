<template>
  <div class="login">
    <div class="login-container">
      <div class="login-left">
        <div class="login-header">
          <!-- <font-awesome-icon :icon="['fas', 'square']"/>
          <font-awesome-icon :icon="['far', 'square']"/> -->
          <font-awesome-icon :icon="['fab', 'accessible-icon']"/>
          <span>
            <i class="fa fa-camera-retro fa-lg"></i>
          </span>
          <!-- <h1>智慧小区物业管理系统</h1> -->
        </div>
        <div class="login-from">
          <el-form :label-position="labelPosition" label-width="80px" :model="user">
            <el-form-item label="用户名">
              <el-input v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-rigit">456</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      labelPosition: "left",
      user: {
        userName: "",
        password: ""
      }
    };
  }
};
</script>

<style>
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 50vw;
  height: 50vh;
  display: inline-flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-left {
  height: 100%;
  width: 70%;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
.login-right {
  height: 100%;
  width: 30%;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
</style>


