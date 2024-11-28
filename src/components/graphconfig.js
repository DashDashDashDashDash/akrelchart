export let MainGraphStyle = [
  {
    selector: 'node[category="characters"]',
    style: {
      'background-color': '#d9d9d9',
      'background-opacity': '0',
      'width': '218',
      'height': '242',
      'shape': 'rectangle',
      'label': 'data(name)',
      'text-margin-y': '-34px',
      'font-size': '26pt',
      'text-wrap': 'ellipsis',
      'text-max-width': '196',
      'text-valign': 'bottom',
      'background-image': function (ele) {
        return ["../images/icon/" + ele.data("_key") + ".webp",
          "../images/polaroid.webp"]
      },
      'background-position-x': '18px',
      'background-position-y': '21px',
      'background-width': 'auto 218px',
      'background-image-containment': 'over',
      'background-clip': 'none',
      'background-repeat': 'no-repeat',
      'font-family': 'NuberNext Condensed',
    }
  },
  {
    selector: ':selected',
    style: {
      'border-width': '8px',
      'border-style': 'solid',
      'border-color': 'white',
      'border-opacity': '0.9'
    }
  },
  {
    selector: '.smalltext',
    style: {
      'font-size': '20pt',
      'text-wrap': 'none',
      'text-max-width': '0',
    }
  }
]
