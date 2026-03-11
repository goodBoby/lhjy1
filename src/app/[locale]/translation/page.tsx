import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function TranslationPage() {
  const services = [
    {
      type: 'interpretation',
      icon: '🎙️',
      title: 'Live Interpretation',
      titleZh: '现场口译',
      titleJa: 'ライブ通訳',
      titleKo: '라이브 통역',
      desc: 'Real-time interpretation during your medical visit',
      descZh: '就诊期间实时口译',
      descJa: '受診中のリアルタイム通訳',
      descKo: '진료 중 실시간 통역',
      price: '¥200/hour',
    },
    {
      type: 'document',
      icon: '📄',
      title: 'Document Translation',
      titleZh: '文件翻译',
      titleJa: '文書翻訳',
      titleKo: '문서 번역',
      desc: 'Medical records, prescriptions, reports translation',
      descZh: '病历、处方、报告翻译',
      descJa: 'カルテ、処方せん、レポート翻訳',
      descKo: '의료기록, 처방전, 보고서 번역',
      price: '¥50/page',
    },
    {
      type: 'accompany',
      icon: '🤝',
      title: 'Medical Escort',
      titleZh: '就医陪同',
      titleJa: '受診付き添い',
      titleKo: '진료 동행',
      desc: 'Full accompaniment service during hospital visit',
      descZh: '全程陪同就医服务',
      descJa: '病院受診の付き添いサービス',
      descKo: '진료 동행 서비스',
      price: '¥400/day',
    },
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/en">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-900">🌐 Translation Services</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/en"><Button variant="ghost" size="sm">EN</Button></Link>
            <Link href="/zh"><Button variant="ghost" size="sm">中文</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Services */}
        <h2 className="text-lg font-semibold mb-4">Services</h2>
        <div className="grid gap-4 mb-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                    <p className="text-blue-600 font-bold mt-2">{service.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Request Form */}
        <h2 className="text-lg font-semibold mb-4">Request Translation</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Service Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button variant="outline" size="sm">Interpretation</Button>
                  <Button variant="outline" size="sm">Document</Button>
                  <Button variant="outline" size="sm">Escort</Button>
                </div>
              </div>
              <div>
                <Label>From Language</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.slice(0, 3).map((lang) => (
                    <Button key={lang.code} variant="outline" size="sm">
                      {lang.flag} {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>To Language</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.slice(0, 3).map((lang) => (
                    <Button key={lang.code} variant="outline" size="sm">
                      {lang.flag} {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe your needs..." className="mt-2" />
              </div>
              <Button className="w-full">Submit Request</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 px-4 md:hidden">
        <Link href="/en" className="flex flex-col items-center text-xs">
          <span className="text-xl">🏠</span>
          <span>Home</span>
        </Link>
        <Link href="/en/hospitals" className="flex flex-col items-center text-xs">
          <span className="text-xl">🏥</span>
          <span>Hospitals</span>
        </Link>
        <Link href="/en/doctors" className="flex flex-col items-center text-xs">
          <span className="text-xl">👨‍⚕️</span>
          <span>Doctors</span>
        </Link>
        <Link href="/en/profile" className="flex flex-col items-center text-xs">
          <span className="text-xl">👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}
