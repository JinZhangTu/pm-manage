<template>
  <el-menu :default-active="path" class="el-menu-vertical-demo pt" router>
    <!-- @open="handleOpen"
    @close="handleClose"-->
    <el-menu-item index="/real-estate">
      <i class="el-icon-menu"></i>
      <span slot="title">房产</span>
    </el-menu-item>
    <el-menu-item index="/user-list">
      <i class="el-icon-menu"></i>
      <span slot="title">用户</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      path: "/user-list"
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
};
</script>

<style>
.el-menu {
  height: calc(100% - 60px);
}
.pt {
  padding-top: 60px;
}
</style>



