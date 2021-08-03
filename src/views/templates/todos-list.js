export default function TodosList(state={}, html) {
  const todos = state.todos || []
  const items = todos.map(todo => html`
  <todo-item ...${todo}></todo-item>
`).join('')

  return `
<ul>
  ${items}
</ul>
`
}
