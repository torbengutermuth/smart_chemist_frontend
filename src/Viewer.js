/** Molecule and match viewer. Implemented with a bootstrap carousel. */
class Viewer {
  MATCH_SORT_ORDER = {
    'functional_group': 0,
    'cyclic': 1,
    'overshadowed': 2
  }

  /**
   * Molecule and match viewer. Implemented with a bootstrap carousel.
   * @param {HTMLElement} element - element to bind to
   * @param {string} carouselId - ID of the carousel
   */
  constructor (element, carouselId = 'molecule-carousel', collapseId = 'overshadowed-collapse') {
    this.element = element
    this.carouselId = carouselId
    this.collapseId = collapseId
    this.molecules = []
    this.idToMatches = new Map()

    this.render()

    this.innerCarousel = this.element.getElementsByClassName('carousel-inner')[0]
    this.matches = this.element.getElementsByClassName('matches')[0]
    this.matches.parentElement.addEventListener('click', (event) => { this.handleClick(event) })
    this.overshadowed = this.element.getElementsByClassName('overshadowed')[0]
    this.element.addEventListener('slid.bs.carousel', (event) => { this.handleCarousel(event) })
  }

  /**
   * Set the molecules in the viewer. This affects the visualization and the
   * matches. The first molecule and its matches will be shown.
   * @param {Array<object>} molecules - molecule to set
   */
  setMolecules (molecules) {
    this.molecules = molecules
    this.idToMatches = new Map()
    this.innerCarousel.innerHTML = ''

    let first = true
    molecules.forEach((molecule) => {
      const carouselItem = this.createCarouselItem(molecule)
      if (first) {
        carouselItem.classList.add('active')
        this.setMatches(molecule.matches)
      }

      this.innerCarousel.appendChild(carouselItem)

      if (first) {
        const svgElement = carouselItem.getElementsByTagName('svg')[0]
        highlightSubstructure(svgElement, molecule.matches[0].atom_indices)
        first = false
      }
    })
  }

  /**
   * Set the matches in the viewer. The first match will be set as active.
   * @param {Array<objects>} matches - the matches to set
   */
  setMatches (matches) {
    const previousMatches = this.matches.getElementsByTagName('li')
    while (previousMatches.length > 0) {
      previousMatches[0].remove()
    }

    const previousOvershadowed = this.overshadowed.getElementsByTagName('li')
    while (previousOvershadowed.length > 0) {
      previousOvershadowed[0].remove()
    }

    matches.sort((a, b) => {
      return this.compareMatches(a, b)
    }).forEach((match) => {
      const indexes = match.atom_indices.join(',')
      const listElement = document.createElement('li')
      listElement.innerText = match.trivial_name.name
      listElement.id = `${match.trivial_name.name.toLowerCase()}-${indexes}`
      listElement.classList.add('list-group-item')
      if (match.trivial_name.group == 'functional_group') {
        listElement.classList.add('list-group-item-success')
        this.matches.appendChild(listElement)
      } else if (match.trivial_name.group == 'cyclic') {
        listElement.classList.add('list-group-item-primary')
        this.matches.appendChild(listElement)
      } else {
        listElement.classList.add('list-group-item-warning')
        this.overshadowed.appendChild(listElement)
      }
      this.idToMatches.set(listElement.id, match)
    })
    const firstElement = this.matches.getElementsByClassName('list-group-item')[0]
    firstElement.classList.add('active')
  }

  /**
   * Sorting comparator for two matches. Sorts by category, name and atom
   * indexes.
   * @param {object} a - match object
   * @param {object} b - match object
   * @returns {number} a negative number if a < b, a positive if a > b
   *   and 0 if a === b by the above criteria
   */
  compareMatches(a, b) {
    const aCategory = this.MATCH_SORT_ORDER[a.trivial_name.group]
    const bCategory = this.MATCH_SORT_ORDER[b.trivial_name.group]
    if (aCategory !== bCategory) {
      return aCategory - bCategory
    }

    if (a.trivial_name.name < b.trivial_name.name) {
      return -1
    }
    if (a.trivial_name.name > b.trivial_name.name) {
      return 1
    }

    if (a.atom_indices < b.atom_indices) {
      return -1
    }
    if (a.atom_indices > b.atom_indices) {
      return 1
    }
    return 0
  }

  /**
   * Set the active match list element. Will remove all other actives.
   * @param {HTMLElement} listElement - the list element to set as active
   */
  setActiveListElement (listElement) {
    const activeElements = this.matches.parentElement.getElementsByClassName('active')
    for (let i = 0; i < activeElements.length; i++) {
      activeElements[i].classList.remove('active')
    }
    listElement.classList.add('active')
  }

  /**
   * Set the substructure to be highlighted
   * @param {Array<number>} atomIndexes - atom indexes of the substructure
   */
  setHighlight (atomIndexes) {
    const svgElement = this.innerCarousel
      .getElementsByClassName('active')[0]
      .getElementsByTagName('svg')[0]
    const substructureHighlights = svgElement.getElementsByClassName('substructure-highlight')
    while (substructureHighlights.length) {
      substructureHighlights[0].remove()
    }
    highlightSubstructure(svgElement, atomIndexes)
  }

  /**
   * Handle click on a match list element. Sets the clicked element as active
   * and highlights the substructure.
   * @param {object} clickEvent - event to handle
   */
  handleClick (clickEvent) {
    const listElement = clickEvent.target
    if (listElement.classList.contains('active')) {
      return
    }
    if (listElement.classList.contains('btn')) {
      return
    }
    this.setActiveListElement(listElement)
    this.setHighlight(this.idToMatches.get(listElement.id).atom_indices)
  }

  /**
   * Handler carousel cycling. The matches are set for the current molecule
   * and the first match substructure highlighted.
   * @param {object} cycleEvent - carousel cycle event
   */
  handleCarousel (cycleEvent) {
    const currentElement = this.molecules[cycleEvent.to]
    this.setMatches(currentElement.matches)
    this.setHighlight(currentElement.matches[0].atom_indices)
  }

  /**
   * Create a carousel item for a molecule. Sets the SVG and the name.
   * @param {object} molecule - molecule to create an element for
   */
  createCarouselItem (molecule) {
    const carouselItem = document.createElement('div')
    carouselItem.classList.add('carousel-item')
    carouselItem.classList.add('text-center')
    carouselItem.innerHTML = `
<div class="text-center">
    ${molecule.svg}
    <h5>${molecule.name}</h5>
</div>`
    return carouselItem
  }

  /** Render the viewer. */
  render () {
    this.element.innerHTML = `
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-9">
            <div id="${this.carouselId}" class="carousel slide" data-bs-interval="false" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <svg width="400px" height="400px"></svg>
                </div>
                <button class="carousel-control-prev carousel-dark" type="button" data-bs-target="#${this.carouselId}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next carousel-dark" type="button" data-bs-target="#${this.carouselId}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="row">
                <h3 class="my-3">Substructures</h3>
                <ul class="list-group matches">
                </ul>
                <ul class="list-group">
                    <div class="collapse overshadowed" id="${this.collapseId}">
                    </div>
                    <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#${this.collapseId}">
                        Toggle overshadowed
                    </button>
                </ul>
            </div>
        </div>
    </div>
</div>`
  }
}
