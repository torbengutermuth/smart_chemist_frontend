/** Bug report modal */
class BugReportModal {
  /**
   * Bug report modal
   * @param {HTMLElement} element - element to bind to
   * @param {string} modalId - ID of the modal
   */
  constructor (element, modalId = 'bug-report-modal') {
    this.element = element
    this.modalId = modalId
    this.errorMessageId = this.modalId + '-error'
    this.render()

    this.bootstrapModal = new bootstrap.Modal(document.getElementById(this.modalId))
    this.form = this.element.getElementsByTagName('form')[0]
    this.form.addEventListener('submit', (event) => { this.validate(event) })
    this.molecule = undefined
    this.errorMessage = document.getElementById(this.errorMessageId)
  }

  /**
   * Set molecule for the bug report
   * @param {object} molecule - molecule for the bug report
   */
  setMolecule (molecule) {
    this.molecule = molecule
  }

  /**
   * Validate the form contains molecule information.
   * @param {object} submitEvent - submit event object
   */
  validate (submitEvent) {
    submitEvent.preventDefault()
    submitEvent.stopPropagation()

    this.hideError()
    if (this.form.bug_report.value.length === 0 | this.form.bug_report.value.length > 500) {
      this.showError('Please enter a description of the bug')
      return false
    } else if (this.form.bug_report.value.length > 500) {
      this.showError('Please enter a shorter description of the bug ')
      return false
    }

    const formData = new FormData(submitEvent.target)
    formData.set("smiles", this.molecule.smiles)
    formData.set("name", this.molecule.name)
    formData.set("matches", JSON.stringify(this.molecule.matches))
    const bugReportEvent = new CustomEvent("submit-bugreport", {
      detail: {
        formData: formData
      },
      bubbles: true
    })
    this.element.dispatchEvent(bugReportEvent)
  }

  /** Show the modal. */
  show () {
    this.bootstrapModal.show()
  }

  /** Hide the modal. */
  hide () {
    this.bootstrapModal.hide()
  }

  /**
   * Show an error message.
   * @param {string} message - the error message
   */
  showError (message) {
    if (message) {
      this.errorMessage.innerText = message
    } else {
      this.errorMessage.innerText = 'An error occurred'
    }
    this.errorMessage.classList.remove('visually-hidden')
  }

  /* Hide error. */
  hideError () {
    this.errorMessage.classList.add('visually-hidden')
  }

  /** Render the modal. */
  render () {
    this.element.innerHTML = `
<div class="modal fade" id="${this.modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${this.modalLabelId}" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="form">
                <div class="modal-header">
                    <h5 class="modal-title" id="${this.modalLabelId}">Bug Report</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="bug_report" class="form-label">Describe the error:</label>
                        <textarea name="bug_report" class="form-control" rows="3" maxlength=500 minlength=1></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <p class="text-danger visually-hidden" id="${this.errorMessageId}"></p>
                    <input type="submit" value="Submit" class="btn btn-primary"/>
                </div>
            </form>
        </div>
    </div>
</div>`
  }
}
