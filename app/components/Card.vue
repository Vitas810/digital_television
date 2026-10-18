<template>
<div class="card">
  <div class="card__top" v-if="date">
    <SvgoIcon name="calendar" class="icon"></SvgoIcon>
    {{ formatDate(date) }}
  </div>
  <h2 class="card__title" v-if="title">{{ title }}</h2>
  <p class="card__description" v-if="description">{{ description }}</p>
</div>
</template>

<script setup lang="ts">
import {formatDate} from "~/utils/formatDate.ts";

const props = withDefaults(
    defineProps<{
      title?: string
      description?: string
      date?: string
    }>(),
    {},
)

const { date, title, description } = toRefs(props)
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

  .card {
    display: flex;
    flex-direction: column;
    gap: var(--size-16);
    padding: var(--size-24);
    background-color: @white;
    width: 100%;
    border-radius: var(--size-24);
    font-family: var(--font-futura);
    box-sizing: border-box;

    @media (hover: hover) {
      &:hover {
        cursor: pointer;
        box-shadow:
            -2px 5px 13px 0 #0000000A,
            -9px 21px 23px 0 #0000000A,
            -21px 48px 31px 0 #00000005,
            -37px 85px 37px 0 #00000003,
            -57px 133px 40px 0 #00000000;
      }
    }

    @media (min-width: @bp-m-max) {
      max-width: 276px;
      gap: var(--size-20);
    }

    & .card__top {
      display: flex;
      align-items: center;
      gap: var(--size-8);
      font-size: var(--size-14);
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
        font-size: var(--size-16);

        & .icon {
          width: 20px;
          height: 20px;
        }
      }
    }

    & .card__title {
      font-family: var(--font-source-sans);
      font-weight: 600;
      font-size: var(--size-18);
      line-height: 120%;
      color: @black;
      margin: 0;

      @media (min-width: @bp-m-max) {
        font-size: var(--size-20);
      }
    }

    & .card__description {
      font-family: var(--font-futura);
      font-size: var(--size-14);
      line-height: 100%;
      color: @gray;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      margin: 0;

      @media (min-width: @bp-m-max) {
        font-size: var(--size-16);
        line-height: 120%;
      }
    }
  }
</style>
