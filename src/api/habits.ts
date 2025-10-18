import api from '@/utils/fetch'

export type Habit = {
  id: number
  name: string
  userId: number
  createdAt: string
  updatedAt: string
}

export function getHabits(): Promise<Habit[]> {
  return api.request<{ habits: Habit[] }>('/habits').then((res) => res.result.habits)
}

export function createHabit(habit: Habit): Promise<Habit> {
  return api
    .request<{ habit: Habit }>('/habits', {
      method: 'POST',
      body: JSON.stringify(habit),
    })
    .then((res) => res.result.habit)
}

export function updateHabit(habit: Habit): Promise<Habit> {
  return api
    .request<{ habit: Habit }>('/habits', {
      method: 'PUT',
      body: JSON.stringify(habit),
    })
    .then((res) => res.result.habit)
}

export function deleteHabit(habitId: number): Promise<boolean> {
  return api
    .request<boolean>('/habits/' + habitId, {
      method: 'DELETE',
    })
    .then((res) => res.ok)
}
