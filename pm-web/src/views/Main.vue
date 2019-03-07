<template>
  <div class="main">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: "main",
  components: {
    // HelloWorld
    Aside,
    Header
  }
};
</script>


<style>
.el-container {
  height: 100%;
}

.el-header {
  /* background-color: #b3c0d1; */
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  height: 100%;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  /* line-height: 500px; */
  /* padding: 20px; */
}
</style>
