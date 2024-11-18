import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/footer'
import MainGraph from './components/maingraph'
import './normalize.css'
import './var.css'
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainGraph />
    <Footer />
  </StrictMode>,
)
