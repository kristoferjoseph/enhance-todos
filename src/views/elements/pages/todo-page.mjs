export default function TodoPage({ html, state={} }) {
  const { attrs } = state
  const { todo={} } = attrs
  const {
    completed=false,
    created='',
    key='',
    text=''
  } = todo
  return html`
<todo-item
  completed="${completed}"
  created="${created}"
  key="${key}"
  text="${text}"
></todo-item>
`
}
