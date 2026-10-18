<template>
  <button class="d-button" :class="baseClasses"><slot></slot></button>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      variant?: 'ghost' | string
      color?: 'blue' | 'black'
    }>(),
    { color: 'blue' },
)

const baseClasses = computed(() => [
  props.variant,
  `d-button--${props.color}`,
])
</script>

<style lang="less" scoped>
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

.d-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 44px;
  border-radius: 12px;
  background: @lightBlue;
  border: none;
  color: @blue;
  font-size: 18px;
  font-weight: 450;
  line-height: 100%;
  padding: 10px;

  @media (min-width: @bp-m-max) {
    padding: 10px 24px
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

  &._disabled {
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
}
</style>
