import { useContext, useEffect, useState } from "react"
import CytoscapeComponent from "react-cytoscapejs"
import LoadingScreen from './loadingscreen.jsx'
import { CytoscapeContext } from "../cytoscapeContext"
import { load } from "../db"
import { MainGraphStyle } from "./graphconfig"
import './maingraph.css'

export default function MainGraph() {
  let { cyRef } = useContext(CytoscapeContext)
  let [loadStateText, setLoadStateText] = useState("querying database") // huh

  useEffect(() => {
    async function loadgraph() {
      if (cyRef.current) {
        let temporarypls = await load()
        // we still need a lot more than just chars and chartochar relations but temporarypls
        cyRef.current.add(temporarypls[0]) // c
        cyRef.current.add(temporarypls[2]) // ctc
        setLoadStateText("running layout")
        cyRef.current.elements('[category != "events"][category != "chartoevent"]').layout({
        name: 'cose',
        animate: false,
        boundingBox: { x1: 0, y1: 0, w: 10000, h: 10000 },
        idealEdgeLength: 200,
        coolingFactor: 0.99 // mobile needs this set to like 0.95
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
          //setWarnText('') no(t yet)
        }, 0)
      })
    }
  }, [cyRef]) // correct? not?

  return (
    <>
      <LoadingScreen loadstate={loadStateText}/>
      <CytoscapeComponent id="cy"
                          boxSelectionEnabled={false}
                          wheelSensitivity={0.1}
                          textureOnViewport={true}
                          stylesheet={MainGraphStyle}
                          cy={(cy) => (cyRef.current = cy)}/>
    </>
  )
}
