const createTodo = require('./create-todo')

module.exports = async function HTML(req) {
  try {
    await createTodo(req)
    return {
      statusCode: 302,
      headers: {
        location: '/todos',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      body: JSON.stringify({ error: err })
    }
  }
}