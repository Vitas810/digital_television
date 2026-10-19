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
@import (reference) '@styles/colors.less';

.footer {
  flex-shrink: 0;
  margin-top: auto;
  background: @black;

  & .footer__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--size-16) var(--size-36);

    @media (min-width: @bp-m) {
      padding: var(--size-8) var(--size-16);
    }
  }

  & .footer__copyright {
    color: @lightGray;
    font-size: var(--size-14);
    line-height: 1.4;
  }
}
</style>
