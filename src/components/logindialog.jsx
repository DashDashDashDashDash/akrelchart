import { useState, useEffect, useContext } from 'react'

import { LoginContext } from '../dbloginContext'

import './logindialog.css'
import LoginBanner from '../assets/images/login-logo.svg'


export default function Login({close}) {

  let [showLoginButton, setShowLoginButton] = useState(false)
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let acc = useContext(LoginContext)

  function login(that) {
    (async function() {
      await acc.login(that)
      // should be fine
      that.elements[1].value = ""
      close()
    })()
  }

  function checklogin(e) {
    if (e.target.name === 'user') {
      setUsername(e.target.value)
    } else if (e.target.name === 'pw') {
      setPassword(e.target.value)
    }
  }

  useEffect(() => {
    if (username && password) {
      setShowLoginButton(true)
    } else {
      setShowLoginButton(false)
    }
  }, [username, password])

  return (
    <div id="login" className="center">
      <form id="loginform" onSubmit={(e) => {
              e.preventDefault()
              login(e.target)
            }}>
        <div id="close_wrapper">
          <a href="#" className="close-button" onClick={close}>
            <div className="in">
              <div className="close-button-block"></div>
              <div className="close-button-block"></div>
            </div>
            <div className="out">
              <div className="close-button-block"></div>
              <div className="close-button-block"></div>
            </div>
          </a>
        </div>
        <div id="loginform-outer">
          <img id="login-logo" src={LoginBanner} />
          <div id="loginform-inner">
            <div className="login-group">
              <label className="login-label">username:</label>
              <input autoFocus id="login-usr" type="text" name="user" onChange={(e) => {checklogin(e)}} />
            </div>
            <div className="login-group">
              <label className="login-label">password:</label>
              <input id="login-pw" type="password" name="pw" onChange={(e) => {checklogin(e)}} />
            </div>
            <div className="login-group">
              <input id="login-btn" className={showLoginButton ? '' : 'invisible'} type="submit" value="Log in" />
              <p className="err" id="lerr"></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
