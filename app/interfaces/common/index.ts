export * from './common-for-reducers'
export * from './common-reducer'
export * from './search'
export * from './job'
export * from './other'
export * from './category'
export * from './bid'
export * from './tracker'
export * from './filter'
export * from './payment'
export * from './file'

export type OrNull<T> = { [K in keyof T]: T[K] | null }

export interface EmailPassword {
  email: string
  password: string
}

export type IFixedOrHourly = 'fixed' | 'hourly'

export interface IAddress {
  id: number
  placeId: string
  formatted: string
  city: string
  streetName: string
  streetNumber: string
  country: string
  zipcode: string
  stateLong: string
  stateShort: string
  latitude: number
  longitude: number
}
