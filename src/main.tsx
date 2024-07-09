import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import { CardContextsProvider } from './contexts/CardContextProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CardContextsProvider>
      <AppRoutes />
    </CardContextsProvider>
  </React.StrictMode>,
)
