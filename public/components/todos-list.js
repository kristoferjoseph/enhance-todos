class TodosList extends HTMLElement {
  constructor() {
    super()
    const template = document.getElementById('todos-list-template')
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.update = this.update.bind(this)
  }

  update(todos) {
    const items = todos.map(t => `
    <todo-item
      text="${t.text}"
      completed="${t.completed}"
      created="${t.created}"
      key="${t.key}"
    ></todo-item>
  `).join('')
    this.innerHTML = items
  }

  connectedCallback() {
    console.log('TodosList mounted')
  }

  set todos(value=[]) {
    this.update(value)
  }

}

customElements.define('todos-list', TodosList)
export default TodosList
