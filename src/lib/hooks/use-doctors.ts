import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { db, type DoctorFilters } from '../db-queries'

const DOCTORS_QUERY_KEY = 'doctors'

export function useDoctors(filters: DoctorFilters = {}) {
  return useQuery({
    queryKey: [DOCTORS_QUERY_KEY, filters],
    queryFn: () => db.getDoctors(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDoctor(id: string) {
  return useQuery({
    queryKey: [DOCTORS_QUERY_KEY, id],
    queryFn: () => db.getDoctorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useDoctorsByHospital(hospitalId: string) {
  return useDoctors({ hospitalId })
}

export function useDoctorsBySpecialization(specialization: string) {
  return useDoctors({ specialization })
}

export function useOnlineDoctors() {
  return useDoctors({ isAvailableForOnline: true })
}

export function useDoctorAvailability(doctorId: string) {
  return useQuery({
    queryKey: ['doctor-availability', doctorId],
    queryFn: () => db.getDoctorAvailability(doctorId),
    enabled: !!doctorId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,
  })
}

export function useInfiniteDoctors(filters: Omit<DoctorFilters, 'limit' | 'offset'> = {}) {
  const pageSize = 10

  return useInfiniteQuery({
    queryKey: ['infinite-doctors', filters],
    queryFn: ({ pageParam = 0 }) =>
      db.getDoctors({ ...filters, limit: pageSize, offset: pageParam * pageSize }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < pageSize) return undefined
      return allPages.length
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSearchDoctors(query: string) {
  return useQuery({
    queryKey: ['search-doctors', query],
    queryFn: () => db.searchDoctors(query),
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: db.createAppointment,
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['appointments', variables.patientId] })
      queryClient.invalidateQueries({ queryKey: ['doctor-availability', variables.doctorId] })
      
      // Show success notification
      console.log('Appointment created successfully:', data)
    },
    onError: (error) => {
      console.error('Failed to create appointment:', error)
      // Show error notification
    },
  })
}