/** Upload error reporting toast */
class UploadToast {
  /**
   * Upload error reporting toast
   * @param {HTMLElement} element - element to bind to
   */
  constructor (element, toastId = 'upload-toast') {
    this.element = element
    this.toastId = toastId
    this.render()

    this.bootstrapToast = new bootstrap.Toast(document.getElementById(this.toastId))
    this.toastText = this.element.getElementsByTagName("strong")[0]
  }

  /**
   * Show Upload errors
   * @param {string} errorMessage - error message to show
   */
  showError (errorMessage) {
    this.toastText.innerText = errorMessage
    this.bootstrapToast.show()
  }

  /** Render the modal. */
  render () {
    this.element.innerHTML = `
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="${this.toastId}" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <button type="button" class="btn-close me-2" data-bs-dismiss="toast" aria-label="Close"></button>
            <strong>Error</strong>
        </div>
    </div>
</div>
`
  }
}
