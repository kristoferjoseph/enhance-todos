const getTodos = require('./todos')
const html = require('@begin/enhance')()

module.exports = async function HTML(req) {
  try {
    const todos = await getTodos(req)
    const session = req.session
    const error = session.error
    session.error = ''

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<todos-page todos="${todos}" error="${error}"></todos-page>`

    }
  }
  catch (err) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<error-page error=${err}></error-page>`
    }
  }
}
