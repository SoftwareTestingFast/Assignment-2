import { useTheme, styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Close from '@mui/icons-material/Close'
import { Dialog, DialogActions, DialogContent, IconButton, Zoom } from '@mui/material'

const PREFIX = 'RSFLightbox'

const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
  paper: `${PREFIX}-paper`,
}

const StyledDialog = styled(Dialog)(() => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${classes.root}`]: {},

  /**
   * Styles passed through to the `paper` CSS rule of the [`Dialog`](https://mui.com/api/dialog/#css)
   * root element.
   */
  [`& .${classes.paper}`]: {
    flex: 1,
    background: 'rgba(255,255,255,0.9)',
  },
}))

const StyledDialogContent = styled(DialogContent)(() => ({
  /**
   * Styles applied to the content element of the modal.
   */
  [`& .${classes.content}`]: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
}))

const Transition = React.forwardRef((props, ref) => {
  return <Zoom duration={500} ref={ref} {...props} />
})

/**
 * A modal that opens to give a full-screen view of the elements within a
 * [`Carousel`](/apiReference/carousel/Carousel).
 */
const Lightbox = function({ children, onClose, open, TransitionComponent }) {
  const theme = useTheme()

  return (
    <StyledDialog
      open={open}
      fullScreen
      classes={{
        paper: classes.paper,
      }}
      TransitionComponent={TransitionComponent}
      className={classes.root}
      style={{ zIndex: theme.zIndex.modal + 10 }}
    >
      <DialogActions>
        <IconButton onClick={onClose} size="large">
          <Close />
        </IconButton>
      </DialogActions>
      <StyledDialogContent className={classes.content}>{children}</StyledDialogContent>
    </StyledDialog>
  )
}

Lightbox.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * Child nodes to show inside the Lightbox.
   */
  children: PropTypes.node.isRequired,

  /**
   * A function to call when the Lightbox is closed.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the Lightbox is open.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The component used for the [transition](https://mui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent: PropTypes.elementType,
}

Lightbox.defaultProps = {
  TransitionComponent: Transition,
}

export default React.memo(Lightbox)
