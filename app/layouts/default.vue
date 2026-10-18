<template>
  <div class="layout-wrapper">
    <div class="content-wrapper">
      <PageHeader />
      <slot />
    </div>

    <PageFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.layout-wrapper {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
</style>
