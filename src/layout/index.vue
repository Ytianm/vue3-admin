<template>
  <el-container>
    <el-header>工时管理系统</el-header>
    <el-container>
      <el-aside width="200px">
        <Menus />
      </el-aside>
      <el-main>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menus from './Menus/index.vue'
export default {
  components: { Menus }

}
</script>

<style scoped>
.el-container{
  background: #e9eef3;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #fff;
  line-height: 60px;
}

.el-header{
  font-size: 20px;
}

.el-aside {
  height: calc(100vh - 60px);
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}

.el-main {
  background-color: #fff;
  color: #333;
  margin: 15px;
}
</style>