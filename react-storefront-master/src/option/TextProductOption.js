import React from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Button, Skeleton } from '@mui/material'

const PREFIX = 'RSFTextProductOption'

const defaultClasses = {
  root: `${PREFIX}-root`,
  strikeThrough: `${PREFIX}-strikeThrough`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    '.rsf-po-selected &': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  },

  /**
   * Styles applied to the element used as a strikethrough when [`disabled`](#prop-disabled) and
   * [`strikeThroughDisabled`](#prop-disabled) are both `true`.
   */
  [`& .${defaultClasses.strikeThrough}`]: {
    height: '7px',
    borderWidth: '2px 0',
    borderStyle: 'solid',
    borderColor: '#f2f2f2',
    backgroundColor: '#666',
    position: 'relative',
    width: '100%',
    top: 'calc(-(-50% - 2px))',
    left: -2,
    borderRadius: 10,
  },
}))

export {}

/**
 * Represents a single product option value as a button with text. All additional
 * props are spread to the underlying Material UI Button component.
 *
 * Example:
 *
 * ```js
 * <TextProductOption label="SM" selected />
 * ```
 */
export default function TextProductOption({
  classes: c = {},
  className,
  selected,
  label,
  skeleton,
  buttonProps,
  onClick,
  disabled,
  strikeThroughDisabled,
  strikeThroughAngle,
}) {
  const classes = { ...defaultClasses, ...c }
  if (skeleton) {
    return <Skeleton className={className} width={64} height={36} />
  }

  return (
    <Root className={classes.root}>
      <Button
        {...buttonProps}
        disabled={disabled}
        className={clsx(className, classes.root)}
        variant={selected ? 'contained' : 'outlined'}
        color={selected ? 'primary' : 'secondary'}
        onClick={onClick}
      >
        {label}
      </Button>
      {disabled && strikeThroughDisabled && (
        <div
          className={classes.strikeThrough}
          style={{ transform: `rotate(${strikeThroughAngle}deg)` }}
        />
      )}
    </Root>
  )
}

TextProductOption.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * A CSS class to apply to the option.
   */
  className: PropTypes.string,
  /**
   * Set to `true` to display a skeleton instead of the actual button.
   */
  skeleton: PropTypes.bool,
  /**
   * The text for the button.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  /**
   * Set to `true` to mark the option as selected.
   */
  selected: PropTypes.bool,
  /**
   * Set to `true` to make the option disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Set to `true` to show a slash through the item when disabled.
   */
  strikeThroughDisabled: PropTypes.bool,
  /**
   * The angle in degrees for the disabled indicator.
   */
  strikeThroughAngle: PropTypes.number,
  /**
   * This prop is intentionally ignored so that `TextProductOption` can be used interchangeably with
   * `SwatchProductOption without` displaying a warning.
   */
  imageProps: PropTypes.object,
  /**
   * Props to pass to the button element.
   */
  buttonProps: PropTypes.object,
  /**
   * A function to call when this option is clicked.
   */
  onClick: PropTypes.func,
}

TextProductOption.defaultProps = {
  selected: false,
  strikeThroughDisabled: false,
  strikeThroughAngle: 27,
}
