import React, { ComponentType, Suspense } from 'react'
import { Preloader } from '../components/ui/preloader/Preloader'

export function withSuspense(Component: ComponentType) {
  return () => (
    <Suspense fallback={<Preloader />}>
      <Component />
    </Suspense>
  )
}
