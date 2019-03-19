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
      <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-share" :command="{type:'detail',id:scope.row.id}">详情</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" :command="{type:'edit',id:scope.row.id}">修改</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" :command="{type:'delete',row:scope.row}">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :pager-count="7"
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
      totalCount: 10
    };
  },
  created() {
    this.search();
  },
  watch: {
    pageSize: function() {
      this.search();
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    handleCommand(command) {
      if (command.type == "detail" || command.type == "edit") {
        this.$router.push({
          name: "user-edit",
          params: { type: command.type, id: command.id }
        });
      } else if (command.type == "delete") {
        var vm = this;
        var params = command.row;
        console.log(command.row.status);
        vm.axios
          .delete("/api/userDelete", { data: params })
          .then(function(response) {
            var data = response.data;
            if (data.code == 200) {
              vm.search();
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
      // this.$message("click on item " + command.type);
    },
    search: function() {
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
            vm.$message({
              message: data.message,
              type: "success"
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