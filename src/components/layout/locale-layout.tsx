'use client'

import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

export function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  // This is a placeholder - actual implementation would use the locale
  // from params to set the correct language
  return <>{children}</>
}
