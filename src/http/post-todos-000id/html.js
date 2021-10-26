const updateTodo = require('./update-todo')

module.exports = async function HTML(req) {
  try {
    await updateTodo(req)
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
