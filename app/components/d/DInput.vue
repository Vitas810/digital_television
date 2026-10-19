<template>
  <input
    v-model="model"
    class="d-input"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :required="required"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :name="name"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'text' | 'number'
    placeholder?: string
    maxlength?: number
    name?: string
    required?: boolean
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    type: 'text',
    required: false,
    disabled: false,
    name: 'input',
  },
)

const model = defineModel<string>({ default: '' })
</script>

<style lang="less">
@import (reference) '@styles/colors.less';

.d-input {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: @black;
  box-sizing: border-box;

  &::placeholder {
    color: @lightGray;
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
