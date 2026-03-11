'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useDoctors, useDoctorAvailability } from '@/lib/hooks/use-doctors'

// Mock data for when Supabase is not configured
const mockDoctors = [
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    hospital_id: '11111111-1111-1111-1111-111111111111',
    name: 'Dr. Zhang Wei',
    name_zh: '张伟医生',
    name_ja: '張偉医師',
    name_ko: '장웨이 의사',
    title: 'Chief Cardiologist',
    title_zh: '心脏科主任',
    specialization: 'Cardiology',
    specialization_zh: '心脏科',
    specialization_ja: '心臓科',
    specialization_ko: '심장과',
    experience_years: 15,
    languages: ['en', 'zh', 'ja'],
    bio: 'Expert in interventional cardiology with 15 years of experience.',
    bio_zh: '介入心脏病学专家，拥有15年经验。',
    bio_ja: 'インターベンション心臓病学の専門家で、15年の経験があります。',
    bio_ko: '중재 심장병학 전문가로 15년 경력을 가지고 있습니다.',
    rating: 4.9,
    review_count: 234,
    consultation_fee: 800,
    is_available_for_online: true,
    is_verified: true,
  },
  {
    id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    hospital_id: '11111111-1111-1111-1111-111111111111',
    name: 'Dr. Li Na',
    name_zh: '李娜医生',
    name_ja: '李娜医師',
    name_ko: '리나 의사',
    title: 'Senior Pediatrician',
    title_zh: '高级儿科医生',
    specialization: 'Pediatrics',
    specialization_zh: '儿科',
    specialization_ja: '小儿科',
    specialization_ko: '소아과',
    experience_years: 12,
    languages: ['en', 'zh', 'ko'],
    bio: 'Specialized in pediatric infectious diseases and developmental pediatrics.',
    bio_zh: '专攻儿科传染病和发育儿科学。',
    bio_ja: '小児感染症と発達小児科を専門としています。',
    bio_ko: '소아 감염병과 발달 소아과를 전문으로 합니다.',
    rating: 4.8,
    review_count: 189,
    consultation_fee: 600,
    is_available_for_online: true,
    is_verified: true,
  },
  {
    id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
    hospital_id: '11111111-1111-1111-1111-111111111111',
    name: 'Dr. Wang Min',
    name_zh: '王敏医生',
    name_ja: '王敏医師',
    name_ko: '왕민 의사',
    title: 'Orthopedic Surgeon',
    title_zh: '骨科医生',
    specialization: 'Orthopedics',
    specialization_zh: '骨科',
    specialization_ja: '整形外科',
    specialization_ko: '정형외과',
    experience_years: 18,
    languages: ['en', 'zh', 'ja', 'ko'],
    bio: 'Expert in joint replacement and sports medicine. Performed over 1000 successful surgeries.',
    bio_zh: '关节置换和运动医学专家。成功完成1000多例手术。',
    bio_ja: '関節置換とスポーツ医学の専門家。1000件以上の成功した手術を実施。',
    bio_ko: '관절 치환 및 스포츠 의학 전문가. 1000건 이상의 성공적인 수술을 수행했습니다.',
    rating: 4.9,
    review_count: 312,
    consultation_fee: 1200,
    is_available_for_online: false,
    is_verified: true,
  },
  {
    id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    hospital_id: '22222222-2222-2222-2222-222222222222',
    name: 'Dr. Chen Hao',
    name_zh: '陈浩医生',
    name_ja: '陳浩医師',
    name_ko: '천하오 의사',
    title: 'Internal Medicine Specialist',
    title_zh: '内科专家',
    specialization: 'Internal Medicine',
    specialization_zh: '内科',
    specialization_ja: '内科',
    specialization_ko: '내과',
    experience_years: 10,
    languages: ['en', 'zh', 'ja'],
    bio: 'Specializes in diabetes management and preventive medicine.',
    bio_zh: '专攻糖尿病管理和预防医学。',
    bio_ja: '糖尿病管理と予防医学を専門としています。',
    bio_ko: '당뇨병 관리 및 예방 의학을 전문으로 합니다.',
    rating: 4.7,
    review_count: 156,
    consultation_fee: 500,
    is_available_for_online: true,
    is_verified: true,
  },
  {
    id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    hospital_id: '22222222-2222-2222-2222-222222222222',
    name: 'Dr. Yamamoto Kenji',
    name_zh: '山本健二医生',
    name_ja: '山本健二医師',
    name_ko: '야마모토 켄지 의사',
    title: 'Ophthalmology Consultant',
    title_zh: '眼科顾问',
    specialization: 'Ophthalmology',
    specialization_zh: '眼科',
    specialization_ja: '眼科',
    specialization_ko: '안과',
    experience_years: 20,
    languages: ['ja', 'en', 'zh'],
    bio: 'Japanese ophthalmologist specializing in cataract surgery and retinal diseases.',
    bio_zh: '日本眼科医生，专攻白内障手术和视网膜疾病。',
    bio_ja: '白内障手術と網膜疾患を専門とする日本人眼科医。',
    bio_ko: '백내장 수술과 망막 질환을 전문으로 하는 일본인 안과 의사.',
    rating: 4.8,
    review_count: 198,
    consultation_fee: 900,
    is_available_for_online: true,
    is_verified: true,
  },
  {
    id: 'gggggggg-gggg-gggg-gggg-gggggggggggg',
    hospital_id: '22222222-2222-2222-2222-222222222222',
    name: 'Dr. Kim Soo-min',
    name_zh: '金秀敏医生',
    name_ja: '金秀敏医師',
    name_ko: '김수민 의사',
    title: 'Dermatology Specialist',
    title_zh: '皮肤科专家',
    specialization: 'Dermatology',
    specialization_zh: '皮肤科',
    specialization_ja: '皮膚科',
    specialization_ko: '피부과',
    experience_years: 8,
    languages: ['ko', 'en', 'zh'],
    bio: 'Korean dermatologist specializing in cosmetic dermatology and laser treatments.',
    bio_zh: '韩国皮肤科医生，专攻美容皮肤科和激光治疗。',
    bio_ja: '美容皮膚科とレーザー治療を専門とする韓国人皮膚科医。',
    bio_ko: '미용 피부과 및 레이저 치료를 전문으로 하는 한국인 피부과 의사.',
    rating: 4.6,
    review_count: 145,
    consultation_fee: 700,
    is_available_for_online: true,
    is_verified: true,
  },
]

const SPECIALTIES = ['All', 'Cardiology', 'Internal Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Neurology', 'Ophthalmology', 'Traditional Chinese Medicine']
const HOSPITALS: Record<string, string> = {
  '11111111-1111-1111-1111-111111111111': 'Beijing United Family Hospital',
  '22222222-2222-2222-2222-222222222222': 'Shanghai East International Medical Center',
  '33333333-3333-3333-3333-333333333333': 'Guangzhou International Medical Center',
}

export default function DoctorsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = (params.locale as string) || 'en'
  
  const hospitalId = searchParams.get('hospital')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  // Try to fetch from Supabase, fall back to mock data
  const { data: doctors, isLoading } = useDoctors({
    hospitalId: hospitalId || undefined,
    specialization: selectedSpecialty === 'All' ? undefined : selectedSpecialty,
    isAvailableForOnline: showOnlineOnly || undefined,
  })

  // Use mock data if Supabase returns empty or error
  const displayDoctors = (doctors && doctors.length > 0) ? doctors : mockDoctors

  // Filter by search query (client-side for mock data)
  const filteredDoctors = displayDoctors.filter((doctor: any) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const name = (doctor.name || '').toLowerCase()
      const nameZh = (doctor.name_zh || '').toLowerCase()
      const specialty = (doctor.specialization || '').toLowerCase()
      if (!name.includes(query) && !nameZh.includes(query) && !specialty.includes(query)) return false
    }
    return true
  })

  const getDoctorName = (doctor: any) => {
    switch (locale) {
      case 'zh': return doctor.name_zh || doctor.name
      case 'ja': return doctor.name_ja || doctor.name
      case 'ko': return doctor.name_ko || doctor.name
      default: return doctor.name
    }
  }

  const getDoctorTitle = (doctor: any) => {
    switch (locale) {
      case 'zh': return doctor.title_zh || doctor.title
      case 'ja': return doctor.title || doctor.title
      case 'ko': return doctor.title || doctor.title
      default: return doctor.title
    }
  }

  const getSpecialization = (doctor: any) => {
    switch (locale) {
      case 'zh': return doctor.specialization_zh || doctor.specialization
      case 'ja': return doctor.specialization_ja || doctor.specialization
      case 'ko': return doctor.specialization_ko || doctor.specialization
      default: return doctor.specialization
    }
  }

  const getBio = (doctor: any) => {
    switch (locale) {
      case 'zh': return doctor.bio_zh || doctor.bio
      case 'ja': return doctor.bio_ja || doctor.bio
      case 'ko': return doctor.bio_ko || doctor.bio
      default: return doctor.bio
    }
  }

  const formatLanguages = (languages: string[]) => {
    const langMap: Record<string, string> = {
      en: 'English', zh: '中文', ja: '日本語', ko: '한국어', fr: 'Français', de: 'Deutsch'
    }
    return languages?.map(l => langMap[l] || l).join(', ') || 'English'
  }

  const getHospitalName = (hospitalId: string) => {
    return HOSPITALS[hospitalId] || 'Hospital'
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
            <h1 className="text-xl font-bold text-blue-900">👨‍⚕️ {locale === 'zh' ? '医生' : locale === 'ja' ? '医師' : locale === 'ko' ? '의사' : 'Doctors'}</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/en/doctors"><Button variant="ghost" size="sm">EN</Button></Link>
            <Link href="/zh/doctors"><Button variant="ghost" size="sm">中文</Button></Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <Input 
            placeholder={locale === 'zh' ? '搜索医生姓名、专科...' : locale === 'ja' ? '医師名、診療科で検索...' : locale === 'ko' ? '의사명, 진료과 검색...' : 'Search doctors by name, specialty...'} 
            className="mb-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedSpecialty === 'All' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSpecialty('All')}
            >
              {locale === 'zh' ? '全部' : locale === 'ja' ? 'すべて' : locale === 'ko' ? '전체' : 'All'}
            </Button>
            <Button 
              variant={showOnlineOnly ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            >
              {locale === 'zh' ? '可预约' : locale === 'ja' ? '予約可能' : locale === 'ko' ? '예약 가능' : 'Available'}
            </Button>
            {SPECIALTIES.filter(s => s !== 'All').map(specialty => (
              <Button 
                key={specialty}
                variant={selectedSpecialty === specialty ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">{locale === 'zh' ? '加载中...' : locale === 'ja' ? '読み込み中...' : locale === 'ko' ? '로딩 중...' : 'Loading...'}</p>
          </div>
        )}

        {/* Doctor List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredDoctors.map((doctor: any) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                        👨‍⚕️
                      </div>
                      <div>
                        <CardTitle className="text-lg">{getDoctorName(doctor)}</CardTitle>
                        <p className="text-sm text-gray-500">{getDoctorTitle(doctor)}</p>
                        <p className="text-sm text-blue-600">{getSpecialization(doctor)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-600">⭐ {doctor.rating || 'N/A'}</div>
                      <div className="text-sm font-semibold">¥{doctor.consultation_fee || 'N/A'}</div>
                      {doctor.is_verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {locale === 'zh' ? '认证' : locale === 'ja' ? '認定' : locale === 'ko' ? '인증' : 'Verified'}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm mb-4">
                    <p><strong>{locale === 'zh' ? '医院' : locale === 'ja' ? '病院' : locale === 'ko' ? '병원' : 'Hospital'}:</strong> {getHospitalName(doctor.hospital_id)}</p>
                    <p><strong>{locale === 'zh' ? '经验' : locale === 'ja' ? '経験' : locale === 'ko' ? '경력' : 'Experience'}:</strong> {doctor.experience_years || 0} {locale === 'zh' ? '年' : locale === 'ja' ? '年' : locale === 'ko' ? '년' : 'years'}</p>
                    <p><strong>{locale === 'zh' ? '语言' : locale === 'ja' ? '言語' : locale === 'ko' ? '언어' : 'Languages'}:</strong> {formatLanguages(doctor.languages)}</p>
                    <p className="text-gray-600">{getBio(doctor)}</p>
                  </div>
                  <div className="flex gap-2">
                    {doctor.is_available_for_online ? (
                      <Link href={`/${locale}/appointments/new?doctor=${doctor.id}`}>
                        <Button size="sm">{locale === 'zh' ? '立即预约' : locale === 'ja' ? '今すぐ予約' : locale === 'ko' ? '지금 예약' : 'Book Now'}</Button>
                      </Link>
                    ) : (
                      <Button size="sm" disabled>{locale === 'zh' ? '暂不可预约' : locale === 'ja' ? '予約不可' : locale === 'ko' ? '예약 불가' : 'Not Available'}</Button>
                    )}
                    <Link href={`/${locale}/doctors/${doctor.id}`}>
                      <Button variant="outline" size="sm">{locale === 'zh' ? '查看资料' : locale === 'ja' ? 'プロフィール' : locale === 'ko' ? '프로필 보기' : 'View Profile'}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <p>{locale === 'zh' ? '未找到医生' : locale === 'ja' ? '医師が見つかりません' : locale === 'ko' ? '의사를 찾을 수 없습니다' : 'No doctors found'}</p>
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
        <Link href={`/${locale}/hospitals`} className="flex flex-col items-center text-xs">
          <span className="text-xl">🏥</span>
          <span>{locale === 'zh' ? '医院' : locale === 'ja' ? '病院' : locale === 'ko' ? '병원' : 'Hospitals'}</span>
        </Link>
        <Link href={`/${locale}/doctors`} className="flex flex-col items-center text-xs text-blue-600">
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
