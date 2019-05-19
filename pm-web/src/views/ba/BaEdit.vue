<template>
  <div id="ba-edit" class="panel-bg" v-if="data!=null">
    <el-form :label-position="labelPosition" label-width="140px">
      <el-form-item label="工号">
        <el-col :span="13">
          <el-input v-if="type!='detail'" v-model="data.yg_id"></el-input>
          <div v-if="type=='detail'" class="pull-left">{{data.yg_id}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名">
        <el-col :span="13">
          <el-input v-if="type!='detail'" v-model="data.name"></el-input>
          <div v-if="type=='detail'" class="pull-left">{{data.name}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-col :span="13">
          <el-date-picker class="display-b" v-model="data.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-form-item>
      <div>
        <el-button
          v-if="type=='add'"
          @click="addBa()"
          type="primary"
          class="btn-w90"
          size="medium"
        >新增</el-button>
        <el-button
          v-if="type=='edit'"
          @click="editBa()"
          type="primary"
          class="btn-w90"
          size="medium"
        >确定</el-button>
        <el-button @click="goBack()" type="info" class="btn-w90" size="medium">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "BaEdit",
  data() {
    return {
      labelPosition: "left",
      data: null,
      type: this.$route.params.type,
      user: { userName: "", password: "", type: "ba" }
    };
  },
  mounted() {
    if (this.type != "add") {
      this.detailBa();
    } else {
      this.data = {
        yg_id: "",
        name: "",
        date: null
      };
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    detailBa() {
      var vm = this;
      var params = {
        id: vm.$route.params.id
      };
      vm.axios
        .get("/api/ygDetail", { params: params })
        .then(function(response) {
          var data = response.data;
          if (data.code == 200) {
            vm.data = data.content[0];
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
    addBa() {
      var vm = this;
      var params = _.cloneDeep(vm.data);
      params.created_by = vm.$store.state.name;
      params.type = "ba";
      vm.axios
        .post("/api/ygInsert", params)
        .then(function(response) {
          var data = response.data;
          if (data.code == 200) {
            vm.user.userName = params.yg_id;
            vm.user.password = "123456";
            vm.register();
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
    },
    editBa() {
      var vm = this;
      var params = _.cloneDeep(vm.data);
      params.last_modified_by = vm.$store.state.name;
      vm.axios
        .post("/api/ygUpdate", params)
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
    },
    register() {
      var vm = this;
      var params = vm.user;
      params.created_by = vm.$store.state.name;
      vm.axios
        .get("/api/userExist", { params: params })
        .then(function(response) {
          var data = response.data;
          if (data.code == 401) {
            vm.$notify.error({
              title: "错误",
              message: "该用户名已存在"
            });
          } else if (data.code == 200) {
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
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
</style>
