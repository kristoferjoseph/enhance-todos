const data = require('@begin/data')

module.exports = async function deleteTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const table = `todos-${accountId}`
  const key = arc.http.helpers.bodyParser(req).key
  try {
    await data.destroy({
      table,
      key
    })
    return key
  }
  catch (err) {
    session.error = err
    throw err
  }
}