const updateTodo = require('./update-todo')
const Enhance = require('@begin/enhance')
const html = Enhance({
  templates: '@architect/views/templates',
  modules: '_static/components'
})

module.exports = async function HTML(req) {
  try {
    await updateTodo(req)
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
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: html`<error-page error="${err}"></error-page>`
    }
  }
}
