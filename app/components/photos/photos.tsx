import React, { useCallback, useRef, useState } from 'react'
import {
  View,
  ViewStyle,
  ImageStyle,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Pinchable from 'react-native-pinchable'

import { Text, CircleImage, Modal } from 'components'
import { color, spacing } from 'theme'
import { WINDOW_WIDTH } from 'constants/common-styles'
import { IPhotosProps } from './photos.props'

const IMAGE_CONTAINER: ViewStyle = {
  marginRight: spacing[3],
}

const MODAL_CONTAINER: ViewStyle = {
  width: '95%',
  height: '75%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing[2],
}
const MODAL_CROSS: ViewStyle = {
  top: -20,
  right: 0,
}

const MODAL_IMAGE: ImageStyle = {
  width: '100%',
  height: '100%',
}

const CAROUSEL_PAGINATION: ViewStyle = {
  position: 'absolute',
  left: 0,
  bottom: -56,
  right: 0,
}
const CAROUSEL_PAGINATION_DOT: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
  borderColor: color.palette.white,
  borderWidth: 2,
  backgroundColor: color.transparent,
}
const CAROUSEL_PAGINATION_ACTIVE_DOT: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: color.palette.white,
  borderColor: color.palette.white,
}

export const Photos = ({
  title,
  photos,
  showDefaultTitle,
  style,
  size,
}: IPhotosProps): JSX.Element => {
  const PHOTOS_CONTAINER: ViewStyle = {
    width: '100%',
    ...((title || showDefaultTitle) && { marginTop: spacing[3] }),
  }
  const SECTION: ViewStyle = {
    ...((title || showDefaultTitle) && { marginTop: spacing[7] }),
  }

  const carousel = useRef(null)

  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [cardIndex, setCardIndex] = useState<number>(0)

  const handleToggleModal = useCallback(
    (cardNumber?: number) => (
      /* eslint-disable */
      setCardIndex(cardNumber), toggleModal(!isModalOpen)
    ),
    [isModalOpen],
  )

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const renderCardItem = (photo, index: number): JSX.Element => {
    return (
      <Pinchable key={`${photo}${index}`}>
        <Image source={photo} resizeMode='contain' style={MODAL_IMAGE} />
      </Pinchable>
    )
  }

  const renderJobPhotos = (): JSX.Element[] =>
    photos.map(
      (photo, index: number): JSX.Element => (
        <TouchableOpacity
          style={IMAGE_CONTAINER}
          onPress={() => handleToggleModal(index)}
          key={`${photo}${index}`}
        >
          <CircleImage source={photo} size={size ? size : 95} />
        </TouchableOpacity>
      ),
    )

  return (
    <>
      <Modal
        animationType='fade'
        transparent
        visible={isModalOpen}
        toggleModal={handleToggleModal}
        styleContainer={MODAL_CONTAINER}
        crossContainer={MODAL_CROSS}
        crossSize={12}
        crossColor={color.palette.white}
      >
        <Carousel
          ref={carousel}
          data={photos}
          sliderWidth={WINDOW_WIDTH * 0.9}
          itemWidth={WINDOW_WIDTH * 0.9}
          onSnapToItem={(index: number): void => setCardIndex(index)}
          firstItem={cardIndex ? cardIndex : 0}
          renderItem={({ item }, index: number): JSX.Element =>
            renderCardItem(item, index)
          }
        />
        <Pagination
          dotsLength={photos?.length ? photos.length : 0}
          activeDotIndex={cardIndex ? cardIndex : 0}
          containerStyle={CAROUSEL_PAGINATION}
          dotStyle={CAROUSEL_PAGINATION_ACTIVE_DOT}
          inactiveDotScale={1}
          inactiveDotStyle={CAROUSEL_PAGINATION_DOT}
        />
      </Modal>
      <View style={[SECTION, style]}>
        {(title || showDefaultTitle) && (
          <Text
            preset='header3bold'
            {...(title ? { text: title } : { tx: 'photos.defaultTitle' })}
          />
        )}
        <View style={PHOTOS_CONTAINER}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {photos?.length ? (
              renderJobPhotos()
            ) : (
              <Text
                tx='photos.noPhotos'
                preset='subtitle'
                color={color.palette.greySlow}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  )
}
