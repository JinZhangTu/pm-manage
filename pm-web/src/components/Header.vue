<template>
  <div id="header" v-if="name!='login'&&name!='register'">
    <font-awesome-icon :icon="breadcumb[name].icon" class="header-icon"></font-awesome-icon>
    <span v-for="(item,index) in breadcumb[name].path " :key="index">
      <span>{{item}}</span>
      <span class="mr-10" v-show="index < breadcumb[name].path.length-1"></span>
    </span>
    <span class="pull-right">
      <span>{{currentName}}</span>&nbsp;&nbsp;&nbsp;
      <small>
        <a style="cursor: pointer" class="color-main" @click="logout()">注销</a>
      </small>
    </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      name: this.$route.name,
      breadcumb: {
        main: { icon: ["fas", "home"], path: ["首页"] },
        "user-list": { icon: ["fas", "user"], path: ["用户", "用户管理"] },
        "user-edit": {
          icon: ["fas", "user"],
          path: ["用户", "用户管理", "用户编辑"]
        },
        "real-estate": {
          icon: ["fas", "building"],
          path: ["房产", "房产管理"]
        },
        "proprietor-list": {
          icon: ["fas", "user"],
          path: ["业主", "业主管理"]
        },
        ps: {
          icon: ["fas", "user"],
          path: ["业主", "业主服务"]
        }
      }
    };
  },
  computed: {
    currentName() {
      return this.$store.state.name;
    }
  },
  watch: {
    $route(to, from) {
      this.name = to.name;
    }
  },
  methods: {
    logout() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.header-icon {
  margin-right: 15px;
  font-size: 20px;
}
</style>