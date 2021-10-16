const arc = require('@architect/functions')
const xhr = require('./xhr')
const html = require('./html')
const auth = require('@architect/shared/auth')

exports.handler = arc.http.async(auth, xhr, html)
