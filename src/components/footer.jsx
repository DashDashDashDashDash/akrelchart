import { useState, useContext } from 'react'
import { CytoscapeContext } from '../cytoscapeContext'
import './footer.css'
import ptiloBanner from '../assets/images/banner.png'

// dialogs that are brought up by the footer should be the footer's children...
// logging in requires more context to be used. i'll take care of that later
export default function Footer() {

  let [visibility, setVisibility] = useState(true)
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
    <link rel="preload" as="image" src="../assets/images/banner-awake.png"/>
    { visibility ? null :
      // no need for restoreui_i anymore also maybe redesign how this shows up
      // inert bs: https://github.com/facebook/react/issues/17157#issuecomment-1687842532
      <div className="restoreui_v" id="restoreui" inert={visibility ? '' : undefined}>
        <a href="#" className="hiddenlink" onClick={() => {toggleVisible()}}>unhide</a>
      </div>
    }
    <div className={visibility ? 'footer_v' : 'footer_i'} id="footer">
      <nav className="ftr_sub" id="ftr_gen">
        <img id="banner" src={ptiloBanner}/>
          <div className="ftr_sep" id="first_sep"></div>
          <div className="ftr_btn"><a href="#" className="btn_text" onClick={() => {toggleVisible()}}>hide</a></div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn"><a href="#" className="btn_text" onClick="popsearch()">search</a></div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn"><a href="#" className="btn_text" onClick={() => {toggleTextSize()}}>text size</a></div>
      </nav>
      <nav className="ftr_sub ftr_usr">
        <div id="loginstr" className="admin none">logged in as <span id="username">guest</span></div>
        <div className="ftr_sep admin none"></div>
        <div className="ftr_btn admin none"><a href="#" className="btn_text" onClick="showpwchange()" id="pwa">change password</a>
        </div>
        <div className="ftr_sep admin none"></div>
        <div className="ftr_btn admin none"><a href="#" className="btn_text" onClick="logout()" id="logout">logout</a></div>
        <div className="ftr_sep admin none"></div>
        <div className="ftr_btn admin"><a href="#" className="btn_text" onClick="showlogin()" id="logina">edit</a></div>
        <div className="ftr_sep"></div>
        <div className="ftr_btn"><a href="#" className="btn_text" onClick="showabout()">about</a></div>
      </nav>
    </div>
    </>
  )
}
