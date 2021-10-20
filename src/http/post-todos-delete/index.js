const arc = require('@architect/functions')
const json = require('./json')
const html = require('./html')
const auth = require('@architect/shared/auth')

exports.handler = arc.http.async(auth, json, html)
