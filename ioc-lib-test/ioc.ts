class CreateIoc {
  public container: Map<Symbol, { callback: Function }>
  constructor() {
    this.container = new Map()
  }

  get(namespace) {
    const item = this.container.get(namespace)
    if (item) {
      return item.callback()
    } else {
      throw new Error('namespace not found')
    }
  }

  bind(key, callback) {
    this.container.set(key, {
      callback
    })
  }
}

export default CreateIoc