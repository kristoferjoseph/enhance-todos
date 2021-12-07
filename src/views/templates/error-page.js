module.exports = function ErrorPage(state={}, html) {
  const { error } = state
  return html`
<h1>Oops, something went wrong 😕</h1>
<pre><code>
${JSON.stringify(error, null, 2)}
</code></pre>
`
}