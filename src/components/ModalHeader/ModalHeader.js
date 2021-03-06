import React from 'react'

import { Icon24Dismiss } from '@vkontakte/icons'
import {
  ModalPageHeader,
  PanelHeaderButton,
  PanelHeaderClose,
  useAdaptivity,
  usePlatform,
  ViewWidth,
  IOS,
  ANDROID,
  Separator,
} from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'

export const ModalHeader = ({ children, onClose }) => {
  const platform = usePlatform()
  const { viewWidth } = useAdaptivity()
  const { setActiveModal } = useRouterService()

  const isMobile = viewWidth <= ViewWidth.MOBILE

  const handleClose = () => {
    setActiveModal(null)
    onClose && onClose()
  }

  return (
    <React.Fragment>
      <ModalPageHeader
        separator
        right={
          isMobile &&
          platform === IOS && (
            <PanelHeaderButton onClick={handleClose}>
              <Icon24Dismiss />
            </PanelHeaderButton>
          )
        }
        left={
          isMobile &&
          platform === ANDROID && <PanelHeaderClose onClick={handleClose} />
        }
        onClose={handleClose}
      >
        {children}
      </ModalPageHeader>
      <Separator />
    </React.Fragment>
  )
}
