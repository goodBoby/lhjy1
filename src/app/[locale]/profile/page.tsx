import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/en">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-900">👤 Profile</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* User Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-xl font-bold">Guest User</h2>
                <p className="text-gray-500">guest@chinamediguide.com</p>
                <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Your name" className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="+86 xxx xxxx xxxx" className="mt-1" />
              </div>
              <div>
                <Label>Nationality</Label>
                <Input placeholder="Your country" className="mt-1" />
              </div>
              <div>
                <Label>Passport Number</Label>
                <Input placeholder="Passport number" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Allergies</Label>
                <Input placeholder="List any allergies" className="mt-1" />
              </div>
              <div>
                <Label>Current Medications</Label>
                <Input placeholder="List current medications" className="mt-1" />
              </div>
              <div>
                <Label>Emergency Contact</Label>
                <Input placeholder="Emergency contact name & phone" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Insurance Provider</Label>
                <Input placeholder="Insurance company" className="mt-1" />
              </div>
              <div>
                <Label>Policy Number</Label>
                <Input placeholder="Policy number" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full mb-6">Save Changes</Button>

        {/* Menu */}
        <Card>
          <CardContent className="p-0">
            <Link href="/en/appointments" className="block p-4 border-b hover:bg-gray-50">
              📅 My Appointments
            </Link>
            <Link href="/en/medical-records" className="block p-4 border-b hover:bg-gray-50">
              📋 Medical Records
            </Link>
            <Link href="/en/payment" className="block p-4 border-b hover:bg-gray-50">
              💳 Payment Methods
            </Link>
            <Link href="/en/settings" className="block p-4 border-b hover:bg-gray-50">
              ⚙️ Settings
            </Link>
            <Link href="/" className="block p-4 text-red-600 hover:bg-red-50">
              🚪 Logout
            </Link>
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
        <Link href="/en/profile" className="flex flex-col items-center text-xs text-blue-600">
          <span className="text-xl">👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}
