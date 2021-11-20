import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { DropdownInput } from './dropdownInput'

declare let module

storiesOf('DropdownInput', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Presets', () => (
    <Story>
      <UseCase text='Primary' usage='The primary input.'>
        <DropdownInput placeholder='test text' />
      </UseCase>
    </Story>
  ))
