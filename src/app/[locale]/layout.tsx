import { LocaleLayout } from '@/components/layout/locale-layout'

export default function LocaleLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <LocaleLayout>{children}</LocaleLayout>
}
