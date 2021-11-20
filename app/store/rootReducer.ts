import { combineReducers } from '@reduxjs/toolkit'

import helperSlice from 'screens/helper/reducers'
import authSlice from 'screens/auth/reducers'
import commonSlice from 'app/store/commonSlice'
import userSlice from 'screens/both/reducers'
import consumerSlice from 'screens/client/reducers'
import chatSlice from 'screens/both/messaging/reducers'
import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer } from 'redux-persist'

const chatPersistConfig = {
  key: 'chat',
  storage: AsyncStorage,
  whitelist: ['showWarning'],
}

const commonPersistConfig = {
  key: 'common',
  storage: AsyncStorage,
  whitelist: [],
}

const helperPersistConfig = {
  key: 'helper',
  storage: AsyncStorage,
  whitelist: ['isTimerActive'],
}

export const rootReducer = combineReducers({
  helper: persistReducer(helperPersistConfig, helperSlice),
  auth: authSlice,
  common: persistReducer(commonPersistConfig, commonSlice),
  user: userSlice,
  consumer: consumerSlice,
  chat: persistReducer(chatPersistConfig, chatSlice),
})

export type RootState = ReturnType<typeof rootReducer>
