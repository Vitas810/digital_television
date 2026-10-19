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

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isMenuOpen.value = false
  }
}

const onDoc = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).closest('.editor__actions')) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.addEventListener('click', onDoc)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('click', onDoc)
})
</script>

<style scoped lang="less">
@import (reference) '@styles/breakpoints.less';
@import (reference) '@styles/fonts.less';

.editor {
  position: relative;
  min-height: 220px;
  background: transparent;

  .editor__actions {
    display: flex;
    align-items: center;
    gap: var(--space-xxs);
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
    border-radius: var(--radius-s);
    background: var(--color-gray-50);
    color: var(--color-black);
  }

  .editor__add {
    font-size: var(--font-size-l);
    line-height: 1;
    cursor: pointer;
  }

  .editor__add:hover,
  .editor__drag:hover {
    background: var(--color-blue-100);
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
    gap: var(--space-xxs);
    width: 136px;
    padding: var(--space-xs);
    border-radius: var(--radius-s);
    background: var(--color-white);
    box-shadow: 0 4px 20px rgb(0 0 0 / 12%);
  }

  .editor__menu button {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-xxs);
    border: 0;
    border-radius: var(--radius-xs);
    background: transparent;
    color: var(--color-black);
    font-family: var(--font-futura), sans-serif;
    font-size: var(--font-size-2xs);
    text-align: left;
    cursor: pointer;
  }

  .editor__menu button:hover {
    background: var(--color-blue-100);
  }

  .editor__menu-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border: 1px solid var(--color-blue-100);
    border-radius: var(--radius-xs);
    font-size: var(--font-size-2xs);
  }
}

.editor__content {
  & :deep(.editor__prose) {
    min-height: 180px;
    padding: 0;
    outline: none;
    font-family: var(--font-futura), sans-serif;
    font-size: var(--font-size-s);
    line-height: 140%;
    color: var(--color-gray-300);

    @media (min-width: @bp-m) {
      font-size: var(--font-size-l);
    }
  }

  & :deep(.editor__prose > :first-child) {
    margin-top: 0;
  }

  & :deep(.editor__prose > :last-child) {
    margin-bottom: 0;
  }

  & :deep(.editor__prose p) {
    margin: 0 0 var(--font-size-s);
    color: var(--color-black);
  }

  & :deep(.editor__prose p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: var(--color-gray-300);
    pointer-events: none;
  }

  & :deep(.editor__prose h1) {
    margin: 0 0 var(--font-size-s);
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--font-size-3xl);
    font-weight: 600;
    line-height: 120%;
  }

  & :deep(.editor__prose h2) {
    margin: var(--space-xl) 0 var(--space-m);
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--font-size-xl);
    font-weight: 600;
    line-height: 120%;
  }

  & :deep(.editor__prose h3) {
    margin: var(--space-xl) 0 var(--space-m);
    .font-title-22();
  }

  & :deep(.editor__prose blockquote) {
    margin: var(--space-m) 0;
    padding-left: var(--space-m);
    border-left: 3px solid var(--color-gray-300);
  }

  & :deep(.editor__prose ul) {
    padding-left: var(--font-size-2xl);
    list-style: disc;
  }

  & :deep(.editor__prose ol) {
    padding-left: var(--font-size-2xl);
    list-style: decimal;
  }

  & :deep(.editor__prose pre) {
    overflow-x: auto;
    padding: var(--font-size-s);
    border-radius: var(--radius-s);
    background: var(--color-gray-50);
    font-size: var(--font-size-s);
  }
}
</style>
