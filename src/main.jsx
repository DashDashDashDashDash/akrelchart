import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/footer'
import './normalize.css'
import './index.css'
import './main.css'
import './var.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Footer />
  </StrictMode>,
)
