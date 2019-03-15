<template>
  <div id="header">
    <span class="pull-right">
      <!-- <i class="icon-user-circle"></i> -->
      <!-- <font-awesome-icon :icon="['far','user']" size="lg"></font-awesome-icon> -->
      <span>{{currentName}}</span>&nbsp;&nbsp;&nbsp;
      <small>
        <a style="cursor: pointer" @click="logout()">注销</a>
      </small>
    </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    currentName() {
      return this.$store.state.name;
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
</style>