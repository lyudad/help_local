import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Dropdown, Text } from 'components'
import { TEXT_ALIGN_LEFT } from 'constants/common-styles'
import { itemContainerPresets } from './dropdown-with-text-items.presets'
import { IDropdownWithTextItemsProps } from './dropdown-with-text-items.props'

export const DropdownWithTextItems = (
  props: IDropdownWithTextItemsProps,
): JSX.Element => {
  const { preset = 'primary', items, onItemPress, ...rest } = props

  const itemContainerStyle = mergeAll(
    flatten([itemContainerPresets[preset] || itemContainerPresets.primary]),
  )

  return (
    <Dropdown isItemsContainerRelative {...rest}>
      {items.map((item, index) => (
        <View
          style={itemContainerStyle}
          key={index.toString()}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={index.toString()}
          action={() => onItemPress(index, item)}
        >
          <Text style={TEXT_ALIGN_LEFT} text={item} preset='header5' />
        </View>
      ))}
    </Dropdown>
  )
}
