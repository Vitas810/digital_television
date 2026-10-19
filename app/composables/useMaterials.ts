import { getMaterials } from '~/api/materials.ts'

export const useMaterials = () => {
  return useAsyncData('materials', (_nuxtApp, { signal }) => getMaterials(signal), {
    transform: (materials) => [...materials].sort((a, b) => b.datetime.localeCompare(a.datetime) || b.id - a.id),
  })
}
