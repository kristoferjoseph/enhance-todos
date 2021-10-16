class TodosHeader extends HTMLElement {
  constructor () {
    super()
    const template = document.getElementById('todos-header-template')

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
  }
}

customElements.define('todos-header', TodosHeader)
export default TodosHeader
