<template>
  <el-menu default-active="1">
    <div v-for="(menu, mIndex) in menuList" :key="menu.path">
      <el-submenu
        :index="mIndex + 1 + ''"
        v-if="menu.children && menu.children.length > 0"
      >
        <template #title>
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="(sub, sIndex) in menu.children"
          :index="mIndex + 1 + '-' + (sIndex + 1) + ''"
          :key="sub.path"
          @click="handleSelect(sub)"
        >
          <span style="padding-left: 40px">{{ sub.name }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="mIndex + 1 + ''" @click="handleSelect(menu)">
        <i :class="menu.icon"></i>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  setup () {
    const router = useRouter()
    const menuList = reactive([
      {
        name: '用户信息',
        path: 'home',
        icon: 'el-icon-user'
      },
      {
        name: '工时管理',
        path: 'work-hours',
        icon: 'el-icon-s-data'
      },
      {
        name: '账务管理',
        path: '',
        icon: 'el-icon-s-finance'
      }
    ])

    // 菜单选中
    const handleSelect = (m) => {
      if (!m.path) {
        ElMessage({
          message: '暂未开通',
          center: true
        })
      }
      router.push(m.path)
    }

    return {
      menuList,
      handleSelect
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>