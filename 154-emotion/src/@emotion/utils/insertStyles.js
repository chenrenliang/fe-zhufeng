function insertStyles(serialized) {
    const className = 'css' + "-" + serialized.name;
    const rule = "." + className + "{" + serialized.styles + "}";
    const tag = document.createElement('style');
    tag.setAttribute('data-emotion', 'css');
    tag.appendChild(document.createTextNode(rule));
    document.head.appendChild(tag);
  }
  export default insertStyles;