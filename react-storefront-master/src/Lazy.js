import React, { useContext, useState } from 'react'
import { styled } from '@mui/material/styles'
import ReactVisibilitySensor from 'react-visibility-sensor'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useAmp } from 'next/amp'
import PWAContext from './PWAContext'

const PREFIX = 'RSFLazy'

const defaultClasses = {
  root: `${PREFIX}-root`,
}

const Root = styled('div')(() => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    minHeight: 1,
    minWidth: 1,
  },
}))

export {}

/**
 * Defers the rendering of children until the component is visible in the viewport. When
 * using Lazy we recommend assigning a CSS class that defines minHeight and minWidth to prevent
 * layout instability when children are lazy loaded.
 *
 * You can use `<Lazy ssrOnly>` to only implement lazy behavior during server side rendering.
 *
 * Example:
 *
 * ```js
 * <Lazy style={{ minHeight: 200 }}>
 *   <SomeExpensiveComponent/>
 * </Lazy>
 * ```
 */
export default function Lazy({ ssrOnly, className, children, classes: c = {}, ...otherProps }) {
  const classes = { ...defaultClasses, ...c }
  const amp = useAmp()
  const { hydrating } = useContext(PWAContext)
  const [visible, setVisible] = useState(amp || (ssrOnly && !hydrating))

  function onChange(v) {
    if (!visible && v) {
      setVisible(true)
    }
  }

  return (
    <ReactVisibilitySensor onChange={onChange} active={!visible} partialVisibility>
      <Root className={clsx(classes.root, className)} {...otherProps}>
        {visible && children}
      </Root>
    </ReactVisibilitySensor>
  )
}

Lazy.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * CSS class to apply to the root element
   */
  className: PropTypes.string,
  /**
   * Set to `true` to render children immediately when this component is mounted after initial hydration.
   */
  ssrOnly: PropTypes.bool,
}

Lazy.defaultProps = {
  ssrOnly: false,
}
