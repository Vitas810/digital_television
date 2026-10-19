<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
  >
    <span class="toast__message">{{ message }}</span>

    <button
      class="toast__close"
      type="button"
      aria-label="Закрыть уведомление"
      @click="emit('close')"
    >
      <SvgoIcon
        name="close"
        class="toast__close-icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()

const emit = defineEmits<{
  close: []
}>()

const autoCloseDelay = 10_000
let closeTimeout: ReturnType<typeof setTimeout>

const startAutoClose = () => {
  clearTimeout(closeTimeout)
  closeTimeout = setTimeout(() => emit('close'), autoCloseDelay)
}

watch(() => props.message, startAutoClose, { immediate: true })
onBeforeUnmount(() => clearTimeout(closeTimeout))
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';

.toast {
  position: fixed;
  z-index: 1000;
  top: var(--size-20);
  right: var(--size-20);
  display: flex;
  width: min(380px, calc(100vw - var(--size-32)));
  min-height: var(--size-48px);
  box-sizing: border-box;
  align-items: center;
  gap: var(--size-16);
  justify-content: space-between;
  padding: var(--size-12) var(--size-12) var(--size-12) var(--size-16);
  border-left: var(--size-4) solid @blue;
  border-radius: var(--size-4);
  color: @black;
  background: @white;
  box-shadow: 0 var(--size-10) var(--size-32) rgb(24 36 58 / 20%);
  animation: toast-appear 0.25s ease-out;

  & .toast__message {
    font-size: var(--size-14);
    font-weight: 600;
  }

  & .toast__close {
    display: grid;
    width: var(--size-32);
    height: var(--size-32);
    flex: 0 0 var(--size-32);
    padding: 0;
    border: 0;
    border-radius: var(--size-4);
    color: @lightGray;
    background: transparent;
    cursor: pointer;
    place-items: center;

    &:hover {
      background: rgb(0 0 0 / 6%);
    }
  }

  & .toast__close-icon {
    width: var(--size-20);
    height: var(--size-20);
  }
}

@keyframes toast-appear {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
}
</style>
