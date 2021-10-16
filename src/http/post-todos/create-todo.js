const arc = require('@architect/functions')
const data = require('@begin/data')
const sanitize = require('xss')

module.exports = async function createTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  console.log('TODO: ', todo)
  todo.created = new Date().toISOString()
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  try {
    const table = `todos-${accountId}`
    console.log('TABLE: ', table)
    console.log('ARC_ENV: ', process.env.ARC_ENV)
    const newTodo = await data.set({
      table,
      ...todo
    })
    console.log('NEW TODO: ', newTodo)
    return newTodo
  }
  catch (err) {
    session.error = err.message
    console.error(err.message)
    throw err
  }
}
