const btoa = require("btoa")
const atob = require("atob")

const encode = (str) => {
    return btoa(unescape(encodeURIComponent(str || "")));
  }      
const decode = (bytes) => {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
  }

  module.exports = {
    encode,
    decode,
  }