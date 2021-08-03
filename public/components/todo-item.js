class TodoItem extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log('TodoItem mounted')
  }

  get text() {
    return this.getAttribute('text')
  }

  set text(value='') {
    return this.setAttribute('text', value)
  }

  static get observedAttributes() {
    return [
      'text'
    ]
  }

  static template() {
    return (state={}) => `
<todo-item
  text=${state.text || ''}
></todo-item>
  `
  }

  attributeChangedCallback(name, o, n) {
    console
    if(name === 'text') {
      if (o !== n) {
        this.text = n
      }
    }
  }
}

customElements.define('todo-item', TodoItem)
export default TodoItem
