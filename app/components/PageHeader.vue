<template>
<div class="header">
  <SvgoIcon name="logo" class="header__logo"></SvgoIcon>
  <DButton class="header__btn">Создать историю</DButton>
</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 36px;

  @media (min-width: @bp-m-max) {
    padding: 8px 16px;
  }
}
</style>