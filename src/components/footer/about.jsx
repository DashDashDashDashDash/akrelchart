import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '../../assets/icons/about/faDiscord'
import { faFeather } from '../../assets/icons/about/faFeather'
import { faGithub } from '../../assets/icons/about/faGithub'

import "../dialog.css"
import "./about.css"
import AboutBanner from '../../assets/images/login-logo.svg'

export default function About({close}) {

  return (
    <div className="center about" id="about">
      <div className="dialog">
        <button type="button" className="close" onClick={close}>╳</button>
        <div id="about-logo">
          <img id="about-banner" src={AboutBanner}/>
        </div>
        <div className="about-name"><span id="about-title">THE ARKNIGHTS<br/>RELATIONSHIP CHART</span><div id="version"><span>ver</span><span>1.0</span></div></div>
        <div id="about-credit"><span>made with ♥ by Dash- & friends</span></div>
        <div id="linkarea">
          <a href="https://discord.com/invite/K5EKm6YFC3">
            <FontAwesomeIcon icon={faDiscord}/>
          </a>
          <a href="https://github.com/DashDashDashDashDash/akrelchart">
            <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a href="https://blog.ptilopsis.network">
            <FontAwesomeIcon icon={faFeather}/>
          </a>
        </div>
      </div>
    </div>
  )
}
