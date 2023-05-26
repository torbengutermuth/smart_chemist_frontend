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

  static async fetchJson (path, method, formData = undefined) {
    try {
      const response = await fetch(path, {
        method: method,
        body: formData
      })
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }

    /**
   * Pause execution of the Program for time in ms
   * @param {Number} time time in ms
   */
  static async sleep (time) {
    return new Promise(resolve => setTimeout(resolve, time, 'done'))
  }

    /**
   * Poll the status of a job until it is not 'pending' or 'running' anymore
   * @param {string} path URL from which to fetch
   * @param {string} jobID String containing Job-ID
   * @param {number} interval Time in ms to wait in betweens polls
   * @param {integer} maxPolls Maximum number of times to poll before exiting
   * @returns {object} Returns json object
   */
  static async pollJob (path, jobID, interval = 1000, maxPolls = 10) {
    try {
      let job = await this.fetchJson(path + jobID + '/', 'GET')
      let currentPoll = 0
      while (job.status === 'pending' || job.status === 'running') {
        currentPoll = currentPoll + 1
        if (currentPoll >= maxPolls) {
          return job
        }
        await this.sleep(interval)
        job = await this.fetchJson(path + jobID + '/', 'GET')
      }
      return job
    } catch (error) {
      console.error(error)
    }
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
      const job_json = await response.json()
      const jsonResponse_raw = await App.pollJob("/jobs/", job_json["job_id"])
      let resulting_json = await App.fetchJson('/jobs_output/' + jsonResponse_raw["output_info"] + "/", 'GET')
      let jsonResponse = resulting_json["output_json"]
      // console.error(jsonResponse.length)
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
