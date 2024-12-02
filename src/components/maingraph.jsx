import { useContext, useEffect } from "react"
import CytoscapeComponent from "react-cytoscapejs"
import { CytoscapeContext } from "../cytoscapeContext"
import { load } from "../db"
import { MainGraphStyle } from "./graphconfig"
import './maingraph.css'

export default function MainGraph() {
  let { cyRef } = useContext(CytoscapeContext)

  useEffect(() => {
    async function loadgraph() {
      if (cyRef.current) {
        let temporarypls = await load()
        cyRef.current.add(temporarypls[0]) // c
        cyRef.current.add(temporarypls[2]) // ctc
        cyRef.current.elements('[category != "events"][category != "chartoevent"]').layout({
        name: 'cose',
        animate: false,
        boundingBox: { x1: 0, y1: 0, w: 10000, h: 10000 },
        idealEdgeLength: 200,
        coolingFactor: 0.99
        }).run()
      }
    }

    loadgraph()
  }, [])

  return (
    <CytoscapeComponent id="cy"
                        boxSelectionEnabled={false}
                        wheelSensitivity={0.1}
                        textureOnViewport={true}
                        stylesheet={MainGraphStyle}
                        cy={(cy) => (cyRef.current = cy)}/>
  )
}
