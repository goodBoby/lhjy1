import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { db, type HospitalFilters } from '../db-queries'

const HOSPITALS_QUERY_KEY = 'hospitals'

export function useHospitals(filters: HospitalFilters = {}) {
  return useQuery({
    queryKey: [HOSPITALS_QUERY_KEY, filters],
    queryFn: () => db.getHospitals(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useHospital(id: string) {
  return useQuery({
    queryKey: [HOSPITALS_QUERY_KEY, id],
    queryFn: () => db.getHospitalById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useHospitalsByCity(city: string) {
  return useHospitals({ city })
}

export function useHospitalsBySpecialty(specialty: string) {
  return useHospitals({ specialty })
}

export function useInternationalHospitals() {
  return useHospitals({ hasInternationalDepartment: true })
}

export function useHospitalStatistics(hospitalId: string) {
  return useQuery({
    queryKey: ['hospital-statistics', hospitalId],
    queryFn: () => db.getHospitalStatistics(hospitalId),
    enabled: !!hospitalId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useInfiniteHospitals(filters: Omit<HospitalFilters, 'limit' | 'offset'> = {}) {
  const pageSize = 10

  return useInfiniteQuery({
    queryKey: ['infinite-hospitals', filters],
    queryFn: ({ pageParam = 0 }) =>
      db.getHospitals({ ...filters, limit: pageSize, offset: pageParam * pageSize }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < pageSize) return undefined
      return allPages.length
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSearchHospitals(query: string) {
  return useQuery({
    queryKey: ['search-hospitals', query],
    queryFn: () => db.searchHospitals(query),
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}