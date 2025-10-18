import api from '@/utils/fetch'

export type RoutinesHabitsItem = {
  id: number
  routineId: number
  habitId: number
  userId: number
  frequency: string
  frequencyValue: string
  period: string
}

export const createRoutineHabit = (
  routineHabit: RoutinesHabitsItem,
): Promise<RoutinesHabitsItem> => {
  return api
    .request<{ routineHabit: RoutinesHabitsItem }>('/routines-habits', {
      method: 'POST',
      body: JSON.stringify(routineHabit),
    })
    .then((res) => res.result.routineHabit)
}

export const getRoutinesHabits = (): Promise<RoutinesHabitsItem[]> => {
  return api
    .request<{ routinesHabits: RoutinesHabitsItem[] }>('/routines-habits')
    .then((res) => res.result.routinesHabits)
}

export const deleteRoutineHabit = (routineHabitId: number): Promise<boolean> => {
  return api
    .request<boolean>('/routines-habits/' + routineHabitId, {
      method: 'DELETE',
    })
    .then((res) => res.ok)
}
