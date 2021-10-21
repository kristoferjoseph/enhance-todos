const deleteTodo = require('./delete-todo')

module.exports = function HTML(req) {
  try {
    deleteTodo(req)
    return {
      statusCode: 302,
      headers: {
        location: '/todos',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
  catch (err) {
    req.session.error = err.message
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        location: '/todos',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      }
    }
  }
}
