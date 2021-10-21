const arc = require('@architect/functions')
const data = require('@begin/data')
const sanitize = require('xss')

module.exports = async function UpdateTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  todo.updated = new Date().toISOString()
  const table = `todos-${accountId}`
  const updatedTodo = await data.set({
    table,
    ...todo
  })
  return updatedTodo
}
