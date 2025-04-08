function BasePopoutLine({children}) {
  return (
    <li>
      {children}
      {
      // this is where the buttons should go
      }
    </li>
  )
}


export function InstancePopoutLine({key, edge, evt}) {
  return (
    <BasePopoutLine>
      <p>{edge.data("type")}</p>
      <a href={evt.data("url")}>{evt.data("name")}</a>
      {
        // need to implement login flow to do the buttons & test them.
      }
    </BasePopoutLine>
  )
}

export function AssociationPopoutLine({key, edge, reverse}) {


  return (
    <BasePopoutLine>
      { reverse &&
        <p>by </p>
      }
      <img src={`/images/icon/{reverse ? edge.data("target") : edge.data("source")}`}/>
      <p>{ele.data}</p>
    </BasePopoutLine>
  )
}
2
