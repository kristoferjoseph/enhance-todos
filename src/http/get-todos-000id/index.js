const arc = require('@architect/functions')
const data = require('@begin/data')
const auth = require('@architect/shared/auth')
const Enhance = require('@begin/enhance')
const html = Enhance({
  templates: '@architect/views/templates'
})

exports.handler = arc.http.async(auth, readTodo)

async function readTodo (req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const pathParameters = req.pathParameters || {}
  const todoId = pathParameters.id
  /*
  // TODO: Add todo edit form
  const edit = req.query &&
    req.query.edit === 'true'
  */

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

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    // TODO: Return todo view in read or edit mode
    body: html`TODO: ${todoId}`
  }
}
