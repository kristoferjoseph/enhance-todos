module.exports = function TodosPage(state={}, html) {
  const { error, todos=[] } = state
  const todoItem = (todo) =>
    html`
<todo-item ...${todo}></todo-item>
  `
  const errorItem = error => `
<h1>Oops, something went wrong 😕</h1>
<p>
  ${error}
</p>
    `
  const activeTodos = todos
    .filter((t) => !t.completed)
    .map((t) => todoItem(t))
    .join('')

  const completedTodos = todos
    .filter((t) => t.completed)
    .map((t) => todoItem(t))
    .join('')

  return html`
<!-- HACK: this tells enhance to include the todo-item template -->
<todo-item style="display:none"></todo-item>
<div class="middle">
  <todos-header></todos-header>

  ${error ? errorItem(error) : '' }

  <form
   class="js-form"
   action="/todos"
   method="POST"
  >
    <input
     class="js-text-input"
     autofocus
     name="text"
     type="text"
     placeholder="Enter your todo"
    >
  </form>

  <todos-list class='js-active-todos'>
    ${activeTodos}
  </todos-list>

  <h3>Completed</h3>
  <todos-list class='js-completed-todos'>
    ${completedTodos}
  </todos-list>
</div>
`
}
