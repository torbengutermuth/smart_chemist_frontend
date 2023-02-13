class App {
  constructor (element, baseUrl='/api/names') {
    this.element = element
    this.baseUrl = baseUrl
    this.viewerId = 'viewer'
    this.modalId = 'modal'
    this.render()

    this.viewer = new Viewer(document.getElementById(this.viewerId))
    this.modal = new FileModal(document.getElementById(this.modalId))

    this.element.addEventListener('submit', (event) => { this.requestData(event) })
  }

  requestData (submitEvent) {
    submitEvent.preventDefault()
    console.log(submitEvent)
    const formData = new FormData(submitEvent.target);
    fetch(this.baseUrl, {
      method: 'POST',
      body: formData
    }).then(async (response) => {
      if (!response.ok) {
        return
      }
      const molecules = await response.json()
      this.modal.hide()
      this.viewer.setMolecules(molecules)
    })
  }

  render () {
    this.element.innerHTML = `<div id="${this.viewerId}"></div><div id="${this.modalId}"></div>`
  }
}
