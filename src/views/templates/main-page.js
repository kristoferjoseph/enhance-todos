module.exports = function MainPage (state = {}) {
  const { title = 'Main Page' } = state
  return `
<h1>
  <slot name=title>${title}</slot>
  <a href="/todos">Todos</a>
</h1>
`
}
