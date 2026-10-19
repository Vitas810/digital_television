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
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

.d-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-12);
  height: 44px;
  border-radius: var(--size-12);
  background: @lightBlue;
  border: none;
  font-family: var(--font-futura), sans-serif;
  font-size: var(--size-18);
  line-height: 100%;
  padding: 10px;

  @media (min-width: @bp-m-max) {
    padding: 10px var(--size-24);
  }

  @media (hover: hover) {
    &:hover {
      background: @btnHover;
      cursor: pointer;
    }
  }

  &:active {
    background: @btnHover;
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
    color: @blue;
  }

  &--black {
    color: @black;
  }

  &--small {
    height: 40px;
    padding: 0 10px;
    gap: 4px;
    font-size: var(--size-16);

    :deep(svg) {
      width: 20px;
      height: 20px;
      flex: 0 0 20px;
    }
  }

  &--medium {
    height: 48px;
    padding: 0 var(--size-12);
    gap: 4px;

    :deep(svg) {
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
    }

    @media (min-width: @bp-m-max) {
      padding-left: var(--size-24);
      padding-right: var(--size-24);
    }
  }
}
</style>
