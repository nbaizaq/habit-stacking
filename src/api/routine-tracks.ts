import api from '@/utils/fetch'

export type RoutineTrack = {
  id: number
  routineId: number
  userId: number
  date: string
  startedAt: string
  endedAt: string | null
  createdAt: string
  updatedAt: string
}

export const createRoutineTrack = (routineTrack: {
  routineId: number
  date: string
}): Promise<RoutineTrack> => {
  return api
    .request<{ routineTrack: RoutineTrack }>('/routine-tracks', {
      method: 'POST',
      body: JSON.stringify(routineTrack),
    })
    .then((res) => res.result.routineTrack)
}

export const getRoutineTracks = (): Promise<RoutineTrack[]> => {
  return api
    .request<{ routineTracks: RoutineTrack[] }>('/routine-tracks')
    .then((res) => res.result.routineTracks)
}

export const endRoutineTrack = (routineTrack: { id: number }): Promise<RoutineTrack> => {
  return api
    .request<{ routineTrack: RoutineTrack }>('/routine-tracks', {
      method: 'PUT',
      body: JSON.stringify(routineTrack),
    })
    .then((res) => res.result.routineTrack)
}
