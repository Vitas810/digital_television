<template>
  <section class="materials">
    <div
      v-if="pending"
      class="loading-wrapper"
    >
      <div class="_spinner"></div>
    </div>

    <div v-else-if="error">Не удалось загрузить материалы: {{ error.message }}</div>

    <template v-else-if="materials?.length">
      <h1 class="materials__title">Материалы</h1>

      <div class="materials__list">
        <Card
          v-for="material in materials"
          :id="material.id"
          :key="material.id"
          :title="material.title"
          :description="material.short_description"
          :date="material.datetime"
        />
      </div>
    </template>

    <div
      v-else
      class="materials__empty"
    >
      Материалов пока нет.
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMaterials } from '~/composables/useMaterials.ts'

const { data: materials, pending, error } = await useMaterials()
</script>

<style lang="less">
@import (reference) '@styles/breakpoints.less';
@import (reference) '@styles/colors.less';
@import (reference) '@styles/fonts.less';

.materials {
  .materials__title {
    .font-title-36-strong();
    font-weight: 600;
    padding: var(--size-32) 0;
    margin: 0;

    @media (min-width: @bp-m-max) {
      padding: var(--size-48) 0;
    }
  }

  & .materials__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
    grid-auto-rows: 236px;
    gap: var(--size-16);
    margin-bottom: var(--size-32);

    @media (min-width: @bp-s) {
      grid-template-columns: repeat(auto-fill, 276px);
      grid-auto-rows: 273px;
      gap: var(--size-40);
      justify-content: center;
    }
  }

  & .materials__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(90vh - 88px);
    padding-top: var(--size-16);
    color: @black;
  }
}
</style>
