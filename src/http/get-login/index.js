const arc = require('@architect/functions')
const github = require('./github')

exports.handler = arc.http.async(login)

async function login(req) {
  let { query: { code } } = req
  if (code) {
    try {
      let account = await github(req)
      return {
        session: { account },
        location: '/'
      }
    }
    catch(err) {
      return {
        statusCode: err.code,
        body: err.message
      }
    }
  }
  else {
    return {
      location: '/'
    }
  }
}

