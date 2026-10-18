import type { Material } from '~/types/materials.ts'

const materialsApiUrl = 'https://naukatv.ru/api/test/materials/posypenko'

export default defineEventHandler(async (): Promise<Material[]> => {
  try {
    return await $fetch<Material[]>(materialsApiUrl)
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Не удалось загрузить материалы',
    })
  }
})
