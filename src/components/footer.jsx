import './footer.css'
import ptiloBanner from '../assets/images/banner.png'

export default function Footer() {
  return (
    <>
    <link rel="preload" as="image" src="../assets/images/banner-awake.png"/>
    <div className="footer_v" id="footer">
      <nav className="ftr_sub" id="ftr_gen">
        <img id="banner" src={ptiloBanner}/>
          <div className="ftr_sep" id="first_sep"></div>
          <div className="ftr_btn"><a href="#" className="btn_text" onClick="hide()">hide</a></div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn"><a href="#" className="btn_text" onClick="popsearch()">search</a></div>
          <div className="ftr_sep"></div>
          <div className="ftr_btn"><a href="#" className="btn_text" onClick="toggletextsize()">text size</a></div>
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
