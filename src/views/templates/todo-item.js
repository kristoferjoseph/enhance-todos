export default function TodoItem(state={}, html) {
  const { completed=false, created, key, title, text } = state
  return `
<li>
  <form
    action="/todos/${key}"
    method="POST"
  >
    <input
      type="checkbox"
      name="completed"
      ${completed ? 'checked="checked"' : ''}
      >
    <input
      name="text"
      placeholder="${text}"
      type="text"
      value="${text}"
      >
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
