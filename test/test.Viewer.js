describe('Viewer', () => {
  beforeEach(() => {
    const testElement = document.createElement('div')
    testElement.id = 'viewer-test'
    document.body.appendChild(testElement)
  })

  it('should initialize its members', () => {
    const viewer = new Viewer(document.getElementById('viewer-test'))
    chai.expect(viewer.innerCarousel).to.not.be.undefined
    chai.expect(viewer.matches).to.not.be.undefined
  })

  const molecules = [{"name": "Alcohol", "svg": "<?xml version='1.0' encoding='iso-8859-1'?>\n<svg version='1.1' baseProfile='full'\nxmlns='http://www.w3.org/2000/svg'\nxmlns:rdkit='http://www.rdkit.org/xml'\nxmlns:xlink='http://www.w3.org/1999/xlink'\nxml:space='preserve'\nwidth='400px' height='400px' viewBox='0 0 400 400'>\n<!-- END OF HEADER -->\n<rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='400.0' height='400.0' x='0.0' y='0.0'> </rect>\n<path class='bond-0 atom-0 atom-1' d='M 200.6,157.6 L 200.6,192.5' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-0 atom-0 atom-1' d='M 200.6,192.5 L 200.6,227.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-1 atom-1 atom-2' d='M 200.6,227.4 L 126.8,270.0' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='atom-0' d='M 189.5 142.3\nQ 189.5 136.5, 192.4 133.3\nQ 195.2 130.0, 200.6 130.0\nQ 205.9 130.0, 208.8 133.3\nQ 211.7 136.5, 211.7 142.3\nQ 211.7 148.1, 208.8 151.5\nQ 205.9 154.8, 200.6 154.8\nQ 195.3 154.8, 192.4 151.5\nQ 189.5 148.2, 189.5 142.3\nM 200.6 152.1\nQ 204.3 152.1, 206.3 149.6\nQ 208.3 147.1, 208.3 142.3\nQ 208.3 137.6, 206.3 135.2\nQ 204.3 132.7, 200.6 132.7\nQ 196.9 132.7, 194.9 135.1\nQ 192.9 137.5, 192.9 142.3\nQ 192.9 147.2, 194.9 149.6\nQ 196.9 152.1, 200.6 152.1\n' fill='#FF0000'/>\n<path class='atom-0' d='M 215.4 130.3\nL 218.7 130.3\nL 218.7 140.6\nL 231.0 140.6\nL 231.0 130.3\nL 234.3 130.3\nL 234.3 154.4\nL 231.0 154.4\nL 231.0 143.3\nL 218.7 143.3\nL 218.7 154.4\nL 215.4 154.4\nL 215.4 130.3\n' fill='#FF0000'/>\n</svg>\n", "matches": [{"atom_indices": [0], "trivial_name": {"name": "Alcohol", "smarts": "[#8$([#8X2H1]C)]", "group": "functional_group"}}]}]

  it('should set molecule SVG and matches', () => {
    const viewer = new Viewer(document.getElementById('viewer-test'))
    viewer.setMolecules(molecules)

    const svgElement = viewer.innerCarousel
      .getElementsByClassName('active')[0]
      .getElementsByTagName('svg')[0]
    chai.expect(svgElement).to.not.be.undefined
    const substructureHighlights = svgElement.getElementsByClassName('substructure-highlight')
    chai.expect(substructureHighlights.length).to.equal(2)

    const listElement = viewer.matches.getElementsByClassName('list-group-item')[0]
    chai.expect(listElement).to.not.be.undefined
    chai.expect(listElement.classList.contains('active'))
  })

  const matches = [{"atom_indices": [1], "trivial_name": {"name": "Carbon", "group": "overshadowed"}}, {"atom_indices": [0, 1], "trivial_name": {"name": "Hydroxy", "group": "functional_group"}}]

  it('should set the matches and set active matches', () => {
    const viewer = new Viewer(document.getElementById('viewer-test'))
    viewer.setMolecules(molecules)
    let listElements = viewer.matches.getElementsByClassName('list-group-item')
    chai.expect(listElements.length).to.equal(1)

    viewer.setMatches(matches)
    listElements = viewer.matches.getElementsByClassName('list-group-item')
    chai.expect(listElements.length).to.equal(1)
    chai.expect(listElements[0].classList.contains('active'))

    const overshadowed = viewer.overshadowed.getElementsByClassName('list-group-item')
    chai.expect(overshadowed.length).to.equal(1)

    viewer.setActiveListElement(overshadowed[0])
    chai.expect(overshadowed[0].classList.contains('active'))
  })

  it('should sort matches', () => {
    const viewer = new Viewer(document.getElementById('viewer-test'))
    chai.expect(viewer.compareMatches(matches[0], matches[1])).to.be.below(0)
  })

  it('should set the highlighted substructure', () => {
    const viewer = new Viewer(document.getElementById('viewer-test'))
    viewer.setMolecules(molecules)
    const svgElement = viewer.innerCarousel
      .getElementsByClassName('active')[0]
      .getElementsByTagName('svg')[0]
    chai.expect(svgElement).to.not.be.undefined
    let substructureHighlights = svgElement.getElementsByClassName('substructure-highlight')
    chai.expect(substructureHighlights.length).to.equal(2)

    let listElements = viewer.matches.getElementsByClassName('list-group-item')
    viewer.setMatches(matches)
    viewer.setHighlight(matches[0].atom_indices)
    

    substructureHighlights = svgElement.getElementsByClassName('substructure-highlight')
    chai.expect(substructureHighlights.length).to.equal(4)
  })

  afterEach(() => {
    document.getElementById('viewer-test').remove()
  })
})
