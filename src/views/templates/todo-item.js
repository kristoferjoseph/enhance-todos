export default function TodoItem(state={}, html) {
  const { completed=false, created, key, title, text } = state
  return `
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
        <button>💾</button>
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
