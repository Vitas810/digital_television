<template>
<div class="card">
  <div class="card__top">
    <SvgoIcon name="calendar" class="icon"></SvgoIcon>
    21 сентября
  </div>
  <h2 class="card__title">Как у сов получается поворачивать голову на 270 градусов?</h2>
  <p class="card__description">Известно, что совы — превосходные хищники. Причем они одинаково видят как днем, так и ночью. Известно, что совы — превосходные хищники. Причем они одинаково видят как днем, так и ночью. </p>
</div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      title?: string
      description?: string
      date?: string
    }>(),
    {},
)
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

  .card {
    padding: 24px;
    background-color: @white;
    max-width: 276px;
    width: 100%;
    border-radius: 24px;
    font-family: 'Futura PT', sans-serif;
    box-sizing: border-box;

    & .card__top {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 100%;
      letter-spacing: 0;
      color: @lightGray;

      & .icon {
        width: 16px;
        height: 16px;
        color: @lightGray;
      }

      @media (min-width: @bp-m-max) {
        font-size: 16px;

        & .icon {
          width: 20px;
          height: 20px;
        }
      }
    }

    & .card__title {
      font-family: 'Source Sans 3', sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 120%;
      color: @black;
      margin: 16px 0;

      @media (min-width: @bp-m-max) {
        font-size: 20px;
        margin: 20px 0;
      }
    }

    & .card__description {
      font-family: 'Futura PT', sans-serif;
      font-size: 14px;
      line-height: 100%;
      color: @gray;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;

      @media (min-width: @bp-m-max) {
        font-size: 16px;
        line-height: 120%;
      }
    }
  }
</style>
