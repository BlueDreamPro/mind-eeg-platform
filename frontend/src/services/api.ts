// API service layer — reserved for future FastAPI backend integration.
// Switch from mock data to real API calls by changing the USE_MOCK flag.

const USE_MOCK = true
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function apiGet<T>(endpoint: string): Promise<T> {
  if (USE_MOCK) {
    throw new Error(`Mock mode: GET ${endpoint} — implement real API call or use mock data directly.`)
  }
  const res = await fetch(`${BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`)
  return res.json()
}

export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  if (USE_MOCK) {
    throw new Error(`Mock mode: POST ${endpoint} — implement real API call or use mock data directly.`)
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${endpoint} failed: ${res.status}`)
  return res.json()
}
