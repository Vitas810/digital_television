<template>
<div class="footer">
  <SvgoIcon name="logo" class="footer__logo"></SvgoIcon>
  <div class="footer__copyright">© {{ currentYear }} «Моя планета»</div>
</div>
</template>

<script setup lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';
@import (reference) '@styles/colors.less';

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: auto;
  padding: 12px 16px;
  background: @black;

  @media (min-width: @bp-m-max) {
    padding: 8px 16px;
  }

  & .footer__copyright {
    color: @lightGray;
    font-size: 14px;
    line-height: 1.4;
  }
}
</style>
