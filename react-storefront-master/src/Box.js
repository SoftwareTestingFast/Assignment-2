import React from 'react'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const PREFIX = 'Box'

const defaultClasses = {
  root: `${PREFIX}-root`,
  split: `${PREFIX}-split`,
}

const Root = styled('div')(() => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    display: 'flex',
  },

  /**
   * Styles applied to the root element if [`split`](#prop-split) is `true`.
   */
  [`&.${defaultClasses.split}`]: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

/**
 * A flex container.  All additional props are spread to the style of the underlying div.
 */
export {}

export default function Box({
  className,
  classes: c = {},
  split = false,
  children,
  style,
  align,
  justify,
  ...other
}) {
  const classes = { ...defaultClasses, ...c }
  return (
    <Root
      className={clsx(classes.root, className, { [classes.split]: split })}
      style={{ alignItems: align, justifyContent: justify, ...other, ...style }}
    >
      {children}
    </Root>
  )
}

Box.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * If `true`, split items on opposite sides of the box by applying justify-content: 'space-between'
   */
  split: PropTypes.bool,

  /**
   * CSS value for align-items
   */
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),

  /**
   * CSS value for justify-content
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-around',
    'space-between',
    'initial',
    'inherit',
    'stretch',
    'baseline',
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
}

Box.defaultProps = {
  align: 'center',
  justify: 'flex-start',
}

/**
 * A flex container with horizontal layout. All additional props are spread to the style
 * of the underlying div.
 */
export var Hbox = function(props) {
  return <Box {...props} flexDirection="row" />
}

Hbox.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * True to split items on opposite sides of the box by applying `justify-content: 'space-between'`.
   */
  split: PropTypes.bool,

  /**
   * CSS value for `align-items` style.
   */
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),

  /**
   * CSS value for `justify-content` style
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-around',
    'space-between',
    'initial',
    'inherit',
    'stretch',
    'baseline',
  ]),
}

Hbox.defaultProps = {
  align: 'center',
  justify: 'flex-start',
}

/**
 * A flex container with vertical layout. All additional props are spread to
 * the style of the underlying div.
 */
export var Vbox = function(props) {
  props = { ...props, flexDirection: 'column' }
  return <Box {...props} />
}

Vbox.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * CSS value for `align-items` style.
   */
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),

  /**
   * CSS value for `justify-content` style.
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-around',
    'space-between',
    'initial',
    'inherit',
    'stretch',
    'baseline',
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
}

Vbox.defaultProps = {
  align: 'center',
  justify: 'flex-start',
}
