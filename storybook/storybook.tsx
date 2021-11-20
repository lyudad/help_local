import React from 'react'
import { getStorybookUI, configure } from '@storybook/react-native'

declare let module

configure(() => {
  require('./storybook-registry')
}, module)

const StorybookUI = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage:
    require('@react-native-community/async-storage').default || null,
})

export const StorybookUIRoot = (): JSX.Element => {
  return <StorybookUI />
}
