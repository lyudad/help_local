/* eslint-disable */
import { uploadApi } from './uploadApi'
import { keysToCamel } from 'utils/keys-to-camel'
import { CLIENT_ERROR, SERVER_ERROR } from 'apisauce'
import { translate } from 'i18n'

const analyze = (data) => {
  if (data.status === 'ok') {
    return keysToCamel(data.data)
  } else {
    data = keysToCamel(data)
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
export const postUploadFile = async <T = any>(
  url: string,
  data = {},
): Promise<T> => {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await uploadApi.post(url, data)
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
