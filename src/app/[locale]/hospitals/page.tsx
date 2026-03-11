'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useHospitals } from '@/lib/hooks/use-hospitals'

// Mock data for when Supabase is not configured
const mockHospitals = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Beijing United Family Hospital',
    name_zh: '北京和睦家医院',
    name_ja: '北京ユナイテッドファミリーホスピタル',
    name_ko: '베이징 유나이티드 패밀리 병원',
    description: 'Premium international hospital in Beijing offering comprehensive medical services.',
    address: { street: '2 Jiangtai Road', district: 'Chaoyang District', city: 'Beijing', province: 'Beijing', country: 'China', postal_code: '100016' },
    phone: '+86-10-5927-7000',
    rating: 4.8,
    review_count: 1245,
    specialties: ['Cardiology', 'Pediatrics', 'Obstetrics', 'Orthopedics'],
    languages_supported: ['en', 'zh', 'ja', 'ko'],
    has_international_department: true,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Shanghai East International Medical Center',
    name_zh: '上海东方国际医疗中心',
    name_ja: '上海東方国際医療センター',
    name_ko: '상하이 동방 국제 의료 센터',
    description: 'Modern medical center in Shanghai with international standards.',
    address: { street: '1500 Century Avenue', district: 'Pudong New Area', city: 'Shanghai', province: 'Shanghai', country: 'China', postal_code: '200122' },
    phone: '+86-21-5879-9999',
    rating: 4.7,
    review_count: 987,
    specialties: ['Internal Medicine', 'Surgery', 'Pediatrics', 'Ophthalmology'],
    languages_supported: ['en', 'zh', 'ja', 'ko'],
    has_international_department: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Guangzhou International Medical Center',
    name_zh: '广州国际医疗中心',
    name_ja: '広州国際医療センター',
    name_ko: '광저우 국제 의료 센터',
    description: 'Leading medical center in Southern China with specialized international patient services.',
    address: { street: '1 Zhujiang East Road', district: 'Tianhe District', city: 'Guangzhou', province: 'Guangdong', country: 'China', postal_code: '510623' },
    phone: '+86-20-3888-8888',
    rating: 4.6,
    review_count: 856,
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Dermatology'],
    languages_supported: ['en', 'zh', 'ja', 'ko'],
    has_international_department: true,
  },
]

const CITIES = ['All', 'Beijing', 'Shanghai', 'Guangzhou', 'Chengdu', 'Shenzhen', 'Hangzhou']
const SPECIALTIES = ['All', 'Cardiology', 'Internal Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Neurology', 'Ophthalmology']

export default function HospitalsPage() {
  const params = useParams()
  const locale = (params.locale as string) || 'en'
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [showInternationalOnly, setShowInternationalOnly] = useState(false)

  // Try to fetch from Supabase, fall back to mock data
  const { data: hospitals, isLoading, error } = useHospitals({
    city: selectedCity === 'All' ? undefined : selectedCity,
    specialty: selectedSpecialty === 'All' ? undefined : selectedSpecialty,
    hasInternationalDepartment: showInternationalOnly || undefined,
  })

  // Use mock data if Supabase returns empty or error
  const displayHospitals = (hospitals && hospitals.length > 0) ? hospitals : mockHospitals

  // Filter by search query (client-side for mock data)
  const filteredHospitals = displayHospitals.filter((hospital: any) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const name = (hospital.name || '').toLowerCase()
      const nameZh = (hospital.name_zh || '').toLowerCase()
      if (!name.includes(query) && !nameZh.includes(query)) return false
    }
    return true
  })

  const getHospitalName = (hospital: any) => {
    switch (locale) {
      case 'zh': return hospital.name_zh || hospital.name
      case 'ja': return hospital.name_ja || hospital.name
      case 'ko': return hospital.name_ko || hospital.name
      default: return hospital.name
    }
  }

  const getHospitalDescription = (hospital: any) => {
    switch (locale) {
      case 'zh': return hospital.description_zh || hospital.description
      case 'ja': return hospital.description_ja || hospital.description
      case 'ko': return hospital.description_ko || hospital.description
      default: return hospital.description
    }
  }

  const formatAddress = (address: any) => {
    if (!address) return ''
    return `${address.street || ''}, ${address.district || ''}, ${address.city || ''}`
  }

  const formatLanguages = (languages: string[]) => {
    const langMap: Record<string, string> = {
      en: 'English', zh: '中文', ja: '日本語', ko: '한국어', fr: 'Français', de: 'Deutsch', es: 'Español', ru: 'Русский', ar: 'العربية'
    }
    return languages?.map(l => langMap[l] || l).join(', ') || 'English'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`}>
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-900">🏥 {locale === 'zh' ? '医院' : locale === 'ja' ? '病院' : locale === 'ko' ? '병원' : 'Hospitals'}</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/en/hospitals"><Button variant="ghost" size="sm">EN</Button></Link>
            <Link href="/zh/hospitals"><Button variant="ghost" size="sm">中文</Button></Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            <Input 
              placeholder={locale === 'zh' ? '搜索医院、城市、专科...' : locale === 'ja' ? '病院、都市、診療科を検索...' : locale === 'ko' ? '병원, 도시, 진료과 검색...' : 'Search hospitals, cities, specialties...'} 
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => {}}>
              {locale === 'zh' ? '搜索' : locale === 'ja' ? '検索' : locale === 'ko' ? '검색' : 'Search'}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={selectedCity === 'All' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCity('All')}
          >
            {locale === 'zh' ? '全部' : locale === 'ja' ? 'すべて' : locale === 'ko' ? '전체' : 'All'}
          </Button>
          <Button 
            variant={showInternationalOnly ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setShowInternationalOnly(!showInternationalOnly)}
          >
            {locale === 'zh' ? '国际部' : locale === 'ja' ? '国際部門' : locale === 'ko' ? '국제 부서' : 'International'}
          </Button>
          {CITIES.filter(c => c !== 'All').map(city => (
            <Button 
              key={city}
              variant={selectedCity === city ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </Button>
          ))}
        </div>

        {/* Specialty Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SPECIALTIES.map(specialty => (
            <Button 
              key={specialty}
              variant={selectedSpecialty === specialty ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty === 'All' ? (locale === 'zh' ? '全部' : locale === 'ja' ? 'すべて' : locale === 'ko' ? '전체' : 'All') : specialty}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">{locale === 'zh' ? '加载中...' : locale === 'ja' ? '読み込み中...' : locale === 'ko' ? '로딩 중...' : 'Loading...'}</p>
          </div>
        )}

        {/* Hospital List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredHospitals.map((hospital: any) => (
              <Card key={hospital.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{getHospitalName(hospital)}</CardTitle>
                      <p className="text-sm text-gray-500">{getHospitalDescription(hospital)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-600">⭐ {hospital.rating || 'N/A'}</div>
                      {hospital.has_international_department && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {locale === 'zh' ? '国际部' : locale === 'ja' ? '国際' : locale === 'ko' ? '국제' : 'INTL'}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>{locale === 'zh' ? '专科' : locale === 'ja' ? '専門' : locale === 'ko' ? '전공' : 'Specialty'}:</strong> {hospital.specialties?.join(', ') || 'N/A'}</p>
                    <p><strong>{locale === 'zh' ? '语言' : locale === 'ja' ? '言語' : locale === 'ko' ? '언어' : 'Languages'}:</strong> {formatLanguages(hospital.languages_supported)}</p>
                    <p><strong>{locale === 'zh' ? '地址' : locale === 'ja' ? '住所' : locale === 'ko' ? '주소' : 'Address'}:</strong> {formatAddress(hospital.address)}</p>
                    <p><strong>{locale === 'zh' ? '电话' : locale === 'ja' ? '電話' : locale === 'ko' ? '전화' : 'Phone'}:</strong> {hospital.phone || 'N/A'}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/${locale}/hospitals/${hospital.id}`}>
                      <Button size="sm">{locale === 'zh' ? '查看详情' : locale === 'ja' ? '詳細を見る' : locale === 'ko' ? '상세 보기' : 'View Details'}</Button>
                    </Link>
                    <Link href={`/${locale}/doctors?hospital=${hospital.id}`}>
                      <Button variant="outline" size="sm">{locale === 'zh' ? '预约医生' : locale === 'ja' ? '医師予約' : locale === 'ko' ? '의사 예약' : 'Book Doctor'}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredHospitals.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <p>{locale === 'zh' ? '未找到医院' : locale === 'ja' ? '病院が見つかりません' : locale === 'ko' ? '병원을 찾을 수 없습니다' : 'No hospitals found'}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 px-4 md:hidden">
        <Link href={`/${locale}`} className="flex flex-col items-center text-xs">
          <span className="text-xl">🏠</span>
          <span>{locale === 'zh' ? '首页' : locale === 'ja' ? 'ホーム' : locale === 'ko' ? '홈' : 'Home'}</span>
        </Link>
        <Link href={`/${locale}/hospitals`} className="flex flex-col items-center text-xs text-blue-600">
          <span className="text-xl">🏥</span>
          <span>{locale === 'zh' ? '医院' : locale === 'ja' ? '病院' : locale === 'ko' ? '병원' : 'Hospitals'}</span>
        </Link>
        <Link href={`/${locale}/doctors`} className="flex flex-col items-center text-xs">
          <span className="text-xl">👨‍⚕️</span>
          <span>{locale === 'zh' ? '医生' : locale === 'ja' ? '医師' : locale === 'ko' ? '의사' : 'Doctors'}</span>
        </Link>
        <Link href={`/${locale}/profile`} className="flex flex-col items-center text-xs">
          <span className="text-xl">👤</span>
          <span>{locale === 'zh' ? '我的' : locale === 'ja' ? 'プロフィール' : locale === 'ko' ? '프로필' : 'Profile'}</span>
        </Link>
      </nav>
    </div>
  )
}
