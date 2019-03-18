<template>
  <div id="user-list" class="full-screen">
    <el-row class="mb-20">
      <el-col :span="15">
        <el-input placeholder="请输入内容" v-model="searchStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="mb-20 full-left">
      <el-col :span="2">
        <span>每页显示：</span>
      </el-col>
      <el-col :span="2">
        <el-select v-model="pageSize" size="small" placeholder="请选择">
          <el-option v-for="item in pageSizes" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%" class="mb-20">
      <el-table-column prop="userName" label="日期" width="180"></el-table-column>
      <el-table-column prop="type" label="姓名" width="180"></el-table-column>
      <el-table-column prop="type" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :pager-count="9"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      searchStr: "",
      tableData: null,
      pageSizes: [10, 15, 20, 25],
      pageSize: 10,
      currentPage: 1,
      totalCount:5
    };
  },
  created() {
    var vm = this;
    var params = {
      page: vm.currentPage,
      pageSize: vm.pageSize
    };
    vm.axios
      .get("/api/usersList", { params: params })
      .then(function(response) {
        var data = response.data;
        if (data.code == 200) {
          vm.totalCount = data.totalCount;
          vm.tableData = data.content;
        } else {
          var y = response.data;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.currentPage);
    }
  }
};
</script>

<style>
</style>