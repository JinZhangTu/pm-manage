<template>
  <div id="user-edit" class="panel-bg" v-if="data!=null">
    <el-form :label-position="labelPosition" label-width="140px">
      <el-form-item label="用户名">
        <el-col :span="13">
          <el-input v-if="type=='edit'" v-model="data.userName"></el-input>
          <div v-if="type=='detail'" class="pull-left">{{data.userName}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-col :span="13">
          <el-select v-model="data.type" placeholder="请选择" v-if="type=='edit'" style="width:100%;">
            <el-option
              v-for="item in typeList"
              :key="item.key"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <div v-if="type=='detail'" class="pull-left">{{data.type}}</div>
      </el-form-item>
      <el-form-item label="是否激活">
        <el-col :span="13">
          <el-switch v-model="data.status" class="pull-left"></el-switch>
        </el-col>
      </el-form-item>
      <div>
        <el-button v-if="type=='edit'" @click="editUser()" type="primary" class="btn-w90">确定</el-button>
        <el-button @click="goBack()" type="info" class="btn-w90">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>

export default {
  name: "UserEdit",
  data() {
    return {
      labelPosition: "left",
      data: null,
      type: this.$route.params.type,
      typeList: [{ key: 0, value: "admin" }, { key: 1, value: "user" }]
    };
  },
  beforeCreate() {
    var vm = this;
    var params = {
      id: vm.$route.params.id
    };
    vm.axios
      .get("/api/userDetail", { params: params })
      .then(function(response) {
        var data = response.data;
        if (data.code == 200) {
          vm.data = data.content[0];
          vm.data.status = vm.data.status == 1 ? true : false;
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
  methods: {
    editUser: function() {
      var vm = this;
      var params = _.cloneDeep(vm.data);
      params.last_modified_by = vm.$store.state.name;
      params.status = vm.data.status ? 1 : 0;
      vm.axios
        .post("/api/userEdit", params)
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
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
