import { useState, useContext } from 'react'
import { CytoscapeContext } from '../cytoscapeContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '../assets/icons/footer/faAnglesDown'
import { faMagnifyingGlass } from '../assets/icons/footer/faMagnifyingGlass'
import { faTextSize } from '../assets/icons/footer/faTextSize'
import { faUser } from '../assets/icons/footer/faUser'
import { faKey } from '../assets/icons/footer/faKey'
import { faRightFromBracket } from '../assets/icons/footer/faRightFromBracket'
import { faFilePen } from '../assets/icons/footer/faFilePen'
import { faCircleQuestion } from '../assets/icons/footer/faCircleQuestion'

import About from './about'

import './footer.css'
import ptiloBanner from '../assets/images/banner.png'

// dialogs that are brought up by the footer should be the footer's children...
// logging in requires more context to be used. i'll take care of that later
export default function Footer() {

  let [visibility, setVisibility] = useState(true)
  let [showAbout, setShowAbout] = useState(false)
  let {cyRef} = useContext(CytoscapeContext)

  // inline this instead of making it its own function?
  function toggleVisible() {
    setVisibility(!visibility)
  }

  // ...this thing's gonna go to an options menu
  function toggleTextSize() {
    // unsure why this check is made. cyRef should always exist at this point, right?
    if (cyRef.current) {
      // can't i alias this already
      cyRef.current.startBatch()
      cyRef.current.$('node').toggleClass('smalltext')
      cyRef.current.endBatch()
    }
  }

  // footer visibility should be like that on the css
  // cause it has an animation unlike forms
  return (
    <>
      <link rel="preload" as="image" src="../assets/images/banner-awake.png" />
      <link rel="preload" as="image" src="../assets/images/banner-resp.png" />
      <link rel="preload" as="image" src="../assets/images/banner-resp-awake.png" />
      {visibility ? null :
        // no need for restoreui_i anymore
        // inert bs: https://github.com/facebook/react/issues/17157#issuecomment-1687842532
        <div className="restoreui_v" id="restoreui" inert={visibility ? '' : undefined}>
          <a href="#" className="hiddenlink" onClick={() => { toggleVisible() }}>unhide</a>
        </div>
      }
      <div className={visibility ? 'footer_v' : 'footer_i'} id="footer">
        <nav className="ftr_sub" id="ftr_gen">
          <img id="banner" src={ptiloBanner} />
          <div className="ftr_sep" id="first_sep"></div>
          <div className="ftr_btn">
            <a href="#" className="btn_text" onClick={() => { toggleVisible() }}>
              <FontAwesomeIcon icon={faAnglesDown} className="navico" />
              <span className="resp-text">hide</span>
            </a>
          </div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn">
            <a href="#" className="btn_text" onClick="popsearch()">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="navico" />
              <span className="resp-text">search</span>
            </a>
          </div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn">
            <a href="#" className="btn_text" onClick={() => { toggleTextSize() }}>
              <FontAwesomeIcon icon={faTextSize} className="navico" />
              <span className="resp-text">text size</span>
            </a>
          </div>
        </nav>
        <nav className="ftr_sub ftr_usr">
          <div id="loginstr" className="admin none">
            <FontAwesomeIcon icon={faUser} className="navico" />
            <span className="resp-text">logged in as</span>
            <span id="username">guest</span>
          </div>
          <div className="ftr_sep admin none"></div>
          <div className="ftr_btn admin none">
            <a href="#" className="btn_text" onClick="showpwchange()" id="pwa">
              <FontAwesomeIcon icon={faKey} className="navico" />
              <span className="resp-text">change password</span>
            </a>
          </div>
          <div className="ftr_sep admin none"></div>
          <div className="ftr_btn admin none">
            <a href="#" className="btn_text" onClick="logout()" id="logout">
              <FontAwesomeIcon icon={faRightFromBracket} className="navico" />
              <span className="resp-text">logout</span>
            </a>
          </div>
          <div className="ftr_sep admin none"></div>
          <div className="ftr_btn admin">
            <a href="#" className="btn_text" onClick="showlogin()" id="logina">
              <FontAwesomeIcon icon={faFilePen} className="navico" />
              <span className="resp-text">edit</span>
            </a>
          </div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn">
            <a href="#" className="btn_text" onClick={() => setShowAbout(true)}>
              <FontAwesomeIcon icon={faCircleQuestion} className="navico" />
              <span className="resp-text">about</span>
            </a>
          </div>
        </nav>
      </div>

      {!showAbout ? null :
       <About show={showAbout} close={() => setShowAbout(!showAbout)}/>
      }
    </>
  )
}
