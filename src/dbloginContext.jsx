import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({children}) {

  // we pretty much just use the username currently lol
  // but in the near future there will be perms maybe
  // would appreciate guests to exist and to be able to
  // request changes as well but we'll see
  let defaultAccountState = {
    username: "", // should this be an ip address like a wiki
    displayName: "Guest"
  }

  let [accountState, setAccountState] = useState(defaultAccountState)

  // preventdefault on the component itself is better maybe
  async function login(form) {
    const data = new FormData(form)
    try {
      let r = await fetch("https://api.ptilopsis.network/login", {
        method: "POST",
        body: data,
        credentials: "include"
      })

      if (r.ok) {
        let displayname = await r.text()
        /*document.querySelectorAll('.admin').forEach((ele) => {
          ele.classList.toggle('none')
        })
        document.querySelector('.ftr_usr').classList.toggle('ftr_admin')*/
        //loggedin = true // hmmmmmmm
        setAccountState({
          username: data.get("user"),
          displayName: displayname
        })
      } else {
        throw(r.statusText())
      }
    } catch (e) {
      // have to check if this still works and uh
      throw(e)
      //loadtext("lerr", await r.statusText.toLowerCase())
    }
  }

  async function logout() {
    // basically no way for this to fail as this can only be called while logged in
    let r = await fetch("https://api.ptilopsis.network/logout", {
      credentials: "include"
    })

    if (r.ok) {
      // should be easy to reimplement the closedialog if i include account logic
      // into the conditional for when to show the dialogs themselves
      //closedialog()
      setAccountState({
        username: '',
        displayName: 'Guest'
      })
    }


  }

  return (
    <LoginContext.Provider value={{accountState, login, logout}}>
      {children}
    </LoginContext.Provider>
  )
}

