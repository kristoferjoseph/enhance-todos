import arc from 'architect/functions'
import auth from 'architect/shared/auth.mjs'
import json from './json.mjs'
import html from './html.mjs'

export const handler = arc.http.async(auth, json, html)
