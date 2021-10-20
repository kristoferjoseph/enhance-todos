const { http } = require('@architect/functions')
const auth = require('@architect/shared/auth')
const json = require('./json')
const html = require('./html')

exports.handler = http.async(auth, json, html)
