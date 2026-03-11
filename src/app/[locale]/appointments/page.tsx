'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock appointments data for MVP
const mockAppointments = [
  {
    id: 'apt-001',
    doctor_name: 'Dr. Zhang Wei',
    doctor_name_zh: '张伟医生',
    hospital_name: 'Beijing United Family Hospital',
    hospital_name_zh: '北京和睦家医院',
    appointment_time: '2024-03-15T10:00:00',
    status: 'confirmed',
    consultation_type: 'in_person',
    symptoms: 'Regular checkup',
  },
  {
    id: 'apt-002',
    doctor_name: 'Dr. Li Na',
    doctor_name_zh: '李娜医生',
    hospital_name: 'Beijing United Family Hospital',
    hospital_name_zh: '北京和睦家医院',
    appointment_time: '2024-03-20T14:30:00',
    status: 'pending',
    consultation_type: 'video',
    symptoms: 'Pediatric consultation',
  },
]

const TABS = ['upcoming', 'past', 'cancelled']

export default function AppointmentsPage() {
  const params = useParams()
  const locale = (params.locale as string) || 'en'
  
  const [activeTab, setActiveTab] = useState('upcoming')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return locale === 'zh' ? '已确认' : locale === 'ja' ? '確認済み' : locale === 'ko' ? '확정' : 'Confirmed'
      case 'pending': return locale === 'zh' ? '待确认' : locale === 'ja' ? '保留中' : locale === 'ko' ? '대기중' : 'Pending'
      case 'completed': return locale === 'zh' ? '已完成' : locale === 'ja' ? '完了' : locale === 'ko' ? '완료' : 'Completed'
      case 'cancelled': return locale === 'zh' ? '已取消' : locale === 'ja' ? 'キャンセル' : locale === 'ko' ? '취소됨' : 'Cancelled'
      default: return status
    }
  }

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr)
    const dateStr = date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    const timeStr = date.toLocaleTimeString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'ko' ? 'ko-KR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return { date: dateStr, time: timeStr }
  }

  const getConsultationTypeLabel = (type: string) => {
    switch (type) {
      case 'in_person': return locale === 'zh' ? '现场就诊' : locale === 'ja' ? '来院' : locale === 'ko' ? '방문 진료' : 'In Person'
      case 'video': return locale === 'zh' ? '视频问诊' : locale === 'ja' ? 'ビデオ通話' : locale === 'ko' ? '비디오 진료' : 'Video Consultation'
      case 'phone': return locale === 'zh' ? '电话问诊' : locale === 'ja' ? '電話相談' : locale === 'ko' ? '전화 진료' : 'Phone Consultation'
      default: return type
    }
  }

  const filterAppointments = (status: string) => {
    // For MVP, just show all appointments in different tabs
    return mockAppointments
  }

  const displayedAppointments = activeTab === 'upcoming' 
    ? mockAppointments.filter(a => ['pending', 'confirmed'].includes(a.status))
    : activeTab === 'past'
    ? mockAppointments.filter(a => a.status === 'completed')
    : mockAppointments.filter(a => a.status === 'cancelled')

  const getDoctorName = (apt: any) => {
    return locale === 'zh' ? apt.doctor_name_zh || apt.doctor_name : apt.doctor_name
  }

  const getHospitalName = (apt: any) => {
    return locale === 'zh' ? apt.hospital_name_zh || apt.hospital_name : apt.hospital_name
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
            <h1 className="text-xl font-bold text-blue-900">📅 {locale === 'zh' ? '预约' : locale === 'ja' ? '予約' : locale === 'ko' ? '예약' : 'Appointments'}</h1>
          </div>
          <Link href={`/${locale}/doctors`}>
            <Button size="sm">+ {locale === 'zh' ? '新建预约' : locale === 'ja' ? '新規予約' : locale === 'ko' ? '새 예약' : 'New Booking'}</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(tab => (
            <Button 
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'upcoming' && (locale === 'zh' ? '即将到来' : locale === 'ja' ? '予定' : locale === 'ko' ? '예정' : 'Upcoming')}
              {tab === 'past' && (locale === 'zh' ? '历史记录' : locale === 'ja' ? '過去' : locale === 'ko' ? '과거' : 'Past')}
              {tab === 'cancelled' && (locale === 'zh' ? '已取消' : locale === 'ja' ? 'キャンセル' : locale === 'ko' ? '취소됨' : 'Cancelled')}
              {' (' + (tab === 'upcoming' ? 2 : tab === 'past' ? 0 : 0) + ')'}
            </Button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {displayedAppointments.map((apt: any) => {
            const { date, time } = formatDateTime(apt.appointment_time)
            return (
              <Card key={apt.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{getDoctorName(apt)}</CardTitle>
                      <p className="text-sm text-gray-500">{getHospitalName(apt)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm mb-4">
                    <p><strong>{locale === 'zh' ? '日期' : locale === 'ja' ? '日付' : locale === 'ko' ? '날짜' : 'Date'}:</strong> {date}</p>
                    <p><strong>{locale === 'zh' ? '时间' : locale === 'ja' ? '時間' : locale === 'ko' ? '시간' : 'Time'}:</strong> {time}</p>
                    <p><strong>{locale === 'zh' ? '类型' : locale === 'ja' ? '種類' : locale === 'ko' ? '유형' : 'Type'}:</strong> {getConsultationTypeLabel(apt.consultation_type)}</p>
                    {apt.symptoms && <p><strong>{locale === 'zh' ? '症状' : locale === 'ja' ? '症状' : locale === 'ko' ? '증상' : 'Symptoms'}:</strong> {apt.symptoms}</p>}
                    <p><strong>ID:</strong> {apt.id}</p>
                  </div>
                  <div className="flex gap-2">
                    {apt.consultation_type === 'video' && apt.status === 'confirmed' && (
                      <Button size="sm">{locale === 'zh' ? '加入视频' : locale === 'ja' ? 'ビデオ参加' : locale === 'ko' ? '비디오 참여' : 'Join Video'}</Button>
                    )}
                    {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                      <>
                        <Button variant="outline" size="sm">{locale === 'zh' ? '改期' : locale === 'ja' ? '日程変更' : locale === 'ko' ? '일정 변경' : 'Reschedule'}</Button>
                        <Button variant="outline" size="sm">{locale === 'zh' ? '取消' : locale === 'ja' ? 'キャンセル' : locale === 'ko' ? '취소' : 'Cancel'}</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {displayedAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">
              {locale === 'zh' ? '暂无预约' : locale === 'ja' ? '予約がありません' : locale === 'ko' ? '예약이 없습니다' : 'No Appointments'}
            </h3>
            <p className="text-gray-500 mb-4">
              {locale === 'zh' ? '您还没有预约。' : locale === 'ja' ? 'まだ予約していません。' : locale === 'ko' ? '아직 예약이 없습니다.' : "You haven't booked any appointments yet."}
            </p>
            <Link href={`/${locale}/hospitals`}>
              <Button>{locale === 'zh' ? '立即预约' : locale === 'ja' ? '今すぐ予約' : locale === 'ko' ? '지금 예약' : 'Book Now'}</Button>
            </Link>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 px-4 md:hidden">
        <Link href={`/${locale}`} className="flex flex-col items-center text-xs">
          <span className="text-xl">🏠</span>
          <span>{locale === 'zh' ? '首页' : locale === 'ja' ? 'ホーム' : locale === 'ko' ? '홈' : 'Home'}</span>
        </Link>
        <Link href={`/${locale}/hospitals`} className="flex flex-col items-center text-xs">
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
