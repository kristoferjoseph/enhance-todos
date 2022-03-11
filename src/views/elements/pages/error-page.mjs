export default function ErrorPage({ html, state={} }) {
  const { attrs } = state
  const { error } = attrs
  return html`
<h1>Oops, something went wrong 😕</h1>
<pre><code>
${JSON.stringify(error, null, 2)}
</code></pre>
`
}