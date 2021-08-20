export default function TodosHeader(state={}, html) {
  return html`
<header>
  <div>
    <h2>Todos</h2>
    <slot name="end">
      <form
       action="/logout"
       method="POST"
      >
        <button>
          Logout
        </button>
      </form>
    </slot>
  </div>
</header>
  `
}
