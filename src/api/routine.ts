import api from '@/utils/fetch'

export type Routine = {
  id: number
  name: string
  temporary: number
  startTime: string
  endTime: string
  userId: number
  createdAt: string
  updatedAt: string
}

export function getRoutines(): Promise<Routine[]> {
  return api.request<{ routines: Routine[] }>('/routines').then((res) => res.result.routines)
}

export function updateRoutine(routine: Routine): Promise<Routine> {
  return api
    .request<{ routine: Routine }>('/routines', {
      method: 'PUT',
      body: JSON.stringify(routine),
    })
    .then((res) => res.result.routine)
}

export function deleteRoutine(routineId: number): Promise<boolean> {
  return api
    .request<boolean>('/routines/' + routineId, {
      method: 'DELETE',
    })
    .then((res) => res.ok)
}

export function createRoutine(routine: Routine): Promise<Routine> {
  return api
    .request<{ routine: Routine }>('/routines', {
      method: 'POST',
      body: JSON.stringify(routine),
    })
    .then((res) => res.result.routine)
}
