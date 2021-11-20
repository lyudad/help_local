/* eslint-disable */
import { api } from './api'
import { keysToSnake } from 'utils/keys-to-snake'
import { keysToCamel } from 'utils/keys-to-camel'
import { CLIENT_ERROR, SERVER_ERROR } from 'apisauce'
import { translate } from 'i18n'

export const analyze = (data) => {
  if (data.status === 'ok') {
    return data.data ? keysToCamel(data.data) : null
  } else {
    //console.log(data)
    data = keysToCamel(data)
    if (data.errorDescription.includes('promo')) return data.errorDescription
    if (
      data.errorDescription.includes('failed to match reset password session')
    )
      return translate('passwordResetScreen.wrongCode')
    if (
      data.errorLocalizedMessage.includes('Internal') &&
      data.errorDescription.length
    )
      return data.errorDescription
    if (data.errorLocalizedMessage) return data.errorLocalizedMessage
    if (data.errorDescription) return data.errorDescription
    return 'Server returned error status without any error description'
  }
}

/**
 * We need to wrap calling methods of the apisauce with try/catch
 * to catch connection timeout error.  NOTE, NOT request timeout.
 * CONNECTION and request time outs are different!
 */
export const post = async <T = any>(url: string, data = {}): Promise<T> => {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await api.post(url, keysToSnake(data))
      //console.log('post----->', res.data)
      if (res.ok) {
        reslove(analyze(res.data))
      } else if (res.problem === CLIENT_ERROR || res.problem === SERVER_ERROR) {
        reject(analyze(res.data))
      } else {
        reject(translate('common.requestError'))
      }
    } catch (errorObject) {
      // this cathes only connection time out error, NOT request time out
      reject(translate('common.couldntConnect'))
    }
  })
}

/**
 * We need to wrap calling methods of the apisauce with try/catch
 * to catch connection timeout error.  NOTE, NOT request timeout.
 * CONNECTION and request time outs are different!
 */
export const put = async <T = any>(url: string, data = {}): Promise<T> => {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await api.put(url, keysToSnake(data))
      if (res.ok) reslove(analyze(res.data))
      else if (res.problem === CLIENT_ERROR || res.problem === SERVER_ERROR) {
        reject(analyze(res.data))
      } else {
        reject(translate('common.requestError'))
      }
    } catch (errorObject) {
      // this cathes only connection time out error, NOT request time out
      reject(translate('common.couldntConnect'))
    }
  })
}

export const get = async <T = any>(url: string, data = {}): Promise<T> => {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await api.get(url, keysToSnake(data))
      //console.log(res.data)
      if (res.ok) reslove(analyze(res.data))
      else if (res.problem === CLIENT_ERROR || res.problem === SERVER_ERROR) {
        reject(analyze(res.data))
      } else {
        reject(translate('common.requestError'))
      }
    } catch (errorObject) {
      // this cathes only connection time out error, NOT request time out
      reject(translate('common.couldntConnect'))
    }
  })
}

export const patch = async <T = any>(url: string, data = {}): Promise<T> => {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await api.patch(url, keysToSnake(data))
      //console.log('patch----->', res.data)
      if (res.ok) reslove(analyze(res.data))
      else if (res.problem === CLIENT_ERROR || res.problem === SERVER_ERROR) {
        reject(analyze(res.data))
      } else {
        reject(translate('common.requestError'))
      }
    } catch (errorObject) {
      // this cathes only connection time out error, NOT request time out
      reject(translate('common.couldntConnect'))
    }
  })
}

export const del = async <T = any>(url: string, data = {}): Promise<T> => {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await api.delete(url, {}, { data: { ...keysToSnake(data) } })
      if (res.ok) reslove(analyze(res.data))
      else if (res.problem === CLIENT_ERROR || res.problem === SERVER_ERROR) {
        reject(analyze(res.data))
      } else {
        reject(translate('common.requestError'))
      }
    } catch (errorObject) {
      // this cathes only connection time out error, NOT request time out
      reject(translate('common.couldntConnect'))
    }
  })
}
