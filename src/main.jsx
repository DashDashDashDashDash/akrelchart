import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CytoscapeProvider } from './cytoscapeContext'
import { LoginProvider } from './dbloginContext'
import Footer from './components/footer'
import MainGraph from './components/maingraph'
import './normalize.css'
import './var.css'
import './main.css'

// big todo list:
// more components in the footer at least
// everything else


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CytoscapeProvider>
      <LoginProvider>
        <MainGraph />
        <Footer />
      </LoginProvider>
    </CytoscapeProvider>
  </StrictMode>,
)
