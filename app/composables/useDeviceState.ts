import { computed, useViewport } from '#imports'

export const useDeviceState = () => {
  const viewport = useViewport()

  // computed завязаны на состояние viewport
  const isMobile = computed(() => viewport.isLessThan('s'))
  const isDesktop = computed(() => viewport.isGreaterOrEquals('m'))

  return {
    isMobile,
    isDesktop,
  }
}
