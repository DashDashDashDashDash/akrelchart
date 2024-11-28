import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CytoscapeProvider } from './cytoscapeContext'
import Footer from './components/footer'
import MainGraph from './components/maingraph'
import './normalize.css'
import './var.css'
import './main.css'

// big todo list:
// mobile cooling factor
// 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CytoscapeProvider>
       <MainGraph />
       <Footer />
    </CytoscapeProvider>
  </StrictMode>,
)
