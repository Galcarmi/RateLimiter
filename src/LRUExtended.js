var LRU = require("lru-cache");

const options = {
  max: 10000,
  length: function (n, key) {
    return n.length;
  },
  dispose: function (key, n) {
    //   n.close();
  },
  maxAge: 1000 * 60 * 6,
};

export class LRUExtended extends LRU {
  constructor(i_requestsToAccumulate) {
    super({max: i_requestsToAccumulate, ...options});
  }

  RefreshItemLengthById(id) {
    this.set(id, this.get(id));
  }
}
