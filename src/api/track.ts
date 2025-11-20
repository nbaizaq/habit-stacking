import api from '@/utils/fetch'

export type Track = {
  id: number
  routineHabitId: number
  userId: number
  date: string
  status: 'completed' | 'skipped' | null
  routineTrackId?: number
  createdAt: string
  updatedAt: string
}

export function getTracks(date?: string): Promise<Track[]> {
  return api
    .request<{ tracks: Track[] }>('/tracks' + (date ? '?date=' + date : ''))
    .then((res) => res.result.tracks)
}

export function createTrack(track: {
  id?: number
  routineHabitId: number
  date: string
  status: 'completed' | 'skipped' | null
  routineTrackId?: number
}): Promise<Track> {
  return api
    .request<{ track: Track }>('/tracks', {
      method: 'POST',
      body: JSON.stringify(track),
    })
    .then((res) => res.result.track)
}
