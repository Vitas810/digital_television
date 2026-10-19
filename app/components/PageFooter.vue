<template>
  <footer class="footer">
    <div class="footer__wrapper content-wrapper">
      <SvgoIcon
        name="logo"
        class="footer__logo"
      ></SvgoIcon>
      <div class="footer__copyright">© {{ currentYear }} «Моя планета»</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';

.footer {
  flex-shrink: 0;
  margin-top: auto;
  background: var(--color-black);

  & .footer__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-m) var(--space-2xl);

    @media (min-width: @bp-m) {
      padding: var(--space-xs) var(--space-m);
    }
  }

  & .footer__copyright {
    color: var(--color-gray-300);
    font-size: var(--font-size-xs);
    line-height: 1.4;
  }
}
</style>
