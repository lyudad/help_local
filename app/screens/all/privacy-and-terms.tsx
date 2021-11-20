import React, { useState } from 'react'
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  ScrollView,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AllStackRouteProps } from 'navigation'

import { Text, BaseScreen, SVGIcon } from 'components'
import { color, spacing } from 'theme'
import {
  ALIGIN_ITEMS_CENTER,
  PADDING_TOP_SP5,
  PADDING_VERTICAL_SP3,
  ROW,
  TEXT_ALIGIN_LEFT,
} from 'constants/common-styles'
import * as text from 'app/i18n/privacy-and-terms.en.json'
import LinearGradient from 'react-native-linear-gradient'

// const logoPath = require('assets/app-logo.png')

const TOP: ViewStyle = {
  height: 55,
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  paddingBottom: 10,
}

const MARGIN_RIGHT_SP1: ViewStyle = {
  marginRight: spacing[1],
}

const TITLE: TextStyle = {
  fontSize: 25,
  fontWeight: '700',
  paddingTop: spacing[6],
}

const TEXT_VIEW: ViewStyle = {
  marginTop: spacing[2],
  marginBottom: spacing[3],
}

const GRADIENT: ViewStyle = {
  height: 100,
  width: '100%',
  position: 'absolute',
  zIndex: 2,
  bottom: 1,
}

export const PrivacyAndTermsScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const route = useRoute<AllStackRouteProps<'privacyAndTerms'>>()
  const TERMS = 'terms'
  const isTerms: boolean = route.params.whichTextShouldBeShown === TERMS
  const [isGradient, setIsGradient] = useState<boolean>(true)
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return (
      parseInt(layoutMeasurement.height, 10) + parseInt(contentOffset.y, 10) >=
      parseInt(contentSize.height, 10) - 20
    )
  }

  interface IRenderTextBlockProps {
    title: string
    desc: string
  }
  const RenderTextBlock = ({
    title,
    desc,
  }: IRenderTextBlockProps): JSX.Element => {
    return (
      <>
        <Text text={title} preset='header3bold' style={TEXT_ALIGIN_LEFT} />
        <View style={TEXT_VIEW}>
          <Text text={desc} preset='subtitle' style={TEXT_ALIGIN_LEFT} />
        </View>
      </>
    )
  }
  return (
    <BaseScreen
      withoutBottomNavigator
      type='fixed'
      withoutGradient
      style={PADDING_TOP_SP5}
    >
      <TouchableOpacity style={TOP} onPress={() => navigation.goBack()}>
        <View style={ROW}>
          <SVGIcon icon='chevronLeft' style={MARGIN_RIGHT_SP1 as ImageStyle} />
          <Text tx='common.goBack' preset='subtitle' />
        </View>
      </TouchableOpacity>
      {isGradient && (
        <LinearGradient colors={['#FFFFFF00', '#FFFFFF']} style={GRADIENT} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          // console.log(nativeEvent.contentOffset)
          // console.log(nativeEvent.contentSize)
          // console.log(nativeEvent.layoutMeasurement)
          setIsGradient(!isCloseToBottom(nativeEvent))
        }}
      >
        <View style={ALIGIN_ITEMS_CENTER}>
          <SVGIcon
            icon='appLogo'
            color={color.primary}
            width={118}
            height={50}
          />
          <Text
            tx={`privacyAndTerms.${isTerms ? 'termsOfUse' : 'privacyPolicy'}`}
            style={TITLE}
          />
        </View>
        <View style={PADDING_VERTICAL_SP3}>
          <Text text={text.desc1} preset='subtitle' style={TEXT_ALIGIN_LEFT} />
        </View>
        <Text
          text={text.desc2Title}
          preset='header3bold'
          style={TEXT_ALIGIN_LEFT}
          color={color.primary}
        />
        <View style={TEXT_VIEW}>
          <Text text={text.desc2} preset='subtitle' style={TEXT_ALIGIN_LEFT} />
        </View>
        {text.textBlocks.map((item: { title: string; text: string }, index) => (
          <RenderTextBlock
            key={item.title}
            title={item.title}
            desc={item.text}
          />
        ))}
      </ScrollView>
    </BaseScreen>
  )
}
