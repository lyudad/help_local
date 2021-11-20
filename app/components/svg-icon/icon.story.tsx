import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { SVGIcon } from './index'

declare let module

storiesOf('SVGIcon', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Names', () => (
    <Story>
      <UseCase text='portfolio' usage='Portfolio tab icon'>
        <SVGIcon icon='home' />
      </UseCase>
      <UseCase text='heytrade' usage='Profile tab icon'>
        <SVGIcon icon='profile' />
      </UseCase>
      <UseCase text='search' usage='The icon for search'>
        <SVGIcon icon='search' />
      </UseCase>
      <UseCase text='check' usage='The icon used for checkbox'>
        <SVGIcon icon='check_box' />
      </UseCase>
      <UseCase
        text='stocksUp'
        usage='The icon used for showing that stocks went up'
      >
        <SVGIcon icon='stocks_up' />
      </UseCase>
      <UseCase
        text='stocksDown'
        usage='The icon used for showing that stocks went down'
      >
        <SVGIcon icon='stocks_down' />
      </UseCase>
    </Story>
  ))
