import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { CircleImage } from './circleImage'

declare let module

storiesOf('CircleImage', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Presets', () => (
    <Story>
      <UseCase text='Primary' usage='The primary circleImage.'>
        <CircleImage source={require('assets/avatar.png')} />
      </UseCase>
    </Story>
  ))
