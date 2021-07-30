class TodosList extends HTMLElement {
  constructor() {
    super()
    this.update = this.update.bind(this)
    this.list = this.querySelector('ul')
  }

  update(state={}) {
    console.log('UPDATE: ', state)
  }

  connectedCallback() {
    console.log('TodosList mounted')
    this.list = this.querySelector('ul')
  }

  static get observedAttributes() {
    return [
      'todos'
    ]
  }

  attributeChangedCallback(name, o, n) {
    console
    if(name === 'todos') {
      if (o !== n) {
        this.update({ todos: n })
      }
    }
  }

}

customElements.define('todos-list', TodosList)
export default TodosList
