<template>
  <div class="editor">
    <TiptapEditorContent
      :editor="editor"
      class="editor__content"
    />

    <DragHandle
      v-if="editor"
      :key="isDesktop ? 'desktop' : 'mobile'"
      :editor="editor"
      :compute-position-config="dragHandleConfig"
    >
      <div class="editor__actions">
        <button
          type="button"
          class="editor__add"
          aria-label="Добавить блок"
          :aria-expanded="isMenuOpen"
          @mousedown.prevent
          @click.stop="toggleMenu"
        >
          +
        </button>

        <button
          type="button"
          class="editor__drag"
          aria-label="Переместить блок"
          title="Перетащить блок"
          @mousedown.stop
        >
          ⠿
        </button>

        <div
          v-if="isMenuOpen"
          class="editor__menu"
          @mousedown.prevent
        >
          <button
            type="button"
            @click="setParagraph"
          >
            <span class="editor__menu-icon">T</span>
            <span>Текст</span>
          </button>

          <button
            type="button"
            @click="setHeading(1)"
          >
            <span class="editor__menu-icon">H1</span>
            <span>Заголовок 1</span>
          </button>

          <button
            type="button"
            @click="setHeading(2)"
          >
            <span class="editor__menu-icon">H2</span>
            <span>Заголовок 2</span>
          </button>

          <button
            type="button"
            @click="setHeading(3)"
          >
            <span class="editor__menu-icon">H3</span>
            <span>Заголовок 3</span>
          </button>

          <button
            type="button"
            @click="setBlockquote"
          >
            <span class="editor__menu-icon">»</span>
            <span>Цитата</span>
          </button>
        </div>
      </div>
    </DragHandle>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Placeholder from '@tiptap/extension-placeholder'
import { DragHandle } from '@tiptap/extension-drag-handle-vue-3'

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  'update:json': [value: string]
}>()

const isMenuOpen = ref(false)
const { isDesktop } = useDeviceState()

const editor = useEditor({
  content: model.value,
  extensions: [
    TiptapStarterKit,
    Placeholder.configure({
      placeholder: 'Введите текст...',
    }),
  ],
  editorProps: {
    attributes: {
      'class': 'editor__prose',
      'aria-label': 'Текст материала',
    },
  },
  onUpdate: ({ editor }) => {
    model.value = editor.getHTML()
    emit('update:json', JSON.stringify(editor.getJSON()))
  },
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const setParagraph = () => {
  editor.value?.chain().focus().setParagraph().run()
  isMenuOpen.value = false
}

const setHeading = (level: 1 | 2 | 3) => {
  editor.value?.chain().focus().toggleHeading({ level }).run()
  isMenuOpen.value = false
}

const setBlockquote = () => {
  editor.value?.chain().focus().toggleBlockquote().run()
  isMenuOpen.value = false
}

watch(model, (value) => {
  if (editor.value && value !== editor.value.getHTML()) {
    editor.value.commands.setContent(value, { emitUpdate: false })
  }
})

const dragHandleConfig = computed(
  () =>
    ({
      placement: isDesktop.value ? 'left-start' : 'bottom-start',
      strategy: 'absolute',
    }) as const,
)
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';
@import (reference) '@styles/fonts.less';

.editor {
  position: relative;
  min-height: 220px;
  background: transparent;

  .editor__actions {
    display: flex;
    align-items: center;
    gap: 4px;
    position: relative;
  }

  .editor__add,
  .editor__drag {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    border-radius: var(--size-8);
    background: #f3f4f8;
    color: @black;
  }

  .editor__add {
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }

  .editor__add:hover,
  .editor__drag:hover {
    background: @lightBlue;
  }

  .editor__drag {
    cursor: grab;
    user-select: none;
  }

  .editor__drag:active {
    cursor: grabbing;
  }

  .editor__menu {
    position: absolute;
    z-index: 20;
    top: 28px;
    left: 0;
    display: grid;
    gap: 2px;
    width: 136px;
    padding: var(--size-8);
    border-radius: var(--size-8);
    background: @white;
    box-shadow: 0 4px 20px rgb(0 0 0 / 12%);
  }

  .editor__menu button {
    display: flex;
    align-items: center;
    gap: var(--size-8);
    padding: 6px 4px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: @black;
    font-family: var(--font-futura), sans-serif;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
  }

  .editor__menu button:hover {
    background: #f3f4f8;
  }

  .editor__menu-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border: 1px solid #e1e4ed;
    border-radius: 3px;
    font-size: 10px;
  }
}

.editor__content {
  & :deep(.editor__prose) {
    min-height: 180px;
    padding: 0;
    outline: none;
    font-family: var(--font-futura), sans-serif;
    font-size: var(--size-16);
    line-height: 140%;
    color: @lightGray;

    @media (min-width: @bp-m) {
      font-size: var(--size-20);
    }
  }

  & :deep(.editor__prose > :first-child) {
    margin-top: 0;
  }

  & :deep(.editor__prose > :last-child) {
    margin-bottom: 0;
  }

  & :deep(.editor__prose p) {
    margin: 0 0 var(--size-16);
    color: @black;
  }

  & :deep(.editor__prose p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: #b8c2df;
    pointer-events: none;
  }

  & :deep(.editor__prose h1) {
    margin: 0 0 var(--size-16);
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--size-36);
    font-weight: 600;
    line-height: 120%;
  }

  & :deep(.editor__prose h2) {
    margin: var(--size-24) 0 var(--size-16);
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--size-28);
    font-weight: 600;
    line-height: 120%;
  }

  & :deep(.editor__prose h3) {
    margin: var(--size-24) 0 var(--size-16);
    .font-title-22();
  }

  & :deep(.editor__prose blockquote) {
    margin: var(--size-16) 0;
    padding-left: var(--size-16);
    border-left: 3px solid @lightGray;
  }

  & :deep(.editor__prose ul) {
    padding-left: var(--size-24);
    list-style: disc;
  }

  & :deep(.editor__prose ol) {
    padding-left: var(--size-24);
    list-style: decimal;
  }

  & :deep(.editor__prose pre) {
    overflow-x: auto;
    padding: var(--size-16);
    border-radius: var(--size-8);
    background: #f3f4f8;
    font-size: var(--size-16);
  }
}
</style>
