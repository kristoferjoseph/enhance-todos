export default function BaseList(state={}, html) {
  return html`
<ul>
  <slot></slot>
</ul>
  `
}
