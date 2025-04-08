import { useContext, useEffect, useState } from 'react'

import { CytoscapeContext } from '../cytoscapeContext'
import { LoginContext } from '../dbloginContext'

import { InstancePopoutLine, AssociationPopoutLine } from './popoutline'

import './popout.css'
import PtiloPlaceholder from '/images/fullcg/ptiloplaceholder.webp'

// at some point, "some_directory/.webp" is called and it doesn't 404 cause vite.
// this fails gracefully sometimes as instead of erroring out, a broken image is sent
// need to check if this behavior happens at build, but i'm 90% sure that's not the case

export default function Popout({character, show, close}) {
  let acc = useContext(LoginContext)
  let { cyRef } = useContext(CytoscapeContext)
  let fetchq = []

  let [fullcgSource, setFullcgSource] = useState(null)
  let [validFaction, setValidFaction] = useState("no-icon")
  let [popoutLoading, setPopoutLoading] = useState(false)
  let [associations, setAssociations] = useState({})


  useEffect(() => {
    (async function() {
      setPopoutLoading(true)
      setValidFaction("no-icon")

      // loading gfx takes an eternity compared to crunching local data
      let ac = new AbortController()
      let as = ac.signal
      fetchq.push(ac)
      let blob
      let image = await fetch(`../images/fullcg/${character?.data('_key')}.webp`, {
        signal: as
      })
      if (image.ok) {
        blob = URL.createObjectURL(await image.blob())
      } else {
        blob = "../images/faction/blank.webp"
      }

      fetchq.filter((ele) => { ele !== as })
      setFullcgSource(blob)
      setPopoutLoading(false)

      // would be nice if a similar thing was made for the faction image but... later

      // right now this fetches the image twice pls fix
      let imageReq = null
      try {
        if (!character?.data("sub-faction")) {
          setValidFaction("no-icon")
        } else {
          imageReq = await fetch(`/images/faction/${character?.data("sub-faction")}.webp`)
        }
        if (imageReq?.ok) {
          setValidFaction(character?.data("sub-faction"))
        } else {
          if (!character?.data("faction")) {
            throw("fallback")
          }
          imageReq = await fetch(`/images/faction/${character?.data("faction")}.webp`)
          if (imageReq?.ok) {
            setValidFaction(character?.data("faction"))
          } else {
            setValidFaction("no-icon")
          }
        }
      } catch (e) {
        setValidFaction("no-icon")
      }


      getAssociations(character ? character : null)
    })()
  }, [character])

  function getAssociations(character) {
    if (!character) { return }
    let ctcedges = character?.connectedEdges().filter((ele) => ele.data("category") === "chartochar")

    // ok, so we need to modify the edges to display the
    // proper character while still retaining the same
    // id info so that it can be edited...
    // they need to not be read-only because of this

    // this is because we don't want to have the list elements
    // querying cytoscape for probably a good reason
    // (one cytoscape query here as opposed to 100 queries for
    // someone with 100 associations)
    let redundant = {
      relations: {
        from: [],
        to: []
      },
      interactions: {
        from: [],
        to: []
        
      },
      mentions: {
        from: [],
        by: []
      }
    }

    // i'll be honest i barely know why this works but it kind of does
    for (let e of ctcedges) {
      switch (e.data("type")) {
        case "mention":
          if (e.data("source") === character.data("id")) {
            // should reverse it
            let char = cyRef.current.$id(e.data("target"))
            let copy = {...e}
            copy.source = char
            redundant.mentions.from.push(copy)
          } else {
            // mentions have the specialty of always being treated as
            // mentioned *by* someone else, which is why this
            // additional logic isn't in the block above
            redundant.mentions.by.push(e)
          }
          break;
        case "relation":
          if (e.data("source") === character.data("id")) {
            let char = cyRef.current.$id(e.data("target"))
            let copy = {...e}
            copy.source = char
            redundant.relations.from.push(copy)
          } else {
            redundant.relations.to.push(e)
          }
          break;
        case "interaction":
          if (e.data("source") === character.data("id")) {
            let char = cyRef.current.$id(e.data("target"))
            let copy = {...e}
            copy.source = char
            redundant.interactions.from.push(copy)
          } else {
            redundant.interactions.to.push(e)
          }
          break;
      }
    }

    console.log(redundant)
    setAssociations(redundant)
  }

  // inert bs: https://github.com/facebook/react/issues/17157#issuecomment-1687842532
  return (
    <div id="popoutcontainer" className={show ? "popoutcontainer_v" : "popoutcontainer_i"} inert={show ? null : ''}>
      <img className={popoutLoading ? 'imgloading' : ''} src={fullcgSource}/>
      <div id="popout">
        <a href="#" className="hiddenlink" id="collapse" onClick={close}>collapse &Gt;</a>
        <h1 className="popout_name">{character?.data("name")}</h1>
        <img src={`/images/faction/${validFaction}.webp`}/>
        <ul id="list">
          <li>{character?.data("faction")}</li>
          <li>{character?.data("sub-faction")}</li>
        </ul>
        <div className="admin none">
          <a href="#" className="" onClick="showdialog('chard', cy.$(':selected')[0])">edit properties</a>
        </div>
        <section>
          <h2 className="popout_section clps-btn">INSTANCES</h2>
          <div className="collaps-content">
            <ul id="instancelist">
              {
                // yeah...
                character?.connectedEdges().filter((ele) => ele.data("category") === "chartoevent").map((edge) => <InstancePopoutLine edge={edge} evt={cyRef.current.$id(edge.data("target"))}/>)
              }
            </ul>
            <a href="#" className="admin none" onClick="showdialog('instanced', cy.$(':selected')[0])">add instance</a>
          </div>
        </section>
        <section>
          <h2 className="popout_section clps-btn">ASSOCIATIONS</h2>
          <div className="collaps-content">
            <h3 className="popout_interact">Relations</h3>
            <ul id="relations">
              {
                //associations?.relations.from.map((ele) => <AssociationPopoutLine edge={ele.data}/>)
              }
            </ul>
            <h3 className="popout_interact">Interactions</h3>
            <ul id="interactions"></ul>
            <a href="#" className="admin none" onClick="showdialog('assocd', cy.$(':selected')[0])">add association</a>
          </div>
        </section>
        <section>
          <h2 className="popout_section clps-btn">REFERENCES</h2>
          <div className="collaps-content">
            <h3 className="popout_interact">Mentioned</h3>
            <ul id="mentionby">
              {
                associations?.mentions?.by?.map((ele) => <AssociationPopoutLine edge={ele} reverse={true}/>)
              }
            </ul>
            <h3 className="popout_interact">Mentions</h3>
            <ul id="mentions">
              {
                associations?.mentions?.from?.map((ele) => <AssociationPopoutLine edge={ele}/>)
              }
            </ul>
            <a href="#" className="admin none" onClick="showdialog('mentiond', cy.$(':selected')[0])">add mention</a>
          </div>
        </section>
      </div>
    </div>
  )
}
