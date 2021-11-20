// we always make sure 'react-native' gets included first
import 'react-native'

// libraries to mock
import './mock-async-storage'
import './mock-i18n'

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  let __TEST__
}
