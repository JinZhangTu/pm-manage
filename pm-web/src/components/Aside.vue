<template>
  <el-menu :default-active="path" class="el-menu-vertical-demo pt" router>
    <el-menu-item index="/real-estate">
      <i class="el-icon-menu"></i>
      <span slot="title">房产</span>
    </el-menu-item>
    <el-menu-item index="/user-list" v-if="hasAuthority">
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
  computed: {
    hasAuthority() {
      return this.$store.state.admin;
    }
  },
  methods: {}
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



