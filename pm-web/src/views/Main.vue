<template>
  <div id="main" class="full-screen">
    <el-container>
      <el-aside width="160px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header height="60px">
          <Header></Header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
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
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 80px;
  padding: 0 35px !important;
  box-shadow: 0 20px 0 0 rgba(0, 0, 0, 0.3);
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  /* line-height: 500px; */
  /* padding: 20px; */
}
</style>
