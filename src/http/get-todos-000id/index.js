const arc = require('@architect/functions')
const data = require('@begin/data')
const render = require('enhance')
const templatePath = '@architect/views/templates'

exports.handler = arc.http.async(readTodo)

async function readTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const pathParameters = req.pathParameters || {}
  const todoId = pathParameters.id
  const edit = req.query &&
    req.query.edit === 'true'

  if (accountId) {
    const table = `todos-${accountId}`
    const pages = await data.get({
      table,
      limit: 25
    })

    let todos = []
    for await (let todo of pages) {
      todos.push(todo)
    }

    todos.sort((a, b) => a.created - b.created)
    const todo = todos.find(t => t.key === todoId)

    if (todo) {
      todo.active = true
    }
    else {
      return {
        statusCode: 302,
        location: '/'
      }
    }
  }

  // TODO: add edit to todo page attributes
  body = `TODO: ${todoId}`
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body
  }
}
