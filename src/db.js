function rename(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function cyte(doc) {
  if (doc["_from"] && doc["_to"]) {
    rename(doc, "_from", "source")
    rename(doc, "_to", "target")
  }
  rename(doc, "_id", "id")
  return doc
}

export async function load() {
  let characters = []
  let events = []
  let chartochar = []
  let chartoevent = []

  try {
    const urls = [
      'https://api.ptilopsis.network/get/characters',
      'https://api.ptilopsis.network/get/events',
      'https://api.ptilopsis.network/get/chartochar',
      'https://api.ptilopsis.network/get/chartoevent'
    ];

    const fetchPromises = urls.map(url => fetch(url));
    const response = await Promise.all(fetchPromises);
    var [chars, eves, charchar, charevent] = await Promise.all(response.map(res => res.json()));
  } catch (e) {
    //loadtext("warn", "failed to connect to the database")
    // do something here
    throw e
  }
  for await (let char of chars) {
    char.category = 'characters'
    char = { data: cyte(char) }
    characters.push(char)
  }
  for await (let eve of eves) {
    eve.category = 'events'
    eve = { data: cyte(eve) }
    events.push(eve)
  }
  for await (let cc of charchar) {
    cc.category = 'chartochar'
    cc = { data: cyte(cc) }
    chartochar.push(cc)
  }
  for await (let ce of charevent) {
    ce.category = 'chartoevent'
    ce = { data: cyte(ce) }
    chartoevent.push(ce)
  }

  // PLEASE LET THIS BE TEMPORARY FUTURE ME
  return [characters, events, chartochar, chartoevent]
}

