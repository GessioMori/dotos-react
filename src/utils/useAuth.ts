import { api } from '../libs/axios'

export async function useAuth() {
  try {
    await api.post('/account/refresh')
    return true
  } catch {
    return false
  }
}
