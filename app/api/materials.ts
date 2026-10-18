import type { Material } from '~/types/materials.ts'

export const getMaterials = (signal?: AbortSignal): Promise<Material[]> => {
  return $fetch<Material[]>('/api/materials', { signal })
}
