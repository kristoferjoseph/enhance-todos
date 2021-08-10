export default function TodosHeader(state={}, html) {
  return html`
<style>
  header div {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    max-width: 30rem;
  }
</style>
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
