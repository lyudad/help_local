import { create } from 'apisauce'
import { store } from 'store'

const uploadUrl = 'http://192.241.190.121/cm/v1/'

export const uploadApi = create({
  baseURL: uploadUrl,
  timeout: 4000,
  headers: {
    Accept: 'multipart/form-data',
  },
})

uploadApi.addRequestTransform((request) => {
  const token = store.getState().user.accessToken
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
})
