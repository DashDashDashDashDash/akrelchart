import { useState, useContext } from 'react'

import { CytoscapeContext } from '../../cytoscapeContext'
import { LoginContext } from '../../dbloginContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '../../assets/icons/footer/faAnglesDown'
import { faMagnifyingGlass } from '../../assets/icons/footer/faMagnifyingGlass'
import { faTextSize } from '../../assets/icons/footer/faTextSize'
import { faUser } from '../../assets/icons/footer/faUser'
import { faKey } from '../../assets/icons/footer/faKey'
import { faRightFromBracket } from '../../assets/icons/footer/faRightFromBracket'
import { faFilePen } from '../../assets/icons/footer/faFilePen'
import { faCircleQuestion } from '../../assets/icons/footer/faCircleQuestion'
import { faAnglesUp } from '../../assets/icons/footer/faAnglesUp'

import About from './about'
import Login from './logindialog'
import PasswordChange from './passwordchange'

import './footer.css'
import ptiloBanner from '../../assets/images/banner.png'

// dialogs that are brought up by the footer should be the footer's children...
// but i can't really use the children prop notation to just nest the children
// as jsx cause they have this functionality to show and hide themselves...

// logging in requires more context to be used. i'll take care of that later
export default function Footer() {

  // :uhhh:
  let [visibility, setVisibility] = useState(true)
  let [showAbout, setShowAbout] = useState(false)
  let [showLogin, setShowLogin] = useState(false)
  let [showPwChange, setShowPwChange] = useState(false)

  let {cyRef} = useContext(CytoscapeContext)
  let acc = useContext(LoginContext)
  // "logged in" when true, "logged out" when false
  let loggedInClass = acc.accountState.username ? '' : ' none'

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

  function logout() {
    acc.logout()
    setShowLogin(true)
  }

  // footer visibility should be like that on the css
  // cause it has an animation unlike forms
  return (
    <>
      <link rel="preload" as="image" href="../assets/images/banner-awake.png" />
      <link rel="preload" as="image" href="../assets/images/banner-resp.png" />
      <link rel="preload" as="image" href="../assets/images/banner-resp-awake.png" />
      {visibility ? null :
        // no need for restoreui_i anymore
       <>
         <div id="restoreui-area">
           <div className="restoreui_v" id="restoreui">
             <a href="#" onClick={() => { toggleVisible() }}>
               <div id="unhider">
                 <FontAwesomeIcon icon={faAnglesUp} size={"2xl"} />
               </div>
             </a>
           </div>
         </div>

         <div id="ripple-area">
           <div className="ripple">
             <div className="ripple-in">
               <img id="rippleRing" src="images/ripple-ring.svg"/>
               <img id="rippleCircle" src="images/ripple-circle.svg"/>
             </div>
           </div>
         </div>
       </>
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
        {/* special since it doesn't use the none class */}
        <nav className={"ftr_sub ftr_usr" + (loggedInClass ? '' : ' ftr_admin')}>
          <div id="loginstr" className={"admin" + loggedInClass}>
            <FontAwesomeIcon icon={faUser} className="navico" />
            <span className="resp-text">logged in as</span>
            <span id="username">{acc.accountState.displayName}</span>
          </div>
          <div className={"ftr_sep admin" + loggedInClass}></div>
          <div className={"ftr_btn admin" + loggedInClass}>
            <a href="#" className="btn_text" onClick={() => setShowPwChange(true)} id="pwa">
              <FontAwesomeIcon icon={faKey} className="navico" />
              <span className="resp-text">change password</span>
            </a>
          </div>
          <div className={"ftr_sep admin" + loggedInClass}></div>
          <div className={"ftr_btn admin" + loggedInClass}>
            <a href="#" className="btn_text" onClick={() => {logout()}} id="logout">
              <FontAwesomeIcon icon={faRightFromBracket} className="navico" />
              <span className="resp-text">logout</span>
            </a>
          </div>
          <div className={"ftr_sep admin" + !loggedInClass}></div>
          <div className={"ftr_btn admin" + !loggedInClass}>
            <a href="#" className="btn_text" onClick={() => setShowLogin(true)} id="logina">
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


      {// apparently this is how you do this and i hate it too
        !showAbout ? null :
        <About close={() => {setShowAbout(false)}}/>
      }

      {
        !showLogin ? null :
        <Login close={() => {setShowLogin(false)}}/>
      }

      {
        !showPwChange ? null :
        <PasswordChange close={() => {setShowPwChange(false)}}/>
      }
    </>
  )
}
