import React, { useState } from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import AccordionList from 'react-native-collapsible/Accordion'

import { color } from 'theme'
import { SVGIcon } from '../svg-icon'
import { Text } from '../text/text'
import { AccordionProps, ISection } from './accordion.props'
import {
  mainPresets,
  sectionPresets,
  dropdownTextPresets,
  titleTextContainerPresets,
  bottomLinePresets,
  noBottomLinePresets,
} from './accordion.presets'

export function Accordion({
  preset = 'primary',
  sections,
}: AccordionProps): JSX.Element {
  const mainStyle = mergeAll(
    flatten([mainPresets[preset] || mainPresets.primary]),
  )
  const sectionStyle = mergeAll(
    flatten([sectionPresets[preset] || sectionPresets.primary]),
  )
  const dropdownTextStyle = mergeAll(
    flatten([dropdownTextPresets[preset] || dropdownTextPresets.primary]),
  )
  const bottomLineStyle = mergeAll(
    flatten([bottomLinePresets[preset] || bottomLinePresets.primary]),
  )
  const noBottomLineStyle = mergeAll(
    flatten([noBottomLinePresets[preset] || noBottomLinePresets.primary]),
  )
  const titleTextContainerStyle = mergeAll(
    flatten([
      titleTextContainerPresets[preset] || titleTextContainerPresets.primary,
    ]),
  )

  const [activeSection, setActiveSection] = useState<number[]>([])

  const renderHeader = (section: ISection, id: number): JSX.Element => {
    return (
      <View
        style={[
          sectionStyle,
          (activeSection[0] === id && noBottomLineStyle) ||
            (id === sections.length - 1 && noBottomLineStyle),
        ]}
      >
        <View style={titleTextContainerStyle}>
          <Text preset='bold' tx={section.title} style={dropdownTextStyle} />
        </View>
        <SVGIcon
          size={14}
          icon={activeSection[0] === id ? 'chevronRight' : 'chevronDown'}
        />
      </View>
    )
  }

  const renderContent = (section: ISection): JSX.Element => {
    return (
      <View style={bottomLineStyle}>
        <Text tx={section.content} style={dropdownTextStyle} />
      </View>
    )
  }
  return (
    <View style={mainStyle}>
      <AccordionList
        sections={sections}
        renderHeader={renderHeader}
        activeSections={activeSection}
        renderContent={renderContent}
        onChange={(activeSections: number[]) =>
          setActiveSection(activeSections)
        }
        underlayColor={color.palette.white}
      />
    </View>
  )
}
