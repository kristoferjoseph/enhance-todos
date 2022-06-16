// node_modules/@enhance/base-element/index.mjs
var BaseElement = class extends HTMLElement {
  constructor() {
    super();
    const id = this.getAttribute("id");
    const authored = document.getElementById(`${id}-template`);
    if (authored) {
      this.replaceChildren(authored.content.cloneNode(true));
    }
    const name = this.tagName.toLowerCase();
    const template = document.getElementById(`${name}-template`);
    if (template) {
      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    }
  }
};
export {
  BaseElement as default
};
