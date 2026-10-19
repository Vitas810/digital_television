<template>
  <section class="create">
    <div
      v-if="submitError"
      class="create__error"
    >
      {{ submitError }}
    </div>

    <template v-else>
      <DButton
        variant="ghost"
        color="black"
        class="create__back"
        @click="goBack"
      >
        <SvgoIcon
          name="arrowSquareLeft"
          class="icon"
        />
        Назад
      </DButton>

      <h1 class="create__title">Создание материала</h1>

      <form
        id="material-form"
        class="create__form"
        @submit.prevent="submit"
      >
        <div class="create__datetime">
          <VueDatePicker
            v-model="form.datetime"
            :locale="ru"
            format="dd.MM.yyyy HH:mm"
            :enable-time-picker="true"
            :is-24="true"
            auto-apply
            :clearable="false"
            required
          />
        </div>

        <DInput
          class="create__title-form"
          v-model.trim="form.title"
          required
          :maxlength="80"
          placeholder="Введите заголовок"
          aria-label="Заголовок"
        />

        <DTextarea
          v-model.trim="form.short_description"
          required
          :maxlength="255"
          :rows="2"
          placeholder="Введите краткое описание..."
          aria-label="Краткое описание"
          class="create__description"
        />

        <div class="create__editor">
          <TiptapEditor
            v-model="form.description_html"
            @update:json="form.description_json = $event"
          />
        </div>
      </form>
    </template>
  </section>
</template>

<script setup lang="ts">
import TiptapEditor from '~/components/TiptapEditor.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { ru } from 'date-fns/locale'
import '@vuepic/vue-datepicker/dist/main.css'
import { createMaterial } from '~/api/materials.ts'

const router = useRouter()

const isSubmitting = useState('material-submitting', () => false)
const submitError = ref('')

const goBack = () => router.back()

const form = reactive({
  title: '',
  short_description: '',
  description_html: '',
  description_json: '',
  datetime: new Date(),
})

const submit = async () => {
  if (isSubmitting.value) return

  submitError.value = ''
  isSubmitting.value = true

  try {
    const payload = {
      ...form,
      datetime: form.datetime.toISOString(),
    }

    const material = await createMaterial(payload)
    await router.push(`/materials/${material.id}`)
  } catch {
    submitError.value = 'Не удалось создать материал. Попробуйте ещё раз.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="less">
@import (reference) '@styles/colors.less';
@import (reference) '@styles/breakpoints.less';

.create {
  max-width: 1014px;
  margin: 0 auto;

  .create__back {
    margin-top: var(--size-48);
    margin-bottom: var(--size-32);
  }

  .create__title {
    margin: 0 0 var(--size-24);
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--size-24);
    line-height: 120%;
    font-weight: 600;
    color: @black;

    @media (min-width: @bp-m) {
      margin-bottom: var(--size-32);
      font-size: var(--size-36);
    }
  }

  .create__form {
    display: flex;
    flex-direction: column;
    min-height: 420px;
    padding: var(--size-16) var(--size-20);
    border-radius: var(--size-32);
    background: @white;
    box-sizing: border-box;

    @media (min-width: @bp-m) {
      padding: var(--size-24) var(--size-48) var(--size-24) var(--size-106);
    }
  }

  .create__datetime {
    width: max-content;
    margin-bottom: var(--size-24);

    .dp__input:focus {
      border-color: @black;
    }
  }

  .create__title-form {
    font-family: var(--font-source-sans), sans-serif;
    font-size: var(--size-24);
    line-height: 120%;
    font-weight: 600;
    margin-bottom: var(--size-12);

    @media (min-width: @bp-m) {
      font-size: var(--size-36);
      margin-bottom: var(--size-24);
    }
  }

  .create__description {
    font-family: var(--font-futura), sans-serif;
    font-size: var(--size-18);
    line-height: 120%;
    margin-bottom: var(--size-24);

    @media (min-width: @bp-m) {
      font-size: var(--size-22);
      margin-bottom: var(--size-40);
    }
  }

  .create__editor {
    flex: 1;
    min-height: 220px;
  }

  .create__submit {
    width: 100%;
    margin-top: auto;
  }

  .create__error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(90vh - 90px);
    padding-top: var(--size-16);
    color: @black;
  }

  .icon {
    width: var(--size-20);
    height: var(--size-20);

    @media (min-width: @bp-m) {
      width: var(--size-24);
      height: var(--size-24);
    }
  }
}
</style>
