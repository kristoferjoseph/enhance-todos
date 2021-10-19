module.exports = function TodoPage(state={}, html) {
  const todo = state.todo || {}
  return html`
<todo-item ...${todo}></todo-item>
`
}
