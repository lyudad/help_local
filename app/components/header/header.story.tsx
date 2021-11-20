import * as React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Header } from './header'

declare let module

const VIEWSTYLE = {
  flex: 1,
}

storiesOf('Header', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behavior', () => (
    <Story>
      <UseCase noPad text='default' usage='The default usage'>
        <View style={VIEWSTYLE}>
          <Header />
        </View>
      </UseCase>
    </Story>
  ))
