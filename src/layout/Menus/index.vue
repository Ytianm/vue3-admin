<template>
  <el-menu
    default-active="1"
  >
    <div v-for="(menu, mIndex) in menuList" :key="menu.path">
      <el-submenu
        :index="mIndex + 1 + ''"
        v-if="menu.children && menu.children.length > 0"
      >
        <template #title>
          <i class="el-icon-location"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="(sub, sIndex) in menu.children"
          :index="(mIndex + 1) + '-' + (sIndex + 1) + ''"
          :key="sub.path"
          @click="handleSelect(sub)"
        >
          <span style="padding-left:40px">{{ sub.name }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="mIndex + 1 + ''"  @click="handleSelect(menu)">
        <i :class="menu.icon"></i>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
export default {
  setup () {
    const router = useRouter()
    const menuList = reactive([
      {
        name: '导航1',
        path: 'home',
        icon: 'el-icon-menu'
      },
      {
        name: '导航2',
        path: 'document',
        icon: 'el-icon-document',
        children: [
          {
            name: '导航2-1',
            path: 'document',
            icon: 'el-icon-menu'
          },
        ]
      }
    ])

    // 菜单选中
    const handleSelect = (m) => { 
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