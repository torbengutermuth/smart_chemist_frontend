/** Central app component. */
class App {
  /**
   * Central app component.
   * @param {HTMLElement} element - element to bind to
   * @param {string} baseUrl - base URL to send requests to
   */
  constructor (element, baseUrl) {
    this.element = element
    this.baseUrl = baseUrl
    this.viewerId = 'viewer'
    this.modalId = 'modal'
    this.render()

    this.viewer = new Viewer(document.getElementById(this.viewerId))
    this.modal = new FileModal(document.getElementById(this.modalId))

    this.element.addEventListener('submit', (event) => { this.requestData(event) })
  }

  /**
   * Call the server with a request.
   * @param {object} submitEvent - submit event object
   */
  requestData (submitEvent) {
    submitEvent.preventDefault()
    const formData = new FormData(submitEvent.target);
    fetch(this.baseUrl, {
      method: 'POST',
      body: formData
    }).then(async (response) => {
      if (!response.ok) {
        this.modal.showError('Encountered a server error')
        return
      }
      const molecules = await response.json()
      this.modal.hide()
      this.viewer.setMolecules(molecules)
    })
  }

  /** Render the app. */
  render () {
    this.element.innerHTML = `<div id="${this.viewerId}"></div><div id="${this.modalId}"></div>`
  }
}
