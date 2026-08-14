import React from 'react'
import { createRoot } from 'react-dom/client'
import { Options } from './OptionsApp'
import './options.css'

const el = document.getElementById('root')!
createRoot(el).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
)
