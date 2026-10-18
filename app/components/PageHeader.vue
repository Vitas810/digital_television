<template>
  <header class="header">
    <NuxtLink to="/">
      <SvgoIcon
        name="logo"
        class="header__logo"
      ></SvgoIcon>
    </NuxtLink>

    <DButton
      class="header__btn"
      size="medium"
      aria-label="Создать историю"
    >
      <span class="header__btn-label">Создать историю</span>
      <SvgoIcon
        name="add"
        class="header__btn-icon"
        aria-hidden="true"
      />
    </DButton>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-8) var(--size-16);

  @media (min-width: @bp-m-max) {
    padding: var(--size-20) var(--size-36);
  }

  :deep(.header__btn-icon) {
    display: none;
  }

  @media (max-width: @bp-xs-max) {
    .header__btn-label {
      display: none;
    }

    :deep(.header__btn-icon) {
      display: block;
    }
  }
}
</style>
