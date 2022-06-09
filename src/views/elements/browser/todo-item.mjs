export default function TodoItem({ state }) {
 const { text, completed, created, key } = state
 return `
<todo-item
  text="${text}"
  ${completed ? `completed="${completed}"` : ''}
  created="${created}"
  key="${key}"
></todo-item>
 `
}