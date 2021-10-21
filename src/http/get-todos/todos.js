const data = require('@begin/data')

module.exports = async function todos(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const table = `todos-${accountId}`
  const pages = await data.get({
    table,
    limit: 25
  })

  let todos = []
  for await (let todo of pages) {
    delete todo.table
    todos.push(todo)
  }

  todos.sort((a, b) => (a.created < b.created)
    ? -1
    : (a.created > b.created)
      ? 1
      : 0
  )

  return todos
}
