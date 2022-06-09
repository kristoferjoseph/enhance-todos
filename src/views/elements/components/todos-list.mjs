export default function TodosList({ html }) {
  return html`
<ul class="js-list">
  <slot></slot>
</ul>
<script type="module">
import todoItem from '/_bundles/todo-item-browser.mjs'

class TodosList extends HTMLElement {
  constructor() {
    super()
    const template = document.getElementById('todos-list-template')
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.update = this.update.bind(this)
    this.list = this.shadowRoot.querySelector('.js-list')
  }

  update(todos) {
    const items = todos.map(state => todoItem({ state })).join('')
    this.list.innerHTML = items
  }

  set todos(value=[]) {
    this.update(value)
  }

}

customElements.define('todos-list', TodosList)
</script>
  `
}