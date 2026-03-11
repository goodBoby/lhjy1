import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  const features = [
    {
      icon: '🏥',
      title: 'Hospitals',
      titleZh: '医院',
      titleJa: '病院',
      titleKo: '병원',
      desc: 'Find best hospitals in China',
      descZh: '找到中国最好的医院',
      descJa: '中国の最好的病院を見つける',
      descKo: '중국 최고의 병원 찾기',
      href: '/en/hospitals',
    },
    {
      icon: '👨‍⚕️',
      title: 'Doctors',
      titleZh: '医生',
      titleJa: '医師',
      titleKo: '의사',
      desc: 'Book appointments with specialists',
      descZh: '预约专科医生',
      descJa: '専門医の予約',
      descKo: '전문의 예약',
      href: '/en/doctors',
    },
    {
      icon: '📅',
      title: 'Appointments',
      titleZh: '预约',
      titleJa: '予約',
      titleKo: '예약',
      desc: 'Manage your medical visits',
      descZh: '管理您的就诊',
      descJa: '受診を管理',
      descKo: '진료 관리',
      href: '/en/appointments',
    },
    {
      icon: '🌐',
      title: 'Translation',
      titleZh: '翻译服务',
      titleJa: '翻訳サービス',
      titleKo: '통역 서비스',
      desc: 'Professional medical interpreters',
      descZh: '专业医学口译员',
      descJa: 'プロの医療通訳',
      descKo: '전문 의료 통역사',
      href: '/en/translation',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-900">ChinaMediGuide</h1>
          <nav className="flex gap-2">
            <Link href="/en">
              <Button variant="ghost" size="sm">EN</Button>
            </Link>
            <Link href="/zh">
              <Button variant="ghost" size="sm">中文</Button>
            </Link>
            <Link href="/ja">
              <Button variant="ghost" size="sm">日本語</Button>
            </Link>
            <Link href="/ko">
              <Button variant="ghost" size="sm">한국어</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Health, Our Priority
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Access quality healthcare in China with ease. Find hospitals, book doctors, and get translation support.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/en/emergency">
            <Button variant="destructive" size="lg">
              🚨 Emergency: Call 120
            </Button>
          </Link>
          <Link href="/en/pharmacy">
            <Button variant="outline" size="lg">
              💊 Find Pharmacy
            </Button>
          </Link>
          <Link href="/en/insurance">
            <Button variant="outline" size="lg">
              🏥 Insurance Claims
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 ChinaMediGuide. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Helping foreigners access medical services in China
          </p>
        </div>
      </footer>
    </div>
  )
}
