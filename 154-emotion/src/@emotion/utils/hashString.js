function hashString(keys) {
    let val = 10000000;
    for (let i = 0; i < keys.length; i++) {
      val += keys.charCodeAt(i);
    }
    return val.toString(16).slice(0, 6);
  }
  export default hashString;