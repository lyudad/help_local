import { postUploadFile } from 'app/services'
import { IFile } from 'interfaces'

export const singleUploadFile = async (data): Promise<IFile> => {
  return postUploadFile('upload/single', data)
}
