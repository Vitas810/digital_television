<template>
  <NuxtLayout>
    <section class="not-found content-wrapper__compact">
      <div class="not-found__code">404</div>
      <p class="not-found__text">Страница не найдена</p>

      <DButton
        size="medium"
        class="not-found__button"
        @click="goHome"
      >
        На главную
      </DButton>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const goHome = () => clearError({ redirect: '/' })
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--size-16);
  min-height: calc(90vh - 88px);
  padding-top: var(--size-16);
  color: @black;
  text-align: center;

  .not-found__code {
    font-family: var(--font-source-sans), sans-serif;
    font-size: 96px;
    line-height: 100%;
    font-weight: 600;
    color: @lightGray;

    @media (min-width: @bp-m) {
      font-size: 160px;
    }
  }

  .not-found__text {
    margin: 0 0 var(--size-16);
    font-family: var(--font-futura), sans-serif;
    font-size: var(--size-20);
    line-height: 120%;

    @media (min-width: @bp-m) {
      font-size: var(--size-24);
    }
  }

  .not-found__button {
    padding: 0 var(--size-24);
  }
}
</style>
