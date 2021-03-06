export default function TodoItem({ html, state={} }) {
  const { attrs } = state
  const {
    completed = false,
    created = '',
    key = '',
    text = ''
  } = attrs

  return html`
<li>
  <form
    class="js-update"
    action="/todos/${key}"
    method="POST"
    >
    <label for="completed">
    <input
      class="js-completed"
      type="checkbox"
      name="completed"
      ${completed ? 'checked="checked"' : ''}
      >
    </label>
    <label for="text">
    <input
      class="js-text"
      name="text"
      placeholder="${text}"
      type="text"
      value="${text}"
      >
    </label>
      <input
        class="js-key"
        type="hidden"
        name="key"
        value="${key}"
        >
      <input
        class="js-created"
        type="hidden"
        name="created"
        value="${created}"
        >
  </form>
  <form
    class="js-destroy"
    action="/todos/delete"
    method="POST"
    >
    <input
      class="js-key"
      type="hidden"
      name="key"
      value="${key}"
      >
    <button>🗑</button>
  </form>
</li>
<script type="module">
import API from '/components/data/api.mjs'

class TodoItem extends HTMLElement {
  constructor () {
    super()
    const template = document.getElementById('todo-item-template')
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.api = API()
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
    this.completedInput = this.shadowRoot.querySelector('.js-completed')
    this.textInput = this.shadowRoot.querySelector('.js-text')
    this.keyInputs = this.shadowRoot.querySelectorAll('.js-key')
    this.createdInput = this.shadowRoot.querySelector('.js-created')
    this.updateForm = this.shadowRoot.querySelector('.js-update')
    this.destroyForm = this.shadowRoot.querySelector('.js-destroy')
    this.updateForm.addEventListener('submit', this.handleUpdate)
    this.destroyForm.addEventListener('submit', this.handleDestroy)
  }

  attributeChangedCallback (name, o, n) {
    if (o !== n) {
      if (name === 'text') {
        this.textInput.value = n
      }
      if (name === 'key') {
        this.keyInputs.forEach(i => i.value = n)
      }
      if (name === 'created') {
        this.createdInput.value = n
      }
      if (name === 'completed') {
        if (n === 'undefined' || n === '') {
          this.completedInput.removeAttribute('checked')
        }
        else {
          this.completedInput.setAttribute('checked', n)
        }
      }
    }
  }

  get text () {
    return this.getAttribute('text')
  }

  set text (value = '') {
    return this.setAttribute('text', value)
  }

  static get observedAttributes () {
    return [
      'completed',
      'created',
      'key',
      'text'
    ]
  }

  handleUpdate (e) {
    e.preventDefault()
    try {
      this.api.update(
        JSON.stringify(
          Object.fromEntries(
            new FormData(this.updateForm)
          )
        )
      )
    }
    catch (err) {
      console.error(err)
    }
  }

  handleDestroy (e) {
    e.preventDefault()
    try {
      this.api.destroy(
        JSON.stringify(
          Object.fromEntries(
            new FormData(this.destroyForm)
          )
        )
      )
    }
    catch (err) {
      console.error(err)
    }
  }
}

customElements.define('todo-item', TodoItem)
</script>
`
}