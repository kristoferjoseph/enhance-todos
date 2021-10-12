const arc = require('@architect/functions')
const data = require('@begin/data')
const auth = require('@architect/shared/auth')
const sanitize = require('xss')
const isXHR = require('@architect/shared/is-xhr')

exports.handler = arc.http.async(auth, createTodo)

async function createTodo (req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  todo.created = new Date().toISOString()
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  const table = `todos-${accountId}`
  try {
    const newTodo = await data.set({
      table,
      ...todo
    })

    if (isXHR(req)) {
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        },
        body: JSON.stringify(newTodo)
      }
    }
    else {
      return {
        statusCode: 302,
        headers: {
          location: '/todos',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        }
      }
    }
  }
  catch(err) {
    if (isXHR(req)) {
      return {
        statusCode: err.code,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        },
        body: JSON.stringify({ error: err })
      }
    }
    else {
      session.error = err
      return {
        statusCode: 302,
        headers: {
          location: '/todos',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        }
      }
    }
  }
}
