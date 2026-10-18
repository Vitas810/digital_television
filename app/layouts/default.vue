<template>
  <div class="layout-wrapper">
    <PageHeader class="content-wrapper" />

    <main class="page-content">
      <div class="content-wrapper">
        <slot />
      </div>
    </main>

    <PageFooter class="footer" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';

.layout-wrapper {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  & .page-content {
    background-color: @grayBackground;
    flex: 1;
  }
}
</style>
