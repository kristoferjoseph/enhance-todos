export default function TodosList(state={}) {
  const todos = state.todos || []
  const items = todos.map(todo => `
  <todo-item text=${todo.text || ''}></todo-item>
`).join('')

  return `
<ul>
  ${items}
</ul>
`
}
