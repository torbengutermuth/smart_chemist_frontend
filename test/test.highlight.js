describe('highlight', () => {
  it('should return the path bounding box', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `
<path class='atom-0' d='M 85.0 276.0
Q 85.0 271.1, 87.4 268.4
Q 89.8 265.6, 94.4 265.6
Q 98.9 265.6, 101.4 268.4
Q 103.8 271.1, 103.8 276.0
Q 103.8 281.0, 101.3 283.9
Q 98.9 286.7, 94.4 286.7
Q 89.9 286.7, 87.4 283.9
Q 85.0 281.1, 85.0 276.0
M 94.4 284.4
Q 97.5 284.4, 99.2 282.3
Q 100.9 280.2, 100.9 276.0
Q 100.9 272.0, 99.2 270.0
Q 97.5 267.9, 94.4 267.9
Q 91.3 267.9, 89.5 270.0
Q 87.9 272.0, 87.9 276.0
Q 87.9 280.2, 89.5 282.3
Q 91.3 284.4, 94.4 284.4
'/>`
    const pathElement = testElement.getElementsByTagName('path')[0]
    const [[xMin, yMin], [xMax, yMax]] = getPathBounds(pathElement)
    chai.expect(xMin).to.equal(85)
    chai.expect(yMin).to.equal(265.6)
    chai.expect(xMax).to.equal(103.8)
    chai.expect(yMax).to.equal(286.7)
    testElement.remove()
  })

  it('should return the common beginning/end point of multiple paths', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)

    testElement.innerHTML = `
<path class="bond-0 atom-0 atom-1" d="M 0.0,0.0 L 0.5,0.5">
<path class="bond-0 atom-0 atom-1" d="M 0.5,0.5 L 1.0,1.0">
<path class="bond-1 atom-0 atom-2" d="M 0.0,0.0 L -1.0,-1.0">`
    let paths = testElement.getElementsByTagName('path')
    let commonPoint = getAtomPositionFromBonds('atom-0', paths)
    chai.expect(commonPoint).to.eql([0.0, 0.0])

    testElement.innerHTML = `
<path class="bond-0 atom-0 atom-1" d="M 0.0,0.0 L 0.5,0.5">
<path class="bond-0 atom-0 atom-1" d="M 0.5,0.5 L 1.0,1.0">
<path class="bond-1 atom-0 atom-2" d="M 0.0,0.0 L -0.5,-0.5">
<path class="bond-1 atom-0 atom-2" d="M -0.5,-0.5 L -1.0,-1.0">`
    paths = testElement.getElementsByTagName('path')
    commonPoint = getAtomPositionFromBonds('atom-0', paths)
    chai.expect(commonPoint).to.eql([0.0, 0.0])

    testElement.remove()
  })

  it('should get the position furthest from the other atom', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)

    testElement.innerHTML = `
    <path class="bond-0 atom-1 atom-0" d="M 0.0,-0.1 L 0.0,0.1">
    <path class="bond-0 atom-1 atom-0" d="M 1.0,-0.2 L 1.0,0.2">
    <path class="bond-0 atom-1 atom-0" d="M 2.0,-0.3 L 2.0,0.3">
    <path class="bond-0 atom-1 atom-0" d="M 3.0,-0.4 L 3.0,0.4">`
    const containingElements = testElement.querySelectorAll('.atom-0')
    const otherAtomPosition = [0.0, 0.0]
    const atomPosition = getFurthestFromOtherAtom('atom-0', otherAtomPosition, containingElements)
    chai.expect(atomPosition).to.eql([3.0, 0.0 ])
    testElement.remove()
  })

  it('should calculate the euclidean distance', () => {
    const distance = getDistance([0, 0], [1, 1])
    chai.expect(Math.abs(distance - 1.4142135623730951) < 0.0000001)
  })

  it('should extract all path positions', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `<path class="bond-3 atom-3 atom-4" d="M 0.0,0.0 L 1.0,1.0 L 1.0,0.0 Z">`
    const positions = getPathPositions(testElement.children[0])
    chai.expect(positions.length).to.equal(3)
    testElement.remove()
  })

  it('renders methoxyethane (COCC)', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `
<rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='400.0' height='400.0' x='0.0' y='0.0'> </rect>
<path class='bond-0 atom-0 atom-1' d='M 18.2,219.7 L 72.8,196.5'></path>
<path class='bond-0 atom-0 atom-1' d='M 72.8,196.5 L 127.4,173.2'></path>
<path class='bond-1 atom-1 atom-2' d='M 162.5,179.0 L 208.8,213.8'></path>
<path class='bond-1 atom-1 atom-2' d='M 208.8,213.8 L 255.1,248.6'></path>
<path class='bond-2 atom-2 atom-3' d='M 255.1,248.6 L 381.8,194.6'></path>
<path d='M 252.7,246.8 L 255.1,248.6 L 261.4,245.9'></path>
<path class='atom-1' d='M 131.9 165.8
Q 131.9 159.0, 135.3 155.2
Q 138.7 151.4, 144.9 151.4
Q 151.2 151.4, 154.6 155.2
Q 157.9 159.0, 157.9 165.8
Q 157.9 172.7, 154.5 176.6
Q 151.1 180.5, 144.9 180.5
Q 138.7 180.5, 135.3 176.6
Q 131.9 172.8, 131.9 165.8
M 144.9 177.3
Q 149.3 177.3, 151.6 174.4
Q 153.9 171.5, 153.9 165.8
Q 153.9 160.3, 151.6 157.5
Q 149.3 154.6, 144.9 154.6
Q 140.6 154.6, 138.3 157.4
Q 135.9 160.2, 135.9 165.8
Q 135.9 171.6, 138.3 174.4
Q 140.6 177.3, 144.9 177.3
'></path>`

    highlightSubstructure(testElement, [1])
    let highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [2, 3])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [3])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [0])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }
    // testElement.remove()
  })

  it('renders menthol (O[C@H]1[C@H](C(C)C)CC[C@@H](C)C1)', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `
<rect width='400.0' height='400.0' x='0.0' y='0.0'></rect>
<path class='bond-0 atom-1 atom-0' d='M 177.9,234.3 L 164.0,261.0 L 159.0,257.7 Z'></path>
<path class='bond-0 atom-1 atom-0' d='M 164.0,261.0 L 140.0,281.2 L 150.1,287.8 Z'></path>
<path class='bond-0 atom-1 atom-0' d='M 164.0,261.0 L 159.0,257.7 L 140.0,281.2 Z'></path>
<path class='bond-1 atom-1 atom-2' d='M 177.9,234.3 L 141.9,162.9'></path>
<path class='bond-2 atom-2 atom-3' d='M 138.4,162.4 L 138.4,162.9'></path>
<path class='bond-2 atom-2 atom-3' d='M 135.0,161.9 L 134.9,163.0'></path>
<path class='bond-2 atom-2 atom-3' d='M 131.5,161.5 L 131.4,163.1'></path>
<path class='bond-2 atom-2 atom-3' d='M 128.0,161.0 L 127.9,163.2'></path>
<path class='bond-2 atom-2 atom-3' d='M 124.6,160.5 L 124.4,163.3'></path>
<path class='bond-2 atom-2 atom-3' d='M 121.1,160.1 L 120.9,163.3'></path>
<path class='bond-2 atom-2 atom-3' d='M 117.7,159.6 L 117.5,163.4'></path>
<path class='bond-2 atom-2 atom-3' d='M 114.2,159.1 L 114.0,163.5'></path>
<path class='bond-2 atom-2 atom-3' d='M 110.8,158.7 L 110.5,163.6'></path>
<path class='bond-2 atom-2 atom-3' d='M 107.3,158.2 L 107.0,163.6'></path>
<path class='bond-2 atom-2 atom-3' d='M 103.8,157.7 L 103.5,163.7'></path>
<path class='bond-2 atom-2 atom-3' d='M 100.4,157.3 L 100.0,163.8'></path>
<path class='bond-2 atom-2 atom-3' d='M 96.9,156.8 L 96.5,163.9'></path>
<path class='bond-2 atom-2 atom-3' d='M 93.5,156.3 L 93.0,164.0'></path>
<path class='bond-2 atom-2 atom-3' d='M 90.0,155.9 L 89.6,164.0'></path>
<path class='bond-2 atom-2 atom-3' d='M 86.6,155.4 L 86.1,164.1'></path>
<path class='bond-2 atom-2 atom-3' d='M 83.1,154.9 L 82.6,164.2'></path>
<path class='bond-2 atom-2 atom-3' d='M 79.6,154.5 L 79.1,164.3'></path>
<path class='bond-2 atom-2 atom-3' d='M 76.2,154.0 L 75.6,164.3'></path>
<path class='bond-2 atom-2 atom-3' d='M 72.7,153.5 L 72.1,164.4'></path>
<path class='bond-2 atom-2 atom-3' d='M 69.3,153.1 L 68.6,164.5'></path>
<path class='bond-2 atom-2 atom-3' d='M 65.8,152.6 L 65.2,164.6'></path>
<path class='bond-3 atom-3 atom-4' d='M 62.0,158.4 L 25.9,87.0'></path>
<path class='bond-4 atom-3 atom-5' d='M 62.0,158.4 L 18.2,225.3'></path>
<path class='bond-5 atom-2 atom-6' d='M 141.9,162.9 L 185.7,95.9'></path>
<path class='bond-6 atom-6 atom-7' d='M 185.7,95.9 L 265.6,100.4'></path>
<path class='bond-7 atom-7 atom-8' d='M 265.6,100.4 L 301.6,171.8'></path>
<path class='bond-8 atom-8 atom-9' d='M 301.6,171.8 L 381.8,170.3 L 381.1,182.3 Z'></path>
<path class='bond-9 atom-8 atom-10' d='M 301.6,171.8 L 257.8,238.8'></path>
<path class='bond-10 atom-10 atom-1' d='M 257.8,238.8 L 177.9,234.3'></path>
<path d='M 176.1,230.7 L 177.9,234.3 L 181.9,234.5'></path>
<path d='M 143.7,166.4 L 141.9,162.9 L 144.1,159.5'></path>
<path d='M 60.2,154.8 L 62.0,158.4 L 59.8,161.7'></path>
<path d='M 183.5,99.3 L 185.7,95.9 L 189.7,96.2'></path>
<path d='M 261.6,100.2 L 265.6,100.4 L 267.4,104.0'></path>
<path d='M 299.8,168.3 L 301.6,171.8 L 299.4,175.2'></path>
<path d='M 260.0,235.4 L 257.8,238.8 L 253.8,238.5'></path>
<path class='atom-0' d='M 101.3 290.0
L 104.4 290.0
L 104.4 299.6
L 116.0 299.6
L 116.0 290.0
L 119.1 290.0
L 119.1 312.7
L 116.0 312.7
L 116.0 302.2
L 104.4 302.2
L 104.4 312.7
L 101.3 312.7
L 101.3 290.0
'></path>
<path class='atom-0' d='M 123.7 301.3
Q 123.7 295.8, 126.4 292.8
Q 129.1 289.8, 134.1 289.8
Q 139.1 289.8, 141.8 292.8
Q 144.5 295.8, 144.5 301.3
Q 144.5 306.8, 141.8 309.9
Q 139.1 313.0, 134.1 313.0
Q 129.1 313.0, 126.4 309.9
Q 123.7 306.8, 123.7 301.3
M 134.1 310.5
Q 137.6 310.5, 139.4 308.2
Q 141.3 305.8, 141.3 301.3
Q 141.3 296.8, 139.4 294.6
Q 137.6 292.3, 134.1 292.3
Q 130.7 292.3, 128.8 294.6
Q 126.9 296.8, 126.9 301.3
Q 126.9 305.9, 128.8 308.2
Q 130.7 310.5, 134.1 310.5
'></path>`

    highlightSubstructure(testElement, [0])
    let highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(2)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [4])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [5])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [1, 2, 6, 7, 8, 10])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(6)
    while (highlights.length) {
      highlights[0].remove()
    }
  })

  it('renders ibuprofene (CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O)', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `
<rect width='400.0' height='400.0' x='0.0' y='0.0'></rect>
<path class='bond-0 atom-0 atom-1' d='M 18.2,195.1 L 67.3,192.0'></path>
<path class='bond-1 atom-1 atom-2' d='M 67.3,192.0 L 89.3,148.0'></path>
<path class='bond-2 atom-1 atom-3' d='M 67.3,192.0 L 94.5,233.1'></path>
<path class='bond-3 atom-3 atom-4' d='M 94.5,233.1 L 143.7,230.1'></path>
<path class='bond-4 atom-4 atom-5' d='M 143.7,230.1 L 165.7,186.0'></path>
<path class='bond-4 atom-4 atom-5' d='M 152.2,229.6 L 170.4,193.1'></path>
<path class='bond-5 atom-5 atom-6' d='M 165.7,186.0 L 214.8,183.0'></path>
<path class='bond-6 atom-6 atom-7' d='M 214.8,183.0 L 242.0,224.1'></path>
<path class='bond-6 atom-6 atom-7' d='M 211.0,190.6 L 233.5,224.6'></path>
<path class='bond-7 atom-7 atom-8' d='M 242.0,224.1 L 220.1,268.1'></path>
<path class='bond-8 atom-8 atom-9' d='M 220.1,268.1 L 170.9,271.2'></path>
<path class='bond-8 atom-8 atom-9' d='M 215.4,261.0 L 174.7,263.5'></path>
<path class='bond-9 atom-7 atom-10' d='M 242.0,224.1 L 291.2,221.0'></path>
<path class='bond-10 atom-10 atom-11' d='M 293.4,223.8 L 292.9,224.1'></path>
<path class='bond-10 atom-10 atom-11' d='M 295.5,226.6 L 294.6,227.2'></path>
<path class='bond-10 atom-10 atom-11' d='M 297.7,229.4 L 296.4,230.3'></path>
<path class='bond-10 atom-10 atom-11' d='M 299.8,232.2 L 298.1,233.4'></path>
<path class='bond-10 atom-10 atom-11' d='M 302.0,235.0 L 299.8,236.4'></path>
<path class='bond-10 atom-10 atom-11' d='M 304.2,237.8 L 301.5,239.5'></path>
<path class='bond-10 atom-10 atom-11' d='M 306.3,240.6 L 303.3,242.6'></path>
<path class='bond-10 atom-10 atom-11' d='M 308.5,243.3 L 305.0,245.7'></path>
<path class='bond-10 atom-10 atom-11' d='M 310.7,246.1 L 306.7,248.8'></path>
<path class='bond-10 atom-10 atom-11' d='M 312.8,248.9 L 308.4,251.8'></path>
<path class='bond-10 atom-10 atom-11' d='M 315.0,251.7 L 310.1,254.9'></path>
<path class='bond-10 atom-10 atom-11' d='M 317.1,254.5 L 311.9,258.0'></path>
<path class='bond-10 atom-10 atom-11' d='M 319.3,257.3 L 313.6,261.1'></path>
<path class='bond-10 atom-10 atom-11' d='M 321.5,260.1 L 315.3,264.2'></path>
<path class='bond-11 atom-10 atom-12' d='M 291.2,221.0 L 313.2,177.0'></path>
<path class='bond-12 atom-12 atom-13' d='M 317.4,176.7 L 306.2,159.7'></path>
<path class='bond-12 atom-12 atom-13' d='M 306.2,159.7 L 294.9,142.7'></path>
<path class='bond-12 atom-12 atom-13' d='M 311.3,180.8 L 300.0,163.8'></path>
<path class='bond-12 atom-12 atom-13' d='M 300.0,163.8 L 288.8,146.8'></path>
<path class='bond-13 atom-12 atom-14' d='M 313.2,177.0 L 333.7,175.7'></path>
<path class='bond-13 atom-12 atom-14' d='M 333.7,175.7 L 354.3,174.4'></path>
<path class='bond-14 atom-9 atom-4' d='M 170.9,271.2 L 143.7,230.1'></path>
<path d='M 93.2,231.1 L 94.5,233.1 L 97.0,233.0'></path>
<path d='M 164.6,188.2 L 165.7,186.0 L 168.1,185.9'></path>
<path d='M 212.4,183.1 L 214.8,183.0 L 216.2,185.0'></path>
<path d='M 221.2,265.9 L 220.1,268.1 L 217.6,268.3'></path>
<path d='M 173.4,271.0 L 170.9,271.2 L 169.5,269.1'></path>
<path d='M 288.7,221.2 L 291.2,221.0 L 292.3,218.8'></path>
<path d='M 312.1,179.2 L 313.2,177.0 L 314.2,176.9'></path>
<path class='atom-13' d='M 279.6 135.9
Q 279.6 132.6, 281.2 130.7
Q 282.9 128.8, 286.0 128.8
Q 289.1 128.8, 290.7 130.7
Q 292.4 132.6, 292.4 135.9
Q 292.4 139.3, 290.7 141.2
Q 289.0 143.2, 286.0 143.2
Q 282.9 143.2, 281.2 141.2
Q 279.6 139.3, 279.6 135.9
M 286.0 141.6
Q 288.1 141.6, 289.2 140.2
Q 290.4 138.7, 290.4 135.9
Q 290.4 133.2, 289.2 131.8
Q 288.1 130.4, 286.0 130.4
Q 283.8 130.4, 282.7 131.8
Q 281.5 133.2, 281.5 135.9
Q 281.5 138.7, 282.7 140.2
Q 283.8 141.6, 286.0 141.6
'></path>
<path class='atom-14' d='M 355.9 174.0
Q 355.9 170.6, 357.6 168.8
Q 359.2 166.9, 362.3 166.9
Q 365.4 166.9, 367.1 168.8
Q 368.7 170.6, 368.7 174.0
Q 368.7 177.4, 367.1 179.3
Q 365.4 181.2, 362.3 181.2
Q 359.3 181.2, 357.6 179.3
Q 355.9 177.4, 355.9 174.0
M 362.3 179.6
Q 364.5 179.6, 365.6 178.2
Q 366.8 176.8, 366.8 174.0
Q 366.8 171.2, 365.6 169.9
Q 364.5 168.5, 362.3 168.5
Q 360.2 168.5, 359.0 169.8
Q 357.9 171.2, 357.9 174.0
Q 357.9 176.8, 359.0 178.2
Q 360.2 179.6, 362.3 179.6
'></path>
<path class='atom-14' d='M 370.9 167.0
L 372.8 167.0
L 372.8 173.0
L 379.9 173.0
L 379.9 167.0
L 381.8 167.0
L 381.8 181.0
L 379.9 181.0
L 379.9 174.5
L 372.8 174.5
L 372.8 181.0
L 370.9 181.0
L 370.9 167.0
'></path>`

    highlightSubstructure(testElement, [12, 13, 14])
    let highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(9)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [14])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(2)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [0])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [2])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [11])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(1)
    while (highlights.length) {
      highlights[0].remove()
    }

    highlightSubstructure(testElement, [4, 5, 6, 7, 8, 9])
    highlights = testElement.getElementsByClassName('substructure-highlight')
    chai.expect(highlights.length).to.equal(9)
    while (highlights.length) {
      highlights[0].remove()
    }
  })
})
