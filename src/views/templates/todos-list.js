export default function TodosList(state={}, html) {
  return html`
<ul class="js-list">
  <slot></slot>
</ul>
  `
}
