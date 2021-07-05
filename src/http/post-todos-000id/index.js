const arc = require('@architect/functions')
const data = require('@begin/data')
const sanitize = require('xss')

exports.handler = arc.http.async(updateTodo)

async function updateTodo(req) {
  let session = req.session || {}
  let account = session.account || {}
  let accountId = account.id
  let todo = arc.http.helpers.bodyParser(req)
  todo.updated = new Date().toISOString()
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)

  if (accountId) {
    const table = `todos-${accountId}`
    await data.set({
      table,
      ...todo
    })

    return {
      statusCode: 302,
      headers: {
        location: `/todos/${key}`,
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
  else {
    return {
      statusCode: 302,
      headers: {
        location: '/',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
}
