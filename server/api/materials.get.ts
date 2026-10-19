import type { Material } from '~/types/materials.ts'
import { materialsApiUrl } from '~/constans/api.ts'

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
