import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 'APT001',
      doctor: 'Dr. Wang Lei',
      hospital: 'Peking Union Medical College Hospital',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'in_person',
    },
    {
      id: 'APT002',
      doctor: 'Dr. Li Xiaoming',
      hospital: 'Ruijin Hospital',
      date: '2024-03-20',
      time: '2:30 PM',
      status: 'pending',
      type: 'video',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/en">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-900">📅 Appointments</h1>
          </div>
          <Link href="/en/appointments/new">
            <Button size="sm">+ New Booking</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button>Upcoming (2)</Button>
          <Button variant="outline">Past</Button>
          <Button variant="outline">Cancelled</Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((apt, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{apt.doctor}</CardTitle>
                    <p className="text-sm text-gray-500">{apt.hospital}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                    {apt.status.toUpperCase()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm mb-4">
                  <p><strong>Date:</strong> {apt.date}</p>
                  <p><strong>Time:</strong> {apt.time}</p>
                  <p><strong>Type:</strong> {apt.type === 'in_person' ? 'In Person' : 'Video Consultation'}</p>
                  <p><strong>ID:</strong> {apt.id}</p>
                </div>
                <div className="flex gap-2">
                  {apt.type === 'video' && apt.status === 'confirmed' && (
                    <Button size="sm">Join Video Call</Button>
                  )}
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">No Appointments</h3>
            <p className="text-gray-500 mb-4">You haven't booked any appointments yet.</p>
            <Link href="/en/hospitals">
              <Button>Book Now</Button>
            </Link>
          </div>
        )}
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
