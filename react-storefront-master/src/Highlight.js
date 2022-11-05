import React from 'react'
import { useAmp } from 'next/amp'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const escapeHtml = unsafe =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const addHighlight = (query, text, className = '') => {
  if (!text) return ''
  return escapeHtml(text).replace(
    new RegExp(query, 'gi'),
    match => `<span class="${className}">${match}</span>`,
  )
}

export default function Highlight({ query, text, classes = {}, ...props }) {
  if (useAmp()) {
    return <Typography {...props}>{text}</Typography>
  }
  return (
    <Typography
      {...props}
      dangerouslySetInnerHTML={{ __html: addHighlight(query, text, classes.highlight) }}
    />
  )
}

Highlight.propTypes = {
  query: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.object,
}
