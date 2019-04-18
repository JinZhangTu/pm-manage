<template>
  <div id="user-register" class="panel-bg">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      :label-position="labelPosition"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-col :span="13">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-col :span="13">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-col :span="13">
          <el-input type="password" v-model="ruleForm.repassword" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <div>
        <el-button @click="register('ruleForm')" type="primary" class="btn-w90">确定</el-button>
        <el-button @click="goBack()" type="info" class="btn-w90">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "UserRegister",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.repassword !== "") {
          this.$refs.ruleForm.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        var vm = this;
        var params = {
          userName: vm.ruleForm.userName
        };
        vm.axios
          .get("/api/userExist", { params: params })
          .then(function(response) {
            var data = response.data;
            if (data.code == 401) {
              return callback(new Error("该用户名已存在"));
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      setTimeout(() => {
        callback();
      }, 500);
    };
    return {
      labelPosition: "left",
      ruleForm: {
        username: "",
        password: "",
        repassword: ""
      },
      rules: {
        userName: [{ validator: checkUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    register: function(formName) {
      var vm = this;
      var params = vm.ruleForm;
      params.created_by = vm.$store.state.name;
      vm.$refs[formName].validate(function(valid) {
        if (valid) {
          vm.axios
            .post("/api/userRegister", params)
            .then(function(response) {
              var data = response.data;
              if (data.code == 200) {
                vm.$message({
                  message: data.message,
                  type: "success"
                });
                vm.goBack();
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
        } else {
          vm.$message({
            message: "请检查表单信息",
            type: "warning"
          });
          return false;
        }
      });
    },
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>

