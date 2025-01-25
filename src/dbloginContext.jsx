import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({children}) {

  // we pretty much just use the username currently lol
  // but in the near future there will be perms maybe
  // would appreciate guests to exist and to be able to
  // request changes as well but we'll see
  let defaultAccountState = {
    username: "guest", // should this be an ip address like a wiki
    displayName: "Guest"
  }

  let [accountState, setAccountState] = useState(defaultAccountState)


  return (
    <LoginContext.Provider value={{accountState, setAccountState}}>
      {children}
    </LoginContext.Provider>
  )
}

