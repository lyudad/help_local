/* eslint-disable */
import { ITotalTimeTracked, ITrackerInfo } from 'interfaces'

// TTT - Total Time Tracked (object)

export const getTTTFromMs = (ms: number): ITotalTimeTracked => {
  const days = Math.max(0, Math.floor(ms / (24 * 60 * 60 * 1000)))
  const daysms = ms % (24 * 60 * 60 * 1000)
  const hours = Math.max(0, Math.floor(daysms / (60 * 60 * 1000)))
  const hoursms = ms % (60 * 60 * 1000)
  const minutes = Math.max(0, Math.floor(hoursms / (60 * 1000)))
  //const minutesms = ms3 % (60 * 1000)
  // const sec = Math.floor((minutesms) / (1000))
  return { days, hours, minutes }
}

export const getTTTFromTrackerInfoArr = (
  trackerInfo: ITrackerInfo[],
): ITotalTimeTracked => {
  let newTTT: ITotalTimeTracked = { days: 0, hours: 0, minutes: 0 }
  trackerInfo.map((info) => {
    const ms1: number = new Date(info.startAt).getTime()
    const ms2: number = info.endAt
      ? new Date(info.endAt).getTime()
      : new Date().getTime()
    const littleTTT = getTTTFromMs(ms2 - ms1)
    newTTT.days += littleTTT.days
    newTTT.hours += littleTTT.hours
    newTTT.minutes += littleTTT.minutes
  })
  return newTTT
}
