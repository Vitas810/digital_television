import { getMaterials } from '~/api/materials.ts'

export const useMaterials = () => {
  return useAsyncData('materials', (_nuxtApp, { signal }) => getMaterials(signal))
}
