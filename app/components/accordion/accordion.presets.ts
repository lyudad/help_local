import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from 'theme'

const MAIN_CONT: ViewStyle = {
  marginBottom: spacing[6],
}

const SECTION_CONT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: spacing[3],
  paddingBottom: spacing[2],
  borderBottomWidth: 1,
  borderBottomColor: color.palette.grey,
}

const BOTTOM_LINE: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: color.palette.grey,
  paddingBottom: spacing[2],
}
const NO_BOTTOM_LINE: ViewStyle = {
  borderBottomWidth: 0,
  borderBottomColor: color.palette.white,
  paddingBottom: spacing[0],
}

const TITLE_TEXT_CONTAINER: ViewStyle = {
  flex: 1,
}

const DROPDOWN_TEXT: TextStyle = {
  textAlign: 'left',
  marginTop: spacing[2],
}

export const mainPresets: { primary: ViewStyle } = {
  primary: {
    ...MAIN_CONT,
  },
}
export const sectionPresets: { primary: ViewStyle } = {
  primary: {
    ...SECTION_CONT,
  },
}

export const bottomLinePresets: { primary: ViewStyle } = {
  primary: {
    ...BOTTOM_LINE,
  },
}

export const noBottomLinePresets: { primary: ViewStyle } = {
  primary: {
    ...NO_BOTTOM_LINE,
  },
}

export const titleTextContainerPresets: { primary: ViewStyle } = {
  primary: {
    ...TITLE_TEXT_CONTAINER,
  },
}

export const dropdownTextPresets: { primary: TextStyle } = {
  primary: {
    ...DROPDOWN_TEXT,
  },
}

export type AccordionPresetNames = keyof typeof sectionPresets
