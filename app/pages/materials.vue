<template>
  <section class="materials">
    <div
      v-if="pending"
      class="_spinner"
    ></div>
    <div v-else-if="error">Не удалось загрузить материалы: {{ error.message }}</div>

    <template v-else-if="materials?.length">
      <h1 class="materials__title">Материалы</h1>

      <div class="materials__list">
        <Card
          v-for="material in materials"
          :key="material.id"
          :title="material.title"
          :description="material.short_description"
          :date="material.datetime"
        />
      </div>
    </template>

    <div v-else>Материалов пока нет.</div>
  </section>
</template>

<script setup lang="ts">
import { getMaterials } from '~/api/materials'

const {
  data: materials,
  pending,
  error,
} = await useAsyncData('materials', (_nuxtApp, { signal }) => getMaterials(signal))
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';

.materials {
  .materials__title {
    font-size: var(--size-24);
    line-height: 120%;
    font-family: var(--font-source-sans);
    font-weight: 600;
    padding: var(--size-32) 0;
    margin: 0;

    @media (min-width: @bp-m-max) {
      font-size: var(--size-36);
      padding: var(--size-48) 0;
    }
  }

  & .materials__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
    gap: var(--size-16);

    @media (min-width: @bp-m-max) {
      gap: var(--size-40);
    }
  }
}
</style>
