// not unnecessary!
export class Relation {
  constructor(data) {
    self._from = data.source
    self._to = data.target
    self.createdate = data.blamedate // these are soon to be outdated
    self.author = data.blameuser     // ^
    // self.editdate = data.editdate
    // self.editauthor = data.editauthor
  }
}

export class CharToCharRelation extends Relation {
  constructor(data) {
    super(data)
    self.category = "chartochar"
    self.instance = data.instance
    self.instancedetail = data.instancedetail
    self.sourceurl = data.sourceurl
  }
}

// chartoeventrelation is basically instancerelation
export class CharToEventRelation extends Relation {
  constructor(data) {
    super(data)
    self.category = "chartoevent"
    self.type = data.type // first appeared in, present in, etc.
    self.instancedetail = data.instancedetail
    self.sprite = data.sprite
  }
}

export class InstanceRelation extends CharToEventRelation {
  constructor(data) {
    super(data)
  }
}

export class MentionRelation extends CharToCharRelation {
  constructor(data) {
    super(data)
  }
}

export class AssociationRelation extends CharToCharRelation {
  constructor(data) {
    super(data)
    self.type = data.type // relation or interaction
    self.subtype = data.subtype
    self.subtypereverse = data.subtypereverse
    self.connective = data.connective
  }
}
