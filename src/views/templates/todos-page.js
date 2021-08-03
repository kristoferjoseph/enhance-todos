export default function TodosPage(state={}, html) {
  const todos = state.todos || []
  return html`
<html>
  <head>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧪</text></svg>">
  </head>
  <body>

    <form
     action="/logout"
     method="POST"
    >
      <button>
        Logout
      </button>
    </form>

    <div>

      <form
       action="/todos"
       method="POST"
      >
        <input
         name="text"
         type="text"
         placeholder="Enter your todo"
        >
      </form>
      <todos-list todos=${todos}></todos-list>

    </div>

  </body>
</html>
`
}
