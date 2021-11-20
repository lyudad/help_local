import { create } from 'apisauce'
import { BASE_API_URL } from 'constants/config'
import { store } from 'store'

export const api = create({
  baseURL: BASE_API_URL,
  timeout: 4000,
  headers: {
    Accept: 'application/json',
  },
})

api.addRequestTransform((request) => {
  const token = store.getState().user.accessToken
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
})
