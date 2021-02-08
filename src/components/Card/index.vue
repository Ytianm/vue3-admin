<template>
  <el-card class="box-card">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <el-button @click="$emit('onOperate')">{{ operateText }}</el-button>
      </div>
    </template>
    <slot name="content" />
  </el-card>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    operateText: {
      type: String,
      default: 'add'
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>