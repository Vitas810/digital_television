<template>
  <button
    class="d-button"
    :class="baseClasses"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'ghost' | string
    color?: 'blue' | 'black'
    size?: 'small' | 'medium'
  }>(),
  { color: 'blue' },
)

const baseClasses = computed(() => [props.variant, `d-button--${props.color}`, props.size && `d-button--${props.size}`])
</script>

<style lang="less">
@import (reference) '@styles/breakpoints.less';

.d-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-s);
  height: 44px;
  border-radius: var(--radius-l);
  background: var(--color-blue-100);
  border: none;
  font-family: var(--font-futura), sans-serif;
  font-size: var(--font-size-m);
  line-height: 100%;
  padding: var(--space-s) var(--space-xl);

  @media (min-width: @bp-m) {
    padding: var(--space-s);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--color-blue-200);
      cursor: pointer;
    }
  }

  &:active {
    background: var(--color-blue-200);
    cursor: pointer;
  }

  &._disabled,
  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &.ghost {
    background-color: transparent;
  }

  &--blue {
    color: var(--color-blue-500);
  }

  &--black {
    color: var(--color-black);
  }

  &--small {
    height: 40px;
    padding: 0 var(--space-s);
    gap: var(--space-xxs);
    font-size: var(--font-size-s);

    :deep(svg) {
      width: 20px;
      height: 20px;
      flex: 0 0 20px;
    }
  }

  &--medium {
    height: 48px;
    padding: 0 var(--space-s);
    gap: var(--space-xxs);

    :deep(svg) {
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
    }

    @media (min-width: @bp-m) {
      height: 44px;
    }
  }
}
</style>
