describe('FileModal', () => {
  beforeEach(() => {
    const testElement = document.createElement('div')
    testElement.id = 'file-modal-test'
    document.body.appendChild(testElement)
  })

  it('should initialize its members', () => {
    const fileModal = new FileModal(document.getElementById('file-modal-test'))
    chai.expect(fileModal.bootstrapModal).to.not.be.undefined
    chai.expect(fileModal.form).to.not.be.undefined
    chai.expect(fileModal.errorMessage).to.not.be.undefined
  })

  it('should show an error on a submission without data', () => {
    const fileModal = new FileModal(document.getElementById('file-modal-test'))
    const submitButton = document.querySelector('[type="submit"]')
    const errorElement = fileModal.element.getElementsByTagName('p')[0]
    chai.expect(errorElement.classList.contains('visually-hidden')).to.be.true
    submitButton.click()
    chai.expect(errorElement.classList.contains('visually-hidden')).to.be.false
  })

  afterEach(() => {
    document.getElementById('file-modal-test').remove()
  })
})
