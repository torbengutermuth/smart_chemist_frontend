describe('UploadToast', () => {
  beforeEach(() => {
    const testElement = document.createElement('div')
    testElement.id = 'upload-toast-test'
    document.body.appendChild(testElement)
  })

  it('should initialize its members', () => {
    const uploadToast = new UploadToast(document.getElementById('upload-toast-test'))
    chai.expect(uploadToast.bootstrapToast).to.not.be.undefined
  })

  it('shows an error', () => {
    const uploadToast = new UploadToast(document.getElementById('upload-toast-test'))
    uploadToast.showError("Test error")
    chai.expect(uploadToast.toastText.innerText).to.equal("Test error")
  })

  afterEach(() => {
    document.getElementById('upload-toast-test').remove()
  })
})
