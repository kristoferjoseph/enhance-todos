export default function TodosList(state={}, html) {
  const todos = state.todos || []
  const todoItem = todo => html`
<todo-item ...${todo}></todo-item>
`
  const items = todos
    .filter(t => !t.completed)
    .map(t => todoItem(t))
    .join('')
  const completedItems = todos
    .filter(t => t.completed)
    .map(t => todoItem(t))
    .join('')
  const areCompleted = completedItems.length > 0
  return html`<base-list>${items}</base-list>
${areCompleted
  ? html`
<h3>Completed</h3>
<base-list>${completedItems}</base-list>
  `
  : ''
}
`
}
