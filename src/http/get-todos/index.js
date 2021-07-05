require = require('esm')(module) // eslint-disable-line
const render = require('enhance')
const arc = require('@architect/functions')
const data = require('@begin/data')
const templatePath = '@architect/views/templates'

exports.handler = arc.http.async(listTodos)

async function listTodos(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id

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
    todos.sort((a, b) => a - b)

    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: render(`
<todos-page todos=${todos}></todos-page>
    `,{},
      templatePath)
    }
  }
  else {
    return {
      statusCode: 302,
      location: '/'
    }
  }
}
