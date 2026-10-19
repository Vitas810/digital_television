<template>
  <NuxtLink
    class="card"
    :to="`materials/${id}`"
  >
    <div
      class="card__top"
      v-if="date"
    >
      <SvgoIcon
        name="calendar"
        class="icon"
      ></SvgoIcon>
      {{ formatDate(date) }}
    </div>
    <h2
      class="card__title"
      v-if="title"
    >
      {{ title }}
    </h2>
    <p
      class="card__description"
      v-if="description"
    >
      {{ description }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate.ts'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    date?: string
    id?: string | number
  }>(),
  {},
)

const { date, title, description } = toRefs(props)
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';

.card {
  display: flex;
  flex-direction: column;
  gap: var(--font-size-s);
  padding: var(--font-size-2xl);
  background-color: var(--color-white);
  width: 100%;
  border-radius: var(--radius-3xl);
  font-family: var(--font-futura), sans-serif;
  box-sizing: border-box;
  text-decoration: none;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      box-shadow: var(--shadow-card-hover);
    }
  }

  @media (min-width: @bp-m) {
    max-width: 276px;
    gap: var(--space-l);
    padding: var(--space-2xl) var(--space-xl);
  }

  & .card__top {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-family: var(--font-futura), sans-serif;
    font-size: var(--font-size-xs);
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0;
    color: var(--color-gray-300);

    & .icon {
      width: 16px;
      height: 16px;
      color: var(--color-gray-300);
    }

    @media (min-width: @bp-m) {
      font-size: var(--font-size-s);

      & .icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  & .card__title {
    font-family: var(--font-source-sans), sans-serif;
    font-weight: 600;
    font-size: var(--font-size-m);
    line-height: 120%;
    color: var(--color-black);
    margin: 0;

    @media (min-width: @bp-m) {
      font-size: var(--font-size-l);
    }
  }

  & .card__description {
    font-family: var(--font-futura), sans-serif;
    font-size: var(--font-size-xs);
    line-height: var(--font-size-m);
    color: var(--color-gray-500);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin: 0;

    @media (min-width: @bp-m) {
      font-size: var(--font-size-s);
      line-height: 120%;
    }
  }
}
</style>
