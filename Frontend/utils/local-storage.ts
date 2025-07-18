import { STORAGE_KEYS } from '@/constants/storage-keys'

export const storage = {
  get: (key: keyof typeof STORAGE_KEYS) => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEYS[key])
  },
  set: (key: keyof typeof STORAGE_KEYS, value: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS[key], value)
  },
  remove: (key: keyof typeof STORAGE_KEYS) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS[key])
  },
  getBool: (key: keyof typeof STORAGE_KEYS) => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(STORAGE_KEYS[key]) === "true"
  },
  setBool: (key: keyof typeof STORAGE_KEYS, value: boolean) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS[key], value ? "true" : "false")
  }
}