const readTodo = require('./read-todo')
const html = require('@begin/enhance')()

module.exports = async function HTML(req) {
  try {
    const todo = await readTodo(req)
    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<todo-page todo=${todo}></todo-page>`

    }
  }
  catch (err) {
    return {
      statusCode: 500,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<error-page error=${err}></error-page>`
    }
  }
}
