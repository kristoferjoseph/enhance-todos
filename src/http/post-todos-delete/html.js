const deleteTodo = require('./delete-todo')

module.exports = function HTML(req) {
  try {
    deleteTodo(req)
    return {
      statusCode: 302,
      headers: {
        location: '/todos'
      }
    }
  }
  catch (err) {
    req.session.error = err.message
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        location: '/todos'
      }
    }
  }
}
