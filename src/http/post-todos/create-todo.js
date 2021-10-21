const arc = require('@architect/functions')
const data = require('@begin/data')
const sanitize = require('xss')

module.exports = async function createTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  todo.created = new Date().toISOString()
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  const table = `todos-${accountId}`
  const newTodo = await data.set({
    table,
    ...todo
  })
  return newTodo
}
