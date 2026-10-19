<template>
  <header class="header">
    <NuxtLink to="/">
      <SvgoIcon
        name="logo"
        class="header__logo"
      ></SvgoIcon>
    </NuxtLink>

    <DButton
      class="header__btn"
      size="medium"
      :aria-label="isCreatePage ? 'Сохранить' : 'Создать историю'"
      :type="isCreatePage ? 'submit' : 'button'"
      :form="isCreatePage ? 'material-form' : undefined"
      :disabled="isCreatePage && isSubmitting"
      @click="handleButtonClick"
    >
      <span class="header__btn-label"> {{ isCreatePage ? 'Сохранить' : 'Создать историю' }}</span>
      <SvgoIcon
        v-if="isCreatePage"
        name="send"
        class="header__btn-icon"
        aria-hidden="true"
      />
      <SvgoIcon
        v-else
        name="add"
        class="header__btn-icon"
        aria-hidden="true"
      />
    </DButton>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isCreatePage = computed(() => route.path === '/materials/create')
const isSubmitting = useState('material-submitting', () => false)

const handleButtonClick = () => {
  if (!isCreatePage.value) {
    return navigateTo('/materials/create')
  }
}
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-8) var(--size-36);

  @media (min-width: @bp-m) {
    padding: var(--size-20) var(--size-16);
  }

  & .header__btn-icon {
    width: var(--size-24);
    height: var(--size-24);
    display: none;

    @media (max-width: @bp-xs-max) {
      display: block;
    }
  }

  .header__btn-label {
    @media (max-width: @bp-xs-max) {
      display: none;
    }
  }
}
</style>
