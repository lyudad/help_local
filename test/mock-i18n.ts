/* eslint-disable @typescript-eslint/restrict-template-expressions */
jest.mock('i18n-js', () => {
  return {
    t: (key) => `${key}.test`,
  }
})
