import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import CollapsibleList from 'react-native-collapsible-list'
import { mergeAll, flatten } from 'ramda'
import { ViewWithShadow, Text, SVGIcon } from 'components'
import { color } from 'theme'
import { JobListProps } from './job-list.props'
import {
  containerPresets,
  mainRowPresets,
  iconPresets,
} from './job-list.presets'

const TITLE_BOX: ViewStyle = {
  flexDirection: 'row',
  flex: 3,
  borderWidth: 1,
  borderColor: color.palette.white,
}

const HR: ViewStyle = {
  borderBottomWidth: 1,
  borderTopWidth: 14,
  borderTopColor: color.palette.white,
  borderBottomColor: color.palette.lightGrey,
}

const HR2: ViewStyle = {
  borderTopWidth: 12,
  borderTopColor: color.palette.white,
}

export const JobList = (props: JobListProps): JSX.Element => {
  const {
    children,
    title,
    icon,
    iconColor,
    buttonText,
    buttonTextStyle,
    preset = 'default',
    style: styleOverride,
    ...rest
  } = props

  const [isListOpened, setListOpened] = useState<boolean>(false)
  const btnText = `jobList.btn${isListOpened ? 'Hide' : 'Show'}Text`

  const containerStyle = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.default,
      styleOverride,
    ]),
  )
  const mainRowStyle = mergeAll(
    flatten([mainRowPresets[preset] || mainRowPresets.default]),
  )
  const iconProps = mergeAll(
    flatten([iconPresets[preset] || iconPresets.default]),
  )

  return (
    <ViewWithShadow {...rest} style={containerStyle}>
      <CollapsibleList
        numberOfVisibleItems={3}
        buttonPosition='top'
        onToggle={(isOpened) => setListOpened(isOpened)}
        buttonContent={
          <View>
            <View style={mainRowStyle}>
              <View style={TITLE_BOX} onStartShouldSetResponder={() => true}>
                <SVGIcon icon={icon} {...iconProps} />
                <Text text='__' color={color.palette.white} />
                <Text text={title} preset='header4bold' />
              </View>
              <Text tx={btnText} preset='linkBold' style={buttonTextStyle} />
            </View>
            <View onStartShouldSetResponder={() => true} style={HR} />
            <View onStartShouldSetResponder={() => true} style={HR2} />
          </View>
        }
      >
        {children}
      </CollapsibleList>
    </ViewWithShadow>
  )
}
