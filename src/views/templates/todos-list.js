export default function TodosList(state={}) {
  const todos = state.todos || []
  const items = todos.map(todo => `
  <todo-item
    created="${todo.created}"
    key="${todo.key}"
    text="${todo.text || ''}"
  ></todo-item>
`).join('')

  return `
<ul>
  ${items}
</ul>
`
}
