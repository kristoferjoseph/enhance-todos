class TodosHeader extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log('TodosHeader mounted')
  }
}

customElements.define('todos-header', TodosHeader)
export default TodosHeader
