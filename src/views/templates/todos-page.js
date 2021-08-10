export default function TodosPage(state={}, html) {
  const todos = state.todos || []
  const todoItem = todo => html`
<todo-item ...${todo}></todo-item>
  `
  const activeTodos = todos
    .filter(t => !t.completed)
    .map(t => todoItem(t))
    .join('')

  const completedTodos = todos
    .filter(t => t.completed)
    .map(t => todoItem(t))
    .join('')

  const areCompleted = completedTodos.length > 0
  return html`
  <style>
    :root {
      font-family: sans-serif;
    }
    div {
      margin: 0 auto;
      max-width: 30rem;
    }
    #text-input {
      width: 100%;
    }
  </style>
  <todos-header></todos-header>
  <div>

    <form
     action="/todos"
     method="POST"
    >
      <input
       id="text-input"
       autofocus
       name="text"
       type="text"
       placeholder="Enter your todo"
      >
    </form>
      <todos-list>
        ${activeTodos}
      </todos-list>

      ${areCompleted
        ? html`
        <h3>Completed</h3>
        <todos-list>
          ${completedTodos}
        </todos-list>
         `
        : ''
      }
  </div>
`
}
