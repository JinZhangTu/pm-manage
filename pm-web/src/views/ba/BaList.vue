<template>
  <div id="ba-list" class="full-screen">
    <el-row class="mb-20">
      <el-col :span="15">
        <el-input placeholder="请输入内容" v-model="keyword"></el-input>
      </el-col>
      <el-col :span="9">
        <div class="pull-right">
          <el-button type="primary" size="medium" class="btn-w90">搜索</el-button>
          <el-button type="success" size="medium" @click="addBa()" class="btn-w90">新建</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="mb-20">
      <el-col :span="2">
        <span style="font-size:14px;line-height:32px">每页显示：</span>
      </el-col>
      <el-col :span="2">
        <el-select v-model="pageSize" size="small" placeholder="请选择">
          <el-option v-for="item in pageSizes" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe class="mb-20">
      <el-table-column prop="yg_id" label="工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="入职时间">
        <template
          slot-scope="scope"
          v-if="scope.row.date!=undefined"
        >{{scope.row.date | dateFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="created_by" label="创建人"></el-table-column>
      <el-table-column label="创建时间">
        <template
          slot-scope="scope"
          v-if="scope.row.created_date!=undefined"
        >{{scope.row.created_date | dateFormat('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{type:'detail',id:scope.row.id}">
                <i class="icomoon icon-arrow-circle-right"></i>详情
              </el-dropdown-item>
              <el-dropdown-item :command="{type:'edit',id:scope.row.id}">
                <i class="icomoon icon-pencil"></i>修改
              </el-dropdown-item>
              <el-dropdown-item :command="{type:'delete',id:scope.row.id}">
                <i class="icomoon icon-delete"></i>删除
              </el-dropdown-item>
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
  name: "BaList",
  data() {
    return {
      keyword: "",
      tableData: null,
      pageSizes: [10, 15, 20, 25],
      pageSize: 10,
      currentPage: 1,
      totalCount: 10
    };
  },
  mounted() {
    this.search();
  },
  watch: {
    pageSize: function() {
      if (this.keyword == "") this.search();
      else this.searchStr();
    }
  },
  methods: {
    search() {
      var vm = this;
      var params = {
        page: vm.currentPage,
        pageSize: vm.pageSize,
        type: "ba"
      };
      vm.axios
        .get("/api/ygList", { params: params })
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
    },
    addBa() {
      this.$router.push({
        name: "ba-edit",
        params: { type: "add", id: 5 }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleCommand(command) {
      if (command.type == "detail" || command.type == "edit") {
        this.$router.push({
          name: "ba-edit",
          params: { type: command.type, id: command.id }
        });
      } else if (command.type == "delete") {
        var vm = this;
        var params = command.row;
        vm.axios
          .delete("/api/ygDelete", { data: params })
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
    }
  }
};
</script>
<style>
</style>