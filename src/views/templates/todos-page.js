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

  <script type="module">
  import API from '/components/data/api.js'

  class TodosPage extends HTMLElement {
    constructor () {
      super()
      this.api = API()
      this.handleSubmit = this.handleSubmit.bind(this)
      this.update = this.update.bind(this)
      this.form = this.querySelector('.js-form')
      this.textInput = this.querySelector('.js-text-input')
      this.activeTodosList = this.querySelector('.js-active-todos')
      this.completedTodosList = this.querySelector('.js-completed-todos')
      this.form.addEventListener('submit', this.handleSubmit)
    }

    connectedCallback () {
      this.api.list()
      this.api.subscribe(this.update, [ 'todos' ])
      if (this.isConnected) {
        this.textInput.focus()
      }
    }

    disconnectedCallback () {
      this.api.unsubscribe(this.update)
    }

    update ({ todos }) {
      const activeTodos = todos.filter(t => !t.completed)
      const completedTodos = todos.filter(t => t.completed)
      this.activeTodosList.todos = activeTodos
      this.completedTodosList.todos = completedTodos
      if (this.isConnected) {
        this.textInput.focus()
      }

    }

    handleSubmit (e) {
      e.preventDefault()
      try {
        this.api.create(
          JSON.stringify(
            Object.fromEntries(
              new FormData(this.form)
            )
          )
        )
        this.textInput.value = ''
      }
      catch (err) {
        console.error(err)
      }
    }
  }

  customElements.define('todos-page', TodosPage)
  </script>
`
}
