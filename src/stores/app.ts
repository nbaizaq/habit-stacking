import { defineStore } from 'pinia'
import { getRoutines, type Routine } from '@/api/routine'
import { getHabits, type Habit } from '@/api/habits'
import { getRoutinesHabits, type RoutinesHabitsItem } from '@/api/routines-habits'
import { getTracks, type Track } from '@/api/track'
import { getRoutineTracks, type RoutineTrack } from '@/api/routine-tracks'
import dayjs from 'dayjs'

interface AppState {
  selectedDate: string | null
  routines: Routine[]
  habits: Habit[]
  routinesHabits: RoutinesHabitsItem[]
  tracks: Track[]
  routineTracks: RoutineTrack[]
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    selectedDate: null,

    routines: [],
    habits: [],
    routinesHabits: [],
    tracks: [],
    routineTracks: [],
  }),
  getters: {
    getSelectedDate(): Date {
      if (this.selectedDate) {
        return new Date(this.selectedDate)
      }
      return new Date()
    },
    getRoutines(): Routine[] {
      return this.routines
    },
    getTemporaryRoutines(): Routine[] {
      return this.routines.filter((e) => e.temporary)
    },
    getDefaultRoutines(): Routine[] {
      return this.routines.filter((e) => !e.temporary)
    },
    getHabits(): Habit[] {
      return this.habits
    },
    getRoutinesHabits(): RoutinesHabitsItem[] {
      return this.routinesHabits
    },
    getTracks(): Track[] {
      return this.tracks
    },
    getRoutineTracks(): RoutineTrack[] {
      return this.routineTracks
    },
  },
  actions: {
    setSelectedDate(date: Date) {
      this.selectedDate = date.toDateString()
    },
    fetch() {
      return Promise.all([
        this.fetchRoutines(),
        this.fetchHabits(),
        this.fetchRoutinesHabits(),
        this.fetchTracks(),
        this.fetchRoutineTracks(),
      ])
    },
    fetchRoutines() {
      return getRoutines().then((data) => {
        this.routines = data
        return true
      })
    },
    fetchHabits() {
      return getHabits().then((data) => {
        this.habits = data
        return true
      })
    },
    fetchRoutinesHabits() {
      return getRoutinesHabits().then((data) => {
        this.routinesHabits = data
        return true
      })
    },
    fetchTracks() {
      let date
      if (this.selectedDate && !dayjs(this.selectedDate).isSame(dayjs(), 'day')) {
        date = new Date(this.selectedDate)
      }
      return getTracks(date).then((data) => {
        this.tracks = data
        return true
      })
    },
    fetchRoutineTracks() {
      return getRoutineTracks().then((data) => {
        this.routineTracks = data
        return true
      })
    },
  },
  persist: true,
})
