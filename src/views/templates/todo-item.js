export default function TodoItem(state={}, html) {
  const {
    completed=false,
    created='',
    key='',
    text=''
  } = state
  return html`
<style>
  li {
    display: flex;
    justify-content: space-between;
  }
</style>
<li>
  <form
    action="/todos/${key}"
    method="POST"
  >
    <label for="completed">
    <input
      type="checkbox"
      name="completed"
      ${completed ? 'checked="checked"' : ''}
      >
    </label>
    <label for="text">
    <input
      id="item-text"
      name="text"
      placeholder="${text}"
      type="text"
      value="${text}"
      >
    </label>
      <input
        type="hidden"
        name="key"
        value="${key}"
        >
      <input
        type="hidden"
        name="created"
        value="${created}"
        >
  </form>
  <form
    action="/todos/delete"
    method="POST"
    >
    <input
      type="hidden"
      name="key"
      value="${key}"
      >
    <button>🗑</button>
  </form>
</li>
`
}
