module.exports = function TodosHeader(state={}, html) {
  return html`
<header>
  <div>
    <h2>Todos</h2>
    <form
     action="/logout"
     method="POST"
    >
    <button>
      Logout
    </button>
    </form>
  </div>
</header>
<script type="module">
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
</script>
  `
}
