export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hospitals: {
        Row: {
          id: string
          name: string
          name_zh: string | null
          name_ja: string | null
          name_ko: string | null
          description: string | null
          description_zh: string | null
          description_ja: string | null
          description_ko: string | null
          address: Json
          coordinates: unknown | null
          phone: string | null
          email: string | null
          website: string | null
          rating: number | null
          review_count: number | null
          specialties: string[] | null
          languages_supported: string[] | null
          has_international_department: boolean | null
          opening_hours: Json
          images: string[] | null
          is_verified: boolean | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          name_zh?: string | null
          name_ja?: string | null
          name_ko?: string | null
          description?: string | null
          description_zh?: string | null
          description_ja?: string | null
          description_ko?: string | null
          address?: Json
          coordinates?: unknown | null
          phone?: string | null
          email?: string | null
          website?: string | null
          rating?: number | null
          review_count?: number | null
          specialties?: string[] | null
          languages_supported?: string[] | null
          has_international_department?: boolean | null
          opening_hours?: Json
          images?: string[] | null
          is_verified?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          name_zh?: string | null
          name_ja?: string | null
          name_ko?: string | null
          description?: string | null
          description_zh?: string | null
          description_ja?: string | null
          description_ko?: string | null
          address?: Json
          coordinates?: unknown | null
          phone?: string | null
          email?: string | null
          website?: string | null
          rating?: number | null
          review_count?: number | null
          specialties?: string[] | null
          languages_supported?: string[] | null
          has_international_department?: boolean | null
          opening_hours?: Json
          images?: string[] | null
          is_verified?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      doctors: {
        Row: {
          id: string
          hospital_id: string | null
          name: string
          name_zh: string | null
          name_ja: string | null
          name_ko: string | null
          title: string | null
          title_zh: string | null
          specialization: string
          specialization_zh: string | null
          specialization_ja: string | null
          specialization_ko: string | null
          experience_years: number | null
          education: string[] | null
          certifications: string[] | null
          languages: string[] | null
          bio: string | null
          bio_zh: string | null
          bio_ja: string | null
          bio_ko: string | null
          photo_url: string | null
          rating: number | null
          review_count: number | null
          consultation_fee: number | null
          is_available_for_online: boolean | null
          is_verified: boolean | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          hospital_id?: string | null
          name: string
          name_zh?: string | null
          name_ja?: string | null
          name_ko?: string | null
          title?: string | null
          title_zh?: string | null
          specialization: string
          specialization_zh?: string | null
          specialization_ja?: string | null
          specialization_ko?: string | null
          experience_years?: number | null
          education?: string[] | null
          certifications?: string[] | null
          languages?: string[] | null
          bio?: string | null
          bio_zh?: string | null
          bio_ja?: string | null
          bio_ko?: string | null
          photo_url?: string | null
          rating?: number | null
          review_count?: number | null
          consultation_fee?: number | null
          is_available_for_online?: boolean | null
          is_verified?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          hospital_id?: string | null
          name?: string
          name_zh?: string | null
          name_ja?: string | null
          name_ko?: string | null
          title?: string | null
          title_zh?: string | null
          specialization?: string
          specialization_zh?: string | null
          specialization_ja?: string | null
          specialization_ko?: string | null
          experience_years?: number | null
          education?: string[] | null
          certifications?: string[] | null
          languages?: string[] | null
          bio?: string | null
          bio_zh?: string | null
          bio_ja?: string | null
          bio_ko?: string | null
          photo_url?: string | null
          rating?: number | null
          review_count?: number | null
          consultation_fee?: number | null
          is_available_for_online?: boolean | null
          is_verified?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      doctor_availability: {
        Row: {
          id: string
          doctor_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          doctor_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          doctor_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_available?: boolean | null
          created_at?: string | null
        }
      }
      patients: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          date_of_birth: string | null
          gender: string | null
          nationality: string | null
          passport_number: string | null
          phone: string | null
          emergency_contact: Json
          medical_history: Json
          insurance_info: Json
          preferred_language: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          full_name: string
          date_of_birth?: string | null
          gender?: string | null
          nationality?: string | null
          passport_number?: string | null
          phone?: string | null
          emergency_contact?: Json
          medical_history?: Json
          insurance_info?: Json
          preferred_language?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          full_name?: string
          date_of_birth?: string | null
          gender?: string | null
          nationality?: string | null
          passport_number?: string | null
          phone?: string | null
          emergency_contact?: Json
          medical_history?: Json
          insurance_info?: Json
          preferred_language?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string | null
          doctor_id: string | null
          hospital_id: string | null
          appointment_time: string
          duration_minutes: number | null
          status: string | null
          consultation_type: string | null
          symptoms: string | null
          notes: string | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          hospital_id?: string | null
          appointment_time: string
          duration_minutes?: number | null
          status?: string | null
          consultation_type?: string | null
          symptoms?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          hospital_id?: string | null
          appointment_time?: string
          duration_minutes?: number | null
          status?: string | null
          consultation_type?: string | null
          symptoms?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      translation_requests: {
        Row: {
          id: string
          patient_id: string | null
          appointment_id: string | null
          request_type: string
          source_language: string
          target_language: string
          content: string
          status: string | null
          estimated_duration: number | null
          price: number | null
          assigned_translator_id: string | null
          completed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          appointment_id?: string | null
          request_type: string
          source_language: string
          target_language: string
          content: string
          status?: string | null
          estimated_duration?: number | null
          price?: number | null
          assigned_translator_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          appointment_id?: string | null
          request_type?: string
          source_language?: string
          target_language?: string
          content?: string
          status?: string | null
          estimated_duration?: number | null
          price?: number | null
          assigned_translator_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          appointment_id: string | null
          patient_id: string | null
          amount: number
          currency: string | null
          status: string | null
          payment_method: string | null
          transaction_id: string | null
          paid_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          appointment_id?: string | null
          patient_id?: string | null
          amount: number
          currency?: string | null
          status?: string | null
          payment_method?: string | null
          transaction_id?: string | null
          paid_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          appointment_id?: string | null
          patient_id?: string | null
          amount?: number
          currency?: string | null
          status?: string | null
          payment_method?: string | null
          transaction_id?: string | null
          paid_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string | null
          doctor_id: string | null
          appointment_id: string | null
          record_type: string
          content: Json
          attachments: string[] | null
          is_confidential: boolean | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          appointment_id?: string | null
          record_type: string
          content: Json
          attachments?: string[] | null
          is_confidential?: boolean | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          appointment_id?: string | null
          record_type?: string
          content?: Json
          attachments?: string[] | null
          is_confidential?: boolean | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          patient_id: string | null
          doctor_id: string | null
          hospital_id: string | null
          rating: number
          comment: string | null
          is_anonymous: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          hospital_id?: string | null
          rating: number
          comment?: string | null
          is_anonymous?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          hospital_id?: string | null
          rating?: number
          comment?: string | null
          is_anonymous?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          table_name: string
          record_id: string
          action: string
          old_data: Json | null
          new_data: Json | null
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          table_name: string
          record_id: string
          action: string
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          table_name?: string
          record_id?: string
          action?: string
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string | null
        }
      }
    }
    Enums: {
      appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
      consultation_type: 'in_person' | 'video' | 'phone'
      translation_type: 'interpretation' | 'document'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
    }
  }
}