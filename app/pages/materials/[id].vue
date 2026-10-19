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
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

.material {
  & .material__back {
    margin: var(--size-48) 0;
  }

  & .material__card {
    background: @white;
    border-radius: var(--size-32);
    padding: var(--size-16) var(--size-24);
    margin-bottom: var(--size-32);

    @media (min-width: @bp-m) {
      padding: var(--size-64);
    }
  }

  & .material__card-date {
    display: flex;
    align-items: center;
    gap: var(--size-12);
    font-family: var(--font-futura), sans-serif;
    color: @lightGray;
    font-size: var(--size-18);
    line-height: 120%;
    margin-bottom: var(--size-24);

    @media (min-width: @bp-m) {
      font-size: var(--size-20);
      line-height: 140%;
    }
  }

  & .material__card-title {
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--size-24);
    line-height: 120%;
    font-weight: 600;
    color: @black;
    margin-bottom: var(--size-24);

    @media (min-width: @bp-m) {
      font-size: var(--size-36);
    }
  }

  & .material__card-short-description {
    font-family: var(--font-futura), sans-serif;
    font-size: var(--size-18);
    line-height: 120%;
    font-weight: 500;
    color: @black;
    margin-bottom: var(--size-24);

    @media (min-width: @bp-m) {
      font-size: var(--size-22);
      margin-bottom: var(--size-38);
    }
  }

  & .material__card-description {
    font-family: var(--font-futura), sans-serif;
    font-size: var(--size-16);
    line-height: 140%;
    color: @black;

    @media (min-width: @bp-m) {
      font-size: var(--size-20);
    }
  }

  & .icon {
    width: var(--size-20);
    height: var(--size-20);

    @media (min-width: @bp-m) {
      width: var(--size-24);
      height: var(--size-24);
    }
  }

  & .material__error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(90vh - 88px);
    padding-top: var(--size-16);
    color: @black;
  }
}
</style>
