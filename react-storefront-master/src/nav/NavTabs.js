import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Tabs } from '@mui/material'
import MuiTabScrollButton from '@mui/material/TabScrollButton'
import { useRouter } from 'next/router'

const PREFIX = 'RSFNavTabs'

const defaultClasses = {
  indicatorNoSelection: `${PREFIX}-indicatorNoSelection`,
  scrollButtons: `${PREFIX}-scrollButtons`,
  root: `${PREFIX}-root`,
  ripple: `${PREFIX}-ripple`,
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  /**
   * Styles applied to the root element when no tab is selected.
   */
  [`& .${defaultClasses.indicatorNoSelection}`]: {
    display: 'none',
  },

  /**
   * Styles passed through to the `scrollButtons` rule in [`Tabs`](https://mui.com/api/tabs/#css)'.
   */
  [`& .${defaultClasses.scrollButtons}`]: {
    position: 'absolute',
    height: '100%',
    right: 0,
    '&:first-child': {
      left: 0,
    },
    '& svg': {
      zIndex: 1,
      width: theme.spacing(5),
      background: theme.palette.background.paper,
    },
  },

  /**
   * Styles applied to the root [`Tabs`](https://mui.com/api/tabs/) component.
   */
  [`&.${defaultClasses.root}`]: {
    maxWidth: theme.breakpoints.values.lg,
    flex: 1,
    position: 'relative',
    '&::before, &::after': {
      content: "''",
      top: 0,
      width: '15px',
      height: 'calc(100% - 3px)',
      position: 'absolute',
      zIndex: 1,
    },
    '&::before': {
      left: 0,
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)',
    },
    '&::after': {
      right: 0,
      background:
        'linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)',
    },
  },
}))

export {}

/**
 * Scrollable navigation tabs for the top of the app. All extra props are spread to the
 * underlying Material UI Tabs element.  When a tab is clicked, the "top_nav_clicked" analytics
 * event is fired.
 */
export default function NavTabs({ classes: c = {}, children, ...others }) {
  const classes = { ...defaultClasses, ...c }
  const { indicator, indicatorNoSelection, ripple, ...classNames } = classes

  const { asPath } = useRouter()
  const value = children && children.findIndex(tab => tab.props.as === asPath.split('?')[0])

  const TabScrollButton = useMemo(() => {
    const Comp = function(props) {
      return <MuiTabScrollButton {...props} TouchRippleProps={{ classes: { root: ripple } }} />
    }
    return styled(Comp)(() => ({
      [`&.${ripple}`]: {
        zIndex: 2,
      },
    }))
  }, [ripple])

  return (
    <StyledTabs
      indicatorColor="primary"
      textColor="inherit"
      ScrollButtonComponent={TabScrollButton}
      variant="scrollable"
      classes={{
        ...classNames,
        indicator: clsx(
          indicator,
          {
            [indicatorNoSelection]: value === -1, // To cancel weird animation when going from plp to pdp
          },
          classes.root,
        ),
      }}
      value={value === -1 ? false : value}
      {...others}
    >
      {children}
    </StyledTabs>
  )
}

NavTabs.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * Child tabs.
   */
  children: PropTypes.node,
}

NavTabs.defaultProps = {}
