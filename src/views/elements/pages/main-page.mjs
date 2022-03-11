export default function MainPage ({ html, state={} }) {
  const { attrs } = state
  const { title='Main Page' } = attrs
  return html`
<h1>
  <slot name=title>${title}</slot>
  <a href="/todos">Todos</a>
</h1>
`
}
