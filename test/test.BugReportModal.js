describe('FileModal', () => {
  beforeEach(() => {
    const testElement = document.createElement('div')
    testElement.id = 'bug-modal-test'
    document.body.appendChild(testElement)
  })

  it('should initialize its members', () => {
    const bugReportModal = new BugReportModal(document.getElementById('bug-modal-test'))
    chai.expect(bugReportModal.bootstrapModal).to.not.be.undefined
    chai.expect(bugReportModal.form).to.not.be.undefined
    chai.expect(bugReportModal.errorMessage).to.not.be.undefined
  })

  it('should show an error on a submission without content', () => {
    const bugReportModal = new BugReportModal(document.getElementById('bug-modal-test'))
    const submitButton = document.querySelector('[type="submit"]')
    const errorElement = bugReportModal.element.getElementsByTagName('p')[0]
    chai.expect(errorElement.classList.contains('visually-hidden')).to.be.true
    submitButton.click()
    chai.expect(errorElement.classList.contains('visually-hidden')).to.be.false
  })

  afterEach(() => {
    document.getElementById('bug-modal-test').remove()
  })
})
