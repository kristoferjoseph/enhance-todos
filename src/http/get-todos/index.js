const { http } = require('@architect/functions')
const auth = require('@architect/shared/auth')
const xhr = require('./xhr')
const html = require('./html')

exports.handler = http.async(auth, xhr, html)
