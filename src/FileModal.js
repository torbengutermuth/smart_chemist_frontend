//import { JSApplet } from "vendor/js/jsme-editor/jsme.nocache.js";

/** File and molecule upload modal. */
class FileModal {
  /**
   * File and molecule upload modal.
   * @param {HTMLElement} element - element to bind to
   * @param {string} modalId - ID of the modal
   * @param {boolean} show - show the modal after initialization
   */
  constructor(element, modalId = "file-modal", show = true) {
    this.element = element;
    this.modalId = modalId;
    this.modalLabelId = this.modalId + "-label";
    this.errorMessageId = this.modalId + "-error";
    this.modalBodyID = this.modalId + "-body";
    this.showEditor = false;
    this.render();

    this.bootstrapModal = new bootstrap.Modal(document.getElementById(this.modalId));
    if (show) {
      this.bootstrapModal.show();
    }
    this.form = this.element.getElementsByTagName("form")[0];
    this.form.addEventListener("submit", (event) => {
      this.validate(event);
    });
    document.getElementById("viewerToggle").addEventListener("click", this.toggleViewer);
    this.errorMessage = document.getElementById(this.errorMessageId);
    window.addEventListener("addJSME", () => {
      let self = window.app.modal;
      self.jsme = new JSApplet.JSME("jsme-container", `400px`, "348px", {
        options: "oldlook,marker,markerMenu, markAtomOnly",
        atombgsize: "1",
        bondbgsize: "1",
      });
      self.jsme.setCallBack("AfterStructureModified", (e) => {
        self.form.smiles.value = self.jsme.smiles();
      });
    });
  }

  /**
   * Validate the form contains molecule information.
   * @param {object} submitEvent - submit event object
   */
  validate(submitEvent) {
    this.hideError();
    if (this.form.smiles.value === "" && this.form["molecule_file"].value === "") {
      submitEvent.preventDefault();
      // this.showError('Requires either a SMILES or a molecule file')
    }
  }

  /** Show the modal. */
  show() {
    this.bootstrapModal.hide();
  }

  toggleViewer() {
    let self = window.app.modal;
    self.showEditor = !self.showEditor;
    document.getElementById("jsme-container").style.display = self.showEditor ? "block" : "none";

    function getContentWidth(element) {
      let widthWithPaddings = element.clientWidth;
      const elementComputedStyle = window.getComputedStyle(element, null);
      return (
        widthWithPaddings -
        parseFloat(elementComputedStyle.paddingLeft) -
        parseFloat(elementComputedStyle.paddingRight)
      );
    }
    if (self.showEditor) {
      const width = getContentWidth(document.getElementById("jsme-container"));
      self.jsme.setWidth(`${width}px`);
    }
  }

  /** Hide the modal. */
  hide() {
    this.bootstrapModal.hide();
  }

  /**
   * Show an error message.
   * @param {string} message - the error message
   */
  showError(message) {
    if (message) {
      this.errorMessage.innerText = message;
    } else {
      this.errorMessage.innerText = "An error occurred";
    }
    this.errorMessage.classList.remove("visually-hidden");
  }

  /* Hide error. */
  hideError() {
    this.errorMessage.classList.add("visually-hidden");
  }

  /** Render the modal. */
  render() {
    this.element.innerHTML = `
<div class="modal fade" id="${this.modalId}" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" aria-labelledby="${this.modalLabelId}"
aria-hidden="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="form">
                <div class="modal-header">
                    <h5 class="modal-title" id="${this.modalLabelId}">
                        Load Molecules
                    </h5>
                </div>
                <div class="modal-body" id="${this.modalBodyID}">
                    <div class="mb-3">
                        <label for="smiles" class="form-label">SMILES</label>
                        <div class="row" style="padding-bottom: 10px">
                            <div class="col-md-9">
                                <input type="text" name="smiles"
                                class="form-control"/>
                            </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-primary w-100"
                            id="viewerToggle">
                                Editor
                            </button>
                        </div>
                        <div style="display: none;padding-top: 5px"
                        id="jsme-container">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="mol-file" class="form-label">File</label>
                        <input type="file" name="molecule_file"
                        class="form-control" accept=".smi, .sdf"/>
                    </div>
                </div>
                <div class="modal-footer m-0 zero-hpad">
                    <p class="text-danger visually-hidden"
                    style="padding-bottom: 5px"
                    id="${this.errorMessageId}"></p>
                    <div class="row w-100 zero-hpad zero-hmargin">
                        <div class="col-md-6 zero-hpad">
                            <input type="submit" value="Examples"
                            class="btn btn-primary float-start"/>
                        </div>
                        <div class="col-md-6 zero-hpad">
                            <input type="submit" value="Submit"
                            class="btn btn-primary float-end"/>
                        </div>
                    </div>
		            </div>
            </form>
        </div>
    </div>
</div>`;
  }
}
