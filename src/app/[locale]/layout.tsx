import { Suspense } from 'react'
import { loading } from './loading'
import { LocaleLayout } from '@/components/layout/locale-layout'

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <Suspense fallback={loading()}>
      <LocaleLayout params={params}>{children}</LocaleLayout>
    </Suspense>
  )
}
