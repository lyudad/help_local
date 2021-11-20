import { Dimensions, TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const WINDOW_WIDTH = Dimensions.get('window').width

export const FULL: ViewStyle = { flex: 1 }

export const FULL_WIDTH: ViewStyle = { width: '100%' }
export const FULL_HEIGHT: ViewStyle = { height: '100%' }

export const WRAPPER: ViewStyle = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
}

export const ROW: ViewStyle = {
  flexDirection: 'row',
}

export const ROW_SPACE_BETWEEN: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export const COLUMN: ViewStyle = {
  flexDirection: 'row',
}

export const FLEX_1: ViewStyle = {
  flex: 1,
}

export const FLEX_2: ViewStyle = {
  flex: 2,
}

export const FLEX_3: ViewStyle = {
  flex: 3,
}

export const FLEX_4: ViewStyle = {
  flex: 4,
}

export const FLEX_5: ViewStyle = {
  flex: 5,
}

export const FLEX_6: ViewStyle = {
  flex: 6,
}

export const FLEX_7: ViewStyle = {
  flex: 7,
}

export const FLEX_8: ViewStyle = {
  flex: 8,
}

export const FLEX_9: ViewStyle = {
  flex: 9,
}

export const FLEX_10: ViewStyle = {
  flex: 10,
}

/* eslint-disable sonarjs/no-duplicate-string */

export const ALIGIN_ITEMS_START: ViewStyle = {
  alignItems: 'flex-start',
}

export const ALIGIN_ITEMS_CENTER: ViewStyle = {
  alignItems: 'center',
}

export const ALIGIN_ITEMS_END: ViewStyle = {
  alignItems: 'flex-end',
}

export const JUSTIFY_CONTENT_CENTER: ViewStyle = {
  justifyContent: 'center',
}

export const JUSTIFY_CONTENT_START: ViewStyle = {
  justifyContent: 'flex-start',
}

export const ALIGN_SELF_START: ViewStyle = {
  alignSelf: 'flex-start',
}

export const ALIGN_SELF_END: ViewStyle = {
  alignSelf: 'flex-end',
}

export const TEXT_ALIGIN_LEFT: TextStyle = {
  textAlign: 'left',
}

export const UNDERLINE: TextStyle = {
  textDecorationLine: 'underline',
}

export const BOLD: TextStyle = {
  fontWeight: 'bold',
}

export const UPPERCASE: TextStyle = {
  textTransform: 'uppercase',
}

export const CAPITALIZE: TextStyle = {
  textTransform: 'capitalize',
}

export const GRAY_BORDER_RADIUS4: ViewStyle = {
  borderWidth: 1,
  borderColor: color.palette.grey,
  borderRadius: 4,
}

export const HZ_PADDING_5_PERCENT: ViewStyle = {
  paddingHorizontal: '5%',
}

export const PADDING_SP4: ViewStyle = {
  padding: spacing[4],
}

export const PADDING_VERTICAL_0: ViewStyle = {
  paddingVertical: 0,
}

export const PADDING_VERTICAL_SP1: ViewStyle = {
  paddingVertical: spacing[1],
}

export const PADDING_VERTICAL_SP2: ViewStyle = {
  paddingVertical: spacing[2],
}

export const PADDING_VERTICAL_SP3: ViewStyle = {
  paddingVertical: spacing[3],
}

export const PADDING_VERTICAL_SP4: ViewStyle = {
  paddingVertical: spacing[4],
}

export const PADDING_VERTICAL_SP5: ViewStyle = {
  paddingVertical: spacing[5],
}

export const PADDING_VERTICAL_SP6: ViewStyle = {
  paddingVertical: spacing[6],
}

export const PADDING_VERTICAL_SP7: ViewStyle = {
  paddingVertical: spacing[7],
}

export const PADDING_VERTICAL_SP8: ViewStyle = {
  paddingVertical: spacing[8],
}

export const PADDING_HORIZONTAL_0: ViewStyle = {
  paddingHorizontal: 0,
}

export const PADDING_HORIZONTAL_1PX: ViewStyle = {
  paddingHorizontal: 1,
}

export const PADDING_HORIZONTAL_2PX: ViewStyle = {
  paddingHorizontal: 2,
}

export const PADDING_HORIZONTAL_SP1: ViewStyle = {
  paddingHorizontal: spacing[1],
}

export const PADDING_HORIZONTAL_SP2: ViewStyle = {
  paddingHorizontal: spacing[2],
}

export const PADDING_HORIZONTAL_SP3: ViewStyle = {
  paddingHorizontal: spacing[3],
}

export const PADDING_HORIZONTAL_SP4: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const PADDING_HORIZONTAL_SP5: ViewStyle = {
  paddingHorizontal: spacing[5],
}

export const PADDING_TOP_SP6: ViewStyle = {
  paddingTop: spacing[6],
}

export const PADDING_TOP_SP7: ViewStyle = {
  paddingTop: spacing[7],
}

export const PADDING_TOP_SP3: ViewStyle = {
  paddingTop: spacing[3],
}

export const PADDING_TOP_SP4: ViewStyle = {
  paddingTop: spacing[4],
}

export const PADDING_TOP_SP5: ViewStyle = {
  paddingTop: spacing[5],
}

export const PADDING_TOP_0: ViewStyle = {
  paddingTop: spacing[0],
}

export const PADDING_BOTTOM_0: ViewStyle = {
  paddingBottom: spacing[0],
}

export const PADDING_BOTTOM_SP2: ViewStyle = {
  paddingBottom: spacing[2],
}

export const PADDING_BOTTOM_SP3: ViewStyle = {
  paddingBottom: spacing[3],
}

export const PADDING_BOTTOM_SP4: ViewStyle = {
  paddingBottom: spacing[4],
}

export const PADDING_BOTTOM_SP5: ViewStyle = {
  paddingBottom: spacing[5],
}

export const PADDING_BOTTOM_SP6: ViewStyle = {
  paddingBottom: spacing[6],
}

export const PADDING_BOTTOM_SP7: ViewStyle = {
  paddingBottom: spacing[7],
}

export const PADDING_RIGHT_SP5: ViewStyle = {
  paddingRight: spacing[5],
}

export const MARGIN_BOTTOM_0: ViewStyle = {
  marginBottom: spacing[0],
}

export const MARGIN_BOTTOM_SP2: ViewStyle = {
  marginBottom: spacing[2],
}

export const MARGIN_BOTTOM_SP3: ViewStyle = {
  marginBottom: spacing[3],
}

export const MARGIN_BOTTOM_SP4: ViewStyle = {
  marginBottom: spacing[4],
}

export const MARGIN_BOTTOM_SP5: ViewStyle = {
  marginBottom: spacing[5],
}

export const MARGIN_BOTTOM_SP6: ViewStyle = {
  marginBottom: spacing[6],
}

export const MARGIN_TOP_SP1: ViewStyle = {
  marginTop: spacing[1],
}

export const MARGIN_TOP_SP2: ViewStyle = {
  marginTop: spacing[2],
}

export const MARGIN_TOP_SP3: ViewStyle = {
  marginTop: spacing[3],
}

export const MARGIN_TOP_SP4: ViewStyle = {
  marginTop: spacing[4],
}

export const MARGIN_TOP_SP5: ViewStyle = {
  marginTop: spacing[5],
}

export const MARGIN_TOP_SP6: ViewStyle = {
  marginTop: spacing[6],
}
export const MARGIN_TOP_SP7: ViewStyle = {
  marginTop: spacing[7],
}

// use it when shadow was lost
export const MARGIN_HORIZONTAL_2PX: ViewStyle = {
  marginHorizontal: 2,
}

export const MARGIN_HORIZONTAL_5PERCENT: ViewStyle = {
  marginHorizontal: '5%',
}

export const MARGIN_HORIZONTAL_SP2: ViewStyle = {
  marginHorizontal: spacing[2],
}

export const MARGIN_HORIZONTAL_SP3: ViewStyle = {
  marginHorizontal: spacing[3],
}

export const MARGIN_VERTICAL_0: ViewStyle = {
  marginVertical: spacing[0],
}

export const MARGIN_VERTICAL_SP1: ViewStyle = {
  marginVertical: spacing[1],
}

export const MARGIN_VERTICAL_SP2: ViewStyle = {
  marginVertical: spacing[2],
}

export const MARGIN_VERTICAL_SP3: ViewStyle = {
  marginVertical: spacing[3],
}

export const MARGIN_VERTICAL_SP4: ViewStyle = {
  marginVertical: spacing[4],
}

export const MARGIN_VERTICAL_SP5: ViewStyle = {
  marginVertical: spacing[5],
}

export const MARGIN_VERTICAL_SP6: ViewStyle = {
  marginVertical: spacing[6],
}

export const MARGIN_LEFT_SP2: ViewStyle = {
  marginLeft: spacing[2],
}

export const Z_INDEX_1: ViewStyle = {
  zIndex: 1,
}

export const Z_INDEX_2: ViewStyle = {
  zIndex: 2,
}

export const Z_INDEX_3: ViewStyle = {
  zIndex: 3,
}

export const TEXT_ALIGN_LEFT: TextStyle = {
  textAlign: 'left',
}

export const TEXT_ALIGN_RIGHT: TextStyle = {
  textAlign: 'right',
}

export const SHADOW: ViewStyle = {
  shadowColor: color.secondary,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
}
