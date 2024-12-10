import { useState, useEffect, useContext } from 'react'
import { CytoscapeContext } from '../cytoscapeContext'
import ptilopEyesClosed from "../assets/images/loading/closed.webp"
import ptilopEyesOpen from "../assets/images/loading/open.webp"
import ptilopLEyeOpen from "../assets/images/loading/lopen.webp"
import ptilopREyeOpen from "../assets/images/loading/ropen.webp"
import './loadingscreen.css'

// loading screen should be brought up whenever a layout runs again
// so we shouldn't just assume it'll only run once...
// ...but how to maintain that state...
export default function LoadingScreen({ loadstate }) {

  let [ptilopSrc, setPtilopSrc] = useState(ptilopEyesClosed)
  let [warnText, setWarnText] = useState('') // move this to its parent later

  let { cyRef } = useContext(CytoscapeContext)

  useEffect(() => {
    if (cyRef.current) {
      // need to bring up possibility of adding a layoutstart listener too
      cyRef.current.on('layoutstop', function () {
        // do i still need to setTimeout here i wonder
        setTimeout(function () {
          cyRef.current.center()
          setWarnText('') // no
        }, 0)
        let eggms = new Date().getMilliseconds()
        if (eggms % 60 === 0) {
          setPtilopSrc(ptilopREyeOpen)
        } else if (eggms % 90 === 0) {
          setPtilopSrc(ptilopLEyeOpen)
        } else {
          setPtilopSrc(ptilopEyesOpen)
        }
      })
    }
  }, [cyRef]) // correct? not?

  return (
    <div className={loadstate == 'done!' ? "loading_i" : "loading_v"} id="loading">
      <div>
        <p id="l1">PTILOPSIS</p>
        <img id="ptilop" src={loadstate == 'done!' ? ptilopSrc : ptilopEyesClosed}/>
        <p id="l2">NETWORK</p>
        <p>Please wait...</p>
        <p id="load">{loadstate}</p>
        <p id="warn">{warnText}</p>
        <p>the relations chart is currently a work in progress.</p>
        <p>data is incomplete and it can be incorrect!</p>
      </div>
    </div>
  )
}
