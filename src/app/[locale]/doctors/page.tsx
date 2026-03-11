import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DoctorsPage() {
  const doctors = [
    {
      name: 'Dr. Wang Lei',
      nameZh: '王磊医生',
      specialty: 'Cardiology',
      specialtyZh: '心脏科',
      hospital: 'Peking Union Medical College Hospital',
      hospitalZh: '北京协和医院',
      experience: '15 years',
      languages: ['English', 'Chinese'],
      rating: 4.9,
      price: 500,
      available: true,
    },
    {
      name: 'Dr. Li Xiaoming',
      nameZh: '李晓明医生',
      specialty: 'Orthopedics',
      specialtyZh: '骨科',
      hospital: 'Ruijin Hospital',
      hospitalZh: '瑞金医院',
      experience: '20 years',
      languages: ['English', 'Chinese', 'Japanese'],
      rating: 4.8,
      price: 400,
      available: true,
    },
    {
      name: 'Dr. Zhang Wei',
      nameZh: '张伟医生',
      specialty: 'Neurology',
      specialtyZh: '神经科',
      hospital: 'First Affiliated Hospital of Sun Yat-sen University',
      hospitalZh: '中山大学附属第一医院',
      experience: '12 years',
      languages: ['English', 'Chinese'],
      rating: 4.7,
      price: 450,
      available: false,
    },
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
            <h1 className="text-xl font-bold text-blue-900">👨‍⚕️ Doctors</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/en"><Button variant="ghost" size="sm">EN</Button></Link>
            <Link href="/zh"><Button variant="ghost" size="sm">中文</Button></Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <Input placeholder="Search doctors by name, specialty..." className="mb-3" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Cardiology</Button>
            <Button variant="outline" size="sm">Orthopedics</Button>
            <Button variant="outline" size="sm">Neurology</Button>
            <Button variant="outline" size="sm">Pediatrics</Button>
          </div>
        </div>

        {/* Doctor List */}
        <div className="space-y-4">
          {doctors.map((doctor, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                      👨‍⚕️
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-gray-500">{doctor.nameZh}</p>
                      <p className="text-sm text-blue-600">{doctor.specialty} • {doctor.specialtyZh}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-600">⭐ {doctor.rating}</div>
                    <div className="text-sm font-semibold">¥{doctor.price}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm mb-4">
                  <p><strong>Hospital:</strong> {doctor.hospital}</p>
                  <p><strong>Experience:</strong> {doctor.experience}</p>
                  <p><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  {doctor.available ? (
                    <Link href={`/en/appointments/new?doctor=${index + 1}`}>
                      <Button size="sm">Book Now</Button>
                    </Link>
                  ) : (
                    <Button size="sm" disabled>Not Available</Button>
                  )}
                  <Link href={`/en/doctors/${index + 1}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
        <Link href="/en/doctors" className="flex flex-col items-center text-xs text-blue-600">
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
