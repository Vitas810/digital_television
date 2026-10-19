import type { CreateMaterialPayload, Material } from '~/types/materials.ts'
import { materialsApiUrl } from '~/constants/api.ts'

export default defineEventHandler(async (event): Promise<Material> => {
  const body = await readBody<CreateMaterialPayload>(event)

  if (!body?.title?.trim() || !body.short_description?.trim() || !body.datetime) {
    throw createError({ statusCode: 400, statusMessage: 'Заполните заголовок, краткое описание и дату создания' })
  }

  try {
    return await $fetch<Material>(`${materialsApiUrl}/save`, {
      method: 'POST',
      body: {
        ...body,
        description_html: body.description_html || '<p></p>',
        description_json: body.description_json || '{"type":"doc","content":[{"type":"paragraph"}]}',
      },
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Не удалось создать материал' })
  }
})
