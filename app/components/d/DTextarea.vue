<template>
  <textarea
    v-model="model"
    class="textarea"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :rows="rows"
    :required="required"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :name="name"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string
    placeholder?: string
    maxlength?: number
    rows?: number
    required?: boolean
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    rows: 1,
    required: false,
    disabled: false,
    name: 'textarea',
  },
)

const model = defineModel<string>({ default: '' })
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';

.textarea {
  display: block;
  field-sizing: content;
  overflow: hidden;
  width: 100%;
  padding: 0;
  border: 0;
  outline: none;
  resize: none;
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
