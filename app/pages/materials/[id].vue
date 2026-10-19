<template>
  <section class="material content-wrapper__compact">
    <div
      v-if="pending"
      class="loading-wrapper"
    >
      <div class="_spinner"></div>
    </div>

    <div
      v-else-if="error"
      class="material__error"
    >
      Не удалось загрузить материалы: {{ error.message }}
    </div>

    <template v-else-if="material">
      <DButton
        variant="ghost"
        color="black"
        @click="goBack"
        class="material__back"
      >
        <SvgoIcon
          name="arrowSquareLeft"
          class="icon"
        />
        Назад
      </DButton>

      <div class="material__card">
        <div
          class="material__card-date"
          v-if="material?.datetime"
        >
          <SvgoIcon
            name="calendar"
            class="icon"
          ></SvgoIcon>
          {{ formatDate(material.datetime) }}
        </div>

        <h1
          class="material__card-title"
          v-if="material?.title"
        >
          {{ material.title }}
        </h1>

        <div
          class="material__card-short-description"
          v-if="material?.short_description"
          v-html="material.short_description"
        ></div>

        <div
          class="material__card-description"
          v-if="material?.description_html"
          v-html="material.description_html"
        ></div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: materials, pending, error } = useMaterials()

const material = computed(() => materials.value?.find((material) => String(material.id) === String(route.params.id)))

const goBack = () => router.back()

watchEffect(() => {
  if (!pending.value && !error.value && materials.value && !material.value) {
    showError(createError({ statusCode: 404, message: 'Страница не найдена' }))
  }
})
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';
@import (reference) '@styles/fonts.less';

.material {
  & .material__back {
    margin: var(--space-2xl) 0;
  }

  & .material__card {
    background: var(--color-white);
    border-radius: var(--radius-4xl);
    padding: var(--space-m) var(--space-xl);
    margin-bottom: var(--space-2xl);

    @media (min-width: @bp-m) {
      padding: var(--space-5xl);
    }
  }

  & .material__card-date {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    font-family: var(--font-futura), sans-serif;
    color: var(--color-gray-300);
    font-size: var(--font-size-m);
    line-height: 120%;
    margin-bottom: var(--space-xl);

    @media (min-width: @bp-m) {
      font-size: var(--space-l);
      line-height: 140%;
    }
  }

  & .material__card-title {
    .font-title-36-strong();
    color: var(--color-black);
    margin-bottom: var(--space-xl);
  }

  & .material__card-short-description {
    .font-body-22();
    color: var(--color-black);
    margin-bottom: var(--space-xl);

    @media (min-width: @bp-m) {
      margin-bottom: var(--space-3xl);
    }
  }

  & .material__card-description {
    font-family: var(--font-futura), sans-serif;
    font-size: var(--space-m);
    line-height: 140%;
    color: var(--color-black);

    @media (min-width: @bp-m) {
      font-size: var(--font-size-l);
    }
  }

  & .icon {
    width: 20px;
    height: 20px;

    @media (min-width: @bp-m) {
      width: 24px;
      height: 24px;
    }
  }

  & .material__error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(90vh - 88px);
    padding-top: var(--space-m);
    color: var(--color-black);
  }
}
</style>
