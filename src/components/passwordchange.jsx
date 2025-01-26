import './dialog.css'
import './passwordchange.css'


// putting the password change logic here instead of the mysterious db.js file is better
export default function PasswordChange({close}) {

  function changepw(form) {
    // anonymous functions make async functions less of a pain to read in react
    // maybe
    (async function(that) {
      const fd = new FormData(that)
      try {
        let r = await fetch("https://api.ptilopsis.network/admin/passwordchange", {
          method: "POST",
          body: fd,
          credentials: "include"
        })

        if (r.ok) {
          close()
          //loadtext("pwerr", "")
        } else {
          //loadtext("pwerr", r.statusText.toLowerCase())
        }
      } catch (e) {
        // gotta do something about this
        throw(e)
      }

    })(form)
  }

  return (
    <div id="pw" className="center">
      <form onSubmit={(e) => {
              e.preventDefault()
              changepw(e.target)
            }}>
        <button type="button" className="close" onClick={close}>╳</button>
        <label>new password</label>
        <input type="password" name="pw" required minLength="8" />
        <label>confirm</label>
        <input type="password" name="pwc" required minLength="8" />
        <br/>
        <input type="submit" value="change password"/>
        <p className="err" id="pwerr"></p>
      </form>
    </div>
  )
}
