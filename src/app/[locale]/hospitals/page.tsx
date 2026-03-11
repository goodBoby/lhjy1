import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function HospitalsPage() {
  const hospitals = [
    {
      name: 'Peking Union Medical College Hospital',
      nameZh: '北京协和医院',
      specialty: 'Comprehensive',
      rating: 4.9,
      languages: ['English', 'Chinese'],
      address: 'No.1 Shuaifuyuan, Dongcheng District, Beijing',
      phone: '+86-10-69156114',
      imd: true,
    },
    {
      name: 'Ruijin Hospital',
      nameZh: '瑞金医院',
      specialty: 'General Surgery',
      rating: 4.8,
      languages: ['English', 'Chinese', 'Japanese'],
      address: 'No.197 Ruijin Er Road, Shanghai',
      phone: '+86-21-64370045',
      imd: true,
    },
    {
      name: 'First Affiliated Hospital of Sun Yat-sen University',
      nameZh: '中山大学附属第一医院',
      specialty: 'Cardiology',
      rating: 4.7,
      languages: ['English', 'Chinese'],
      address: 'No.58 Zhongshan Er Road, Guangzhou',
      phone: '+86-20-87755733',
      imd: true,
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
            <h1 className="text-xl font-bold text-blue-900">🏥 Hospitals</h1>
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
          <div className="flex gap-2">
            <Input placeholder="Search hospitals, cities, specialties..." className="flex-1" />
            <Button>Search</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">International Dept</Button>
          <Button variant="outline" size="sm">Beijing</Button>
          <Button variant="outline" size="sm">Shanghai</Button>
          <Button variant="outline" size="sm">Guangzhou</Button>
          <Button variant="outline" size="sm">Chengdu</Button>
        </div>

        {/* Hospital List */}
        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <p className="text-sm text-gray-500">{hospital.nameZh}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-600">⭐ {hospital.rating}</div>
                    {hospital.imd && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">IMD</span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Specialty:</strong> {hospital.specialty}</p>
                  <p><strong>Languages:</strong> {hospital.languages.join(', ')}</p>
                  <p><strong>Address:</strong> {hospital.address}</p>
                  <p><strong>Phone:</strong> {hospital.phone}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/en/hospitals/${index + 1}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                  <Link href={`/en/doctors?hospital=${index + 1}`}>
                    <Button variant="outline" size="sm">Book Doctor</Button>
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
        <Link href="/en/hospitals" className="flex flex-col items-center text-xs text-blue-600">
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
