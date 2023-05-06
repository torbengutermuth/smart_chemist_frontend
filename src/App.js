/** Central app component. */
class App {
  /**
   * Central app component.
   * @param {HTMLElement} element - element to bind to
   * @param {string} baseUrl - base URL to send requests to
   */
  constructor (element, baseUrl, bugUrl) {
    this.element = element
    this.baseUrl = baseUrl
    this.bugUrl = bugUrl
    this.viewerId = 'viewer'
    this.fileModalId = 'upload-modal'
    this.toastId = 'toast'
    this.bugReportModalId = 'report-modal'
    this.render()

    this.viewer = new Viewer(document.getElementById(this.viewerId))
    this.modal = new FileModal(document.getElementById(this.fileModalId))
    this.uploadToast = new UploadToast(document.getElementById(this.toastId))
    this.bugReportModal = new BugReportModal(document.getElementById(this.bugReportModalId))

    this.element.addEventListener('submit', (event) => { this.requestData(event) })
    this.element.addEventListener('bugreport', (event) => { this.handleBugReport(event) })
    this.element.addEventListener('submit-bugreport', (event) => { this.submitBugReport(event) })
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
      const jsonResponse = await response.json()
      // last element ist the upload statistics
      // FIXME this should be a different kind of structured data
      let molecules = undefined
      let uploadErrors = undefined
      if (jsonResponse.length > 1) {
        molecules = jsonResponse.slice(0, -1)
        uploadErrors = jsonResponse[jsonResponse.length - 1]
      } else {
        molecules = jsonResponse
      }
      this.modal.hide()
      if (uploadErrors) {
        this.uploadToast.showError(`${uploadErrors["number_problems"]} errors, ${uploadErrors["number_skipped"]} skipped`)
      }
      this.viewer.setMolecules(molecules)
    })
  }

  /** Start bug reporting */
  handleBugReport (bugReportEvent) {
    this.bugReportModal.setMolecule(bugReportEvent.detail.molecule)
    this.bugReportModal.show()
  }

  /** Submit bug report */
  submitBugReport (bugReportSubmission) {
    this.bugReportModal.hide()
    fetch(this.bugUrl, {
      method: 'POST',
      body: bugReportSubmission.detail.formData,
    })
  }

  /** Render the app. */
  render () {
    this.element.innerHTML = `
    <div id="${this.viewerId}"></div>
    <div id="${this.fileModalId}"></div>
    <div id="${this.toastId}"></div>
    <div id="${this.bugReportModalId}"></div>
`
  }
}
