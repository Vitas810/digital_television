import type { CreateMaterialPayload, Material } from '~/types/materials.ts'

export const getMaterials = (signal?: AbortSignal): Promise<Material[]> => {
  return $fetch<Material[]>('/api/materials', { signal })
}

export const createMaterial = (payload: CreateMaterialPayload): Promise<Material> => {
  return $fetch<Material>('/api/materials', { method: 'POST', body: payload })
}
