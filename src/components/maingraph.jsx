import { useContext, useEffect, useState } from "react"
import CytoscapeComponent from "react-cytoscapejs"
import LoadingScreen from './loadingscreen.jsx'
import { CytoscapeContext } from "../cytoscapeContext"
import { load } from "../db"
import { MainGraphStyle } from "./graphconfig"
import mobileCheck from "../mobilecheck.js"
import './maingraph.css'

export default function MainGraph() {
  let { cyRef } = useContext(CytoscapeContext)
  let [loadStateText, setLoadStateText] = useState("querying database") // huh
  let [loadWarnText, setLoadWarnText] = useState('')

  useEffect(() => {
    async function loadgraph() {
      if (cyRef.current) {
        let temporarypls
        try {
          temporarypls = await load()
        } catch (e) {
          setLoadWarnText(e)
        }
        // we still need a lot more than just chars and chartochar relations but temporarypls
        cyRef.current.add(temporarypls[0]) // c
        cyRef.current.add(temporarypls[1]) // e
        cyRef.current.add(temporarypls[2]) // ctc
        cyRef.current.add(temporarypls[3]) // cte
        cyRef.current.$('[category = "events"]').hide()
        cyRef.current.$('[category = "chartoevent"]').hide()
        let coolFactor = 0.99
        if (mobileCheck()) {
          coolFactor = 0.93
          setLoadWarnText('this may take a while on mobile devices')
        }
        setLoadStateText("running layout")
        cyRef.current.elements('[category != "events"][category != "chartoevent"]').layout({
        name: 'cose',
        animate: false,
        boundingBox: { x1: 0, y1: 0, w: 10000, h: 10000 },
        idealEdgeLength: 200,
        coolingFactor: coolFactor
        }).run()
      }
    }

    loadgraph()

    // listener zone (?)
    if (cyRef.current) {
      // need to bring up possibility of adding a layoutstart listener too
      cyRef.current.on('layoutstop', function () {
        // do i still need to setTimeout here i wonder
        setTimeout(function () {
          cyRef.current.center()
          setLoadStateText('done!')
          setLoadWarnText('')
        }, 0)
      })
    }
  }, [cyRef]) // correct? not?

  return (
    <>
      <LoadingScreen loadstate={loadStateText} warnstate={loadWarnText}/>
      <CytoscapeComponent id="cy"
                          boxSelectionEnabled={false}
                          wheelSensitivity={0.1}
                          textureOnViewport={true}
                          stylesheet={MainGraphStyle}
                          cy={(cy) => (cyRef.current = cy)}/>
    </>
  )
}
