import React from 'react'
import { DetailsWithIcon, IDetailsWithIconItem } from 'components'
import dayjs from 'dayjs'
import { translate } from 'i18n'
import { IshowJobDateAndAddressWithIconsProps } from './show-job-date-and-address-with-icons.props'

export const ShowJobDateAndAddressWithIcons = ({
  jobInfo,
  style,
}: IshowJobDateAndAddressWithIconsProps): JSX.Element => {
  let items: IDetailsWithIconItem[] = []
  if (jobInfo) {
    items = [
      {
        icon: 'calendar',
        name: translate('showJobDateAndAddressWithIcons.date'),
        value: dayjs(jobInfo.startAt).format('MMMM D, YYYY'),
      },
      {
        icon: 'time',
        name: translate('showJobDateAndAddressWithIcons.time'),
        value: `${dayjs(jobInfo.startAt).format('h:mm A')} - ${dayjs(
          jobInfo.endAt,
        ).format('h:mm A')}`,
      },
    ]
    if (jobInfo.address) {
      items.push({
        icon: 'mapMark',
        name: translate('showJobDateAndAddressWithIcons.address'),
        value: jobInfo.address.formatted,
      })
    }
  }

  return (
    <>
      {jobInfo && (
        <DetailsWithIcon
          {...{ style }}
          title={translate(
            `showJobDateAndAddressWithIcons.${
              jobInfo.address ? 'setToArrive' : 'willStartAt'
            }`,
          )}
          {...{ items }}
        />
      )}
    </>
  )
}
