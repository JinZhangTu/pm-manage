<template>
  <el-menu
    :default-active="path"
    class="el-menu-vertical-demo pt"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/real-estate">
      <i>
        <font-awesome-icon :icon="['fas','building']" class="font-icon"></font-awesome-icon>
      </i>
      <span slot="title">房产</span>
    </el-menu-item>
    <el-submenu index>
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>业主</span>
      </template>
      <el-menu-item index="/proprietor-list">业主信息</el-menu-item>
      <el-menu-item index="/ps">业主服务</el-menu-item>
    </el-submenu>
    <el-menu-item index="/user-list" v-if="hasAuthority">
      <i class="icomoon-aside icon-user-setting">
        <!-- <font-awesome-icon :icon="['fas','user']" class="font-icon"></font-awesome-icon> -->
      </i>
      <span slot="title">用户</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      path: this.$route.path
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
.el-submenu .el-menu-item {
  min-width: 0 !important;
}

.icomoon-aside {
  vertical-align: middle !important;
  margin-right: 5px;
  width: 24px;
  line-height: 18px;
  text-align: center;
  font-size: 18px;
  margin-top: -2px;
}
</style>



