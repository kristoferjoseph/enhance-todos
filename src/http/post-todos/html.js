const createTodo = require('./create-todo')

module.exports = async function HTML(req) {
  try {
    await createTodo(req)
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
      statusCode: 302,
      headers: {
        location: '/todos'
      }
    }
  }
}
