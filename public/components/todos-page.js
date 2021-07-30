class TodosPage extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log('TodosPage mounted')
  }

}

customElements.define('todos-page', TodosPage)
