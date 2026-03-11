import { Suspense } from 'react'
import Loading from './loading'
import { LocaleLayout } from '@/components/layout/locale-layout'

export default function LocaleLayoutWrapper({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <Suspense fallback={<Loading />}>
      <LocaleLayout params={params}>{children}</LocaleLayout>
    </Suspense>
  )
}
