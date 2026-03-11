import { createClient } from './supabase'
import type { Database } from '../../types/supabase'

type Hospital = Database['public']['Tables']['hospitals']['Row']
type Doctor = Database['public']['Tables']['doctors']['Row']
type DoctorAvailability = Database['public']['Tables']['doctor_availability']['Row']
type Appointment = Database['public']['Tables']['appointments']['Row']

export interface HospitalFilters {
  city?: string
  specialty?: string
  language?: string
  hasInternationalDepartment?: boolean
  minRating?: number
  limit?: number
  offset?: number
}

export interface DoctorFilters {
  hospitalId?: string
  specialization?: string
  language?: string
  isAvailableForOnline?: boolean
  minRating?: number
  minExperience?: number
  maxFee?: number
  limit?: number
  offset?: number
}

export interface AppointmentData {
  patientId: string
  doctorId: string
  hospitalId: string
  appointmentTime: string
  durationMinutes?: number
  consultationType?: 'in_person' | 'video' | 'phone'
  symptoms?: string
  notes?: string
}

class DatabaseQueries {
  private supabase = createClient()

  // Hospital Queries
  async getHospitals(filters: HospitalFilters = {}): Promise<Hospital[]> {
    let query = this.supabase
      .from('hospitals')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })

    if (filters.city) {
      query = query.ilike('address->>city', `%${filters.city}%`)
    }

    if (filters.specialty) {
      query = query.contains('specialties', [filters.specialty])
    }

    if (filters.language) {
      query = query.contains('languages_supported', [filters.language])
    }

    if (filters.hasInternationalDepartment) {
      query = query.eq('has_international_department', true)
    }

    if (filters.minRating) {
      query = query.gte('rating', filters.minRating)
    }

    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching hospitals:', error)
      throw error
    }

    return data || []
  }

  async getHospitalById(id: string): Promise<Hospital | null> {
    const { data, error } = await this.supabase
      .from('hospitals')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching hospital:', error)
      return null
    }

    return data
  }

  async getHospitalsBySpecialty(specialty: string): Promise<Hospital[]> {
    return this.getHospitals({ specialty })
  }

  async getHospitalsByCity(city: string): Promise<Hospital[]> {
    return this.getHospitals({ city })
  }

  // Doctor Queries
  async getDoctors(filters: DoctorFilters = {}): Promise<Doctor[]> {
    let query = this.supabase
      .from('doctors')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })

    if (filters.hospitalId) {
      query = query.eq('hospital_id', filters.hospitalId)
    }

    if (filters.specialization) {
      query = query.eq('specialization', filters.specialization)
    }

    if (filters.language) {
      query = query.contains('languages', [filters.language])
    }

    if (filters.isAvailableForOnline !== undefined) {
      query = query.eq('is_available_for_online', filters.isAvailableForOnline)
    }

    if (filters.minRating) {
      query = query.gte('rating', filters.minRating)
    }

    if (filters.minExperience) {
      query = query.gte('experience_years', filters.minExperience)
    }

    if (filters.maxFee) {
      query = query.lte('consultation_fee', filters.maxFee)
    }

    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching doctors:', error)
      throw error
    }

    return data || []
  }

  async getDoctorById(id: string): Promise<Doctor | null> {
    const { data, error } = await this.supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching doctor:', error)
      return null
    }

    return data
  }

  async getDoctorsByHospital(hospitalId: string): Promise<Doctor[]> {
    return this.getDoctors({ hospitalId })
  }

  async getDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    return this.getDoctors({ specialization })
  }

  // Doctor Availability Queries
  async getDoctorAvailability(doctorId: string): Promise<DoctorAvailability[]> {
    const { data, error } = await this.supabase
      .from('doctor_availability')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('is_available', true)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Error fetching doctor availability:', error)
      throw error
    }

    return data || []
  }

  async isDoctorAvailable(doctorId: string, dayOfWeek: number, time: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('doctor_availability')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('day_of_week', dayOfWeek)
      .eq('is_available', true)
      .lte('start_time', time)
      .gte('end_time', time)
      .single()

    if (error) {
      return false
    }

    return !!data
  }

  // Appointment Queries
  async createAppointment(appointmentData: AppointmentData): Promise<Appointment | null> {
    // Check if doctor is available at the requested time
    const appointmentTime = new Date(appointmentData.appointmentTime)
    const dayOfWeek = appointmentTime.getDay() // 0 = Sunday, 6 = Saturday
    const timeString = appointmentTime.toTimeString().slice(0, 8) // HH:MM:SS

    const isAvailable = await this.isDoctorAvailable(
      appointmentData.doctorId,
      dayOfWeek,
      timeString
    )

    if (!isAvailable) {
      throw new Error('Doctor is not available at the requested time')
    }

    // Check for existing appointment at the same time
    const { data: existingAppointments } = await this.supabase
      .from('appointments')
      .select('*')
      .eq('doctor_id', appointmentData.doctorId)
      .eq('appointment_time', appointmentData.appointmentTime)
      .in('status', ['pending', 'confirmed'])

    if (existingAppointments && existingAppointments.length > 0) {
      throw new Error('Time slot is already booked')
    }

    const { data, error } = await this.supabase
      .from('appointments')
      .insert({
        patient_id: appointmentData.patientId,
        doctor_id: appointmentData.doctorId,
        hospital_id: appointmentData.hospitalId,
        appointment_time: appointmentData.appointmentTime,
        duration_minutes: appointmentData.durationMinutes || 30,
        status: 'pending',
        consultation_type: appointmentData.consultationType || 'in_person',
        symptoms: appointmentData.symptoms,
        notes: appointmentData.notes,
        created_by: appointmentData.patientId,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating appointment:', error)
      throw error
    }

    return data
  }

  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .order('appointment_time', { ascending: false })

    if (error) {
      console.error('Error fetching appointments:', error)
      throw error
    }

    return data || []
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching appointment:', error)
      return null
    }

    return data
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | null> {
    const { data, error } = await this.supabase
      .from('appointments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating appointment:', error)
      throw error
    }

    return data
  }

  async cancelAppointment(id: string): Promise<Appointment | null> {
    return this.updateAppointmentStatus(id, 'cancelled')
  }

  // Search Queries
  async searchHospitals(query: string): Promise<Hospital[]> {
    const { data, error } = await this.supabase
      .from('hospitals')
      .select('*')
      .or(`name.ilike.%${query}%,name_zh.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_active', true)
      .limit(10)

    if (error) {
      console.error('Error searching hospitals:', error)
      throw error
    }

    return data || []
  }

  async searchDoctors(query: string): Promise<Doctor[]> {
    const { data, error } = await this.supabase
      .from('doctors')
      .select('*')
      .or(`name.ilike.%${query}%,name_zh.ilike.%${query}%,specialization.ilike.%${query}%`)
      .eq('is_active', true)
      .limit(10)

    if (error) {
      console.error('Error searching doctors:', error)
      throw error
    }

    return data || []
  }

  // Statistics Queries
  async getHospitalStatistics(hospitalId: string) {
    const { data: doctors, error: doctorsError } = await this.supabase
      .from('doctors')
      .select('id, specialization, rating')
      .eq('hospital_id', hospitalId)
      .eq('is_active', true)

    const { data: appointments, error: appointmentsError } = await this.supabase
      .from('appointments')
      .select('status')
      .eq('hospital_id', hospitalId)
      .gte('appointment_time', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    if (doctorsError || appointmentsError) {
      console.error('Error fetching statistics:', doctorsError || appointmentsError)
      throw doctorsError || appointmentsError
    }

    const specializations = [...new Set(doctors.map((d: Doctor) => d.specialization))]
    const avgRating = doctors.reduce((sum: number, d: Doctor) => sum + (d.rating || 0), 0) / doctors.length

    const appointmentStats = appointments.reduce(
      (acc: Record<string, number>, a: any) => {
        acc[a.status || 'unknown'] = (acc[a.status || 'unknown'] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return {
      doctorCount: doctors.length,
      specializations,
      averageRating: avgRating.toFixed(1),
      appointmentStats,
    }
  }
}

export const db = new DatabaseQueries()