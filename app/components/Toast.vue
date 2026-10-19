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
.toast {
  position: fixed;
  z-index: 1000;
  top: var(--space-l);
  right: var(--space-l);
  display: flex;
  width: min(380px, calc(100vw - var(--space-2xl)));
  min-height: var(--space-4xl);
  box-sizing: border-box;
  align-items: center;
  gap: var(--space-m);
  justify-content: space-between;
  padding: var(--space-s) var(--space-s) var(--space-s) var(--space-m);
  border-left: var(--space-xxs) solid var(--color-blue-500);
  border-radius: var(--space-xxs);
  color: var(--color-black);
  background: var(--color-white);
  box-shadow: 0 var(--space-s) var(--space-2xl) rgb(24 36 58 / 20%);
  animation: toast-appear 0.25s ease-out;

  & .toast__message {
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  & .toast__close {
    display: grid;
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-xs);
    color: var(--color-gray-300);
    background: transparent;
    cursor: pointer;
    place-items: center;

    &:hover {
      background: rgb(0 0 0 / 6%);
    }
  }

  & .toast__close-icon {
    width: 20px;
    height: 20px;
  }
}

@keyframes toast-appear {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
}
</style>
