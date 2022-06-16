export default function TodosList({ html }) {
  return html`
<ul class="js-list">
  <slot></slot>
</ul>
<script type="module">
import TodoItem from '/_static/bundles/todo-item.mjs'

class TodosList extends HTMLElement {
  constructor() {
    super()
    this.update = this.update.bind(this)
    this.list = this.querySelector('.js-list')
  }

  connectedCallback() {
  }

  update(todos) {
    const items = todos.map(state => TodoItem({ state })).join('')
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