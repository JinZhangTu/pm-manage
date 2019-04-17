<template>
  <div id="real-estate-edit" class="panel-bg" v-if="data!=null">
    <el-form :label-position="labelPosition" label-width="140px">
      <el-form-item label="楼号">
        <el-col :span="13">
          <el-input v-if="type=='edit'" v-model="data.lh"></el-input>
          <div v-if="type=='detail'" class="pull-left">{{data.lh}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="单元">
        <el-col :span="13">
          <el-select v-model="data.dy" placeholder="请选择" v-if="type=='edit'" style="width:100%;">
            <el-option v-for="(item,index) in dyArr" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <div v-if="type=='detail'" class="pull-left">{{data.dy}}</div>
      </el-form-item>
      <el-form-item label="门号">
        <el-col :span="13">
          <el-input v-if="type=='edit'" v-model="data.mh"></el-input>
          <div v-if="type=='detail'" class="pull-left">{{data.mh}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="结构">
        <el-col :span="13">
          <el-select v-model="data.jg" placeholder="请选择" v-if="type=='edit'" style="width:100%;">
            <el-option v-for="(item,index) in jgArr" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <div v-if="type=='detail'" class="pull-left">{{data.jg}}</div>
      </el-form-item>
      <el-form-item label="面级">
        <el-col :span="13">
          <el-input v-if="type=='edit'" v-model="data.mj"></el-input>
          <div v-if="type=='detail'" class="pull-left">{{data.mj}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="是否售出">
        <el-col :span="13">
          <el-switch v-model="data.sc" class="pull-left"></el-switch>
        </el-col>
      </el-form-item>
      <div>
        <el-button v-if="type=='edit'" @click="editRealEstate()" type="primary" class="btn-w90">确定</el-button>
        <el-button @click="goBack()" type="info" class="btn-w90">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RealEstateEdit",
  data() {
    return {
      labelPosition: "left",
      data: null,
      type: this.$route.params.type,
      jgArr: ["一室一厅", "两室一厅", "三室一厅"],
      dyArr: ["A", "B"]
    };
  },
  beforeCreate() {
    var vm = this;
    var params = {
      id: vm.$route.params.id
    };
    vm.axios
      .get("/api/fcDetail", { params: params })
      .then(function(response) {
        var data = response.data;
        if (data.code == 200) {
          vm.data = data.content[0];
          vm.data.sc = vm.data.sc == 1 ? true : false;
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
    goBack: function() {
      this.$router.go(-1);
    },
    editRealEstate: function() {
      var vm = this;
      var params = _.cloneDeep(vm.data);
      params.last_modified_by = vm.$store.state.name;
      params.sc = vm.data.sc ? 1 : 0;
      vm.axios
        .post("/api/fcEdit", params)
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
    }
  }
};
</script>

<style>
</style>
