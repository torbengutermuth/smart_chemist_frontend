/**
 * Highlight substructure in SVG element. Substructures are all atoms with the
 * give atom indexes and the bonds between them. Substructures of single atom
 * indices result in either the highlighting of an explicit atom (the atom
 * symbol in the SVG) or the highlighting of the meeting point of two bonds in
 * a chain which marks its position.
 * @param {SVGElement} svgElement - element to highlight substructure in
 * @param {Array<number>} atomIndexes - atom indexes that make up the
 *   substructure
 */
function highlightSubstructure (svgElement, atomIndexes) {
  const backgroundRect = svgElement.getElementsByTagName('rect')[0]
  const [atoms, bonds] = getSubstructureElements(svgElement, atomIndexes)
  if (atoms.size === 0 && bonds.size === 0 && atomIndexes.length === 1) {
    const containingElements = svgElement.querySelectorAll('.atom-' + atomIndexes[0])
    let atomPosition = undefined
    // chiral down bond
    if (containingElements.length >= 10) {
      let otherAtomName = containingElements[0].classList[1]
      if (otherAtomName === 'atom-' + atomIndexes[0]) {
          otherAtomName = containingElements[0].classList[2]
      }
      const otherAtomElements = svgElement.querySelectorAll('.' + otherAtomName)
      const otherAtomPosition = getAtomPositionFromBonds(otherAtomName, otherAtomElements)
      atomPosition = getFurthestFromOtherAtom(
        'atom-' + atomIndexes[0],
        otherAtomPosition,
        containingElements
      )
    // chiral up bond
    } else if (containingElements.length === 1 && getPathPositions(containingElements[0]).length == 3) {
      const positions = getPathPositions(containingElements[0])
      if (containingElements[0].classList[1] === 'atom-' + atomIndexes[0]) {
        atomPosition = positions[0]
      } else {
        atomPosition = [
          (positions[1][0] + positions[2][0]) / 2,
          (positions[1][1] + positions[2][1]) / 2
        ]
      }
    // terminal carbon-carbon and carbon-heteroatom bond
    } else {
      atomPosition = getAtomPositionFromBonds('atom-' + atomIndexes[0], containingElements)
    }
    if (atomPosition) {
      const atomMarker = createAtomMarkerPosition(atomPosition, 12)
      svgElement.insertBefore(atomMarker, backgroundRect.nextSibling)
    }
  }
  for (const value of atoms.values()) {
    value.forEach((atom) => {
      const atomMarker = createAtomMarker(atom)
      svgElement.insertBefore(atomMarker, backgroundRect.nextSibling)
    })
  }
  for (const value of bonds.values()) {
    value.forEach((bond) => {
      const bondMarker = createBondMarker(bond)
      svgElement.insertBefore(bondMarker, backgroundRect.nextSibling)
    })
  }
}

/**
 * Get SVG elements of the substructure.
 * @param {Array<number>} atomIndexes - atom indexes that make up the
 *   substructure
 * @returns {Array<Map<string, SVGElement>>} atoms and bonds maps
 */
function getSubstructureElements (svgElement, atomIndexes) {
  atomIndexes = atomIndexes.sort()
  const atoms = new Map()
  const bonds = new Map()
  for (let i = 0; i < atomIndexes.length; i++) {
    for (let j = i + 1; j < atomIndexes.length; j++) {
      const query = '.atom-' + atomIndexes[i] + '.atom-' + atomIndexes[j]
      svgElement.querySelectorAll(query).forEach((element) => {
        const classKey = element.classList.value
        if (!bonds.has(classKey)) {
          bonds.set(classKey, [])
        }
        bonds.get(classKey).push(element)
      })
    }
    const atomClass = 'atom-' + atomIndexes[i]
    const query = '.' + atomClass
    svgElement.querySelectorAll(query).forEach((element) => {
      const classKey = element.classList.value
      if (classKey !== atomClass) {
        return
      }
      if (!atoms.has(classKey)) {
        atoms.set(classKey, [])
      }
      atoms.get(classKey).push(element)
    })
  }
  return [atoms, bonds]
}

/**
 * Get bounding box for a path element.
 * @param {SVGElement} pathElement - path element to get a bounding box for
 * @returns {Array<Array<number, 2>, 2>} axis-aligned bounding box of minimum 2D
 *   coordinates to maximum coordinates
 */
function getPathBounds (pathElement) {
  const path = pathElement.getAttribute('d')
  let xMin, xMax, yMin, yMax
  path.split('\n').forEach((pathInstruction) => {
    const splitInstruction = pathInstruction.split(' ')
    const xComponent = parseFloat(splitInstruction[1])
    const yComponent = parseFloat(splitInstruction[2])
    if (!xMin || xComponent < xMin) {
      xMin = xComponent
    }
    if (!xMax || xComponent > xMax) {
      xMax = xComponent
    }
    if (!yMin || yComponent < yMin) {
      yMin = yComponent
    }
    if (!yMax || yComponent > yMax) {
      yMax = yComponent
    }
  })
  return [[xMin, yMin], [xMax, yMax]]
}

/**
 * Create an SVG marker for an atom.
 * @param {SVGElement} atom - atom SVG element
 * @returns {SVGElement} SVG marker for an atom
 */
function createAtomMarker (atom) {
  const boundingBox = getPathBounds(atom)
  const [[xMin, yMin], [xMax, yMax]] = boundingBox
  return createAtomMarkerPosition(
    [xMin + (xMax - xMin) / 2, yMin + (yMax - yMin) / 2], // center
    Math.max(xMax - xMin, yMax - yMin) // maximum in X or Y direction
  )
}

/**
 * Create an atom marker at a position.
 * @param {Array<number, 2>} position - atom position to mark
 * @param {number} radius - radius of the marker
 * @returns {SVGElement} SVG marker for an atom
 */
function createAtomMarkerPosition (position, radius) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttributeNS(null, 'cx', position[0])
  circle.setAttributeNS(null, 'cy', position[1])
  circle.setAttributeNS(null, 'r', radius)
  circle.setAttributeNS(null, 'fill', '#8080ff')
  circle.setAttributeNS(null, 'class', 'substructure-highlight')
  return circle
}

/**
 * Create an SVG marker for a bond
 * @param {SVGElement} bond - bond SVG element
 * @returns {SVGElement} SVG marker for a bond
 */
function createBondMarker (bond) {
  const clonedBond = bond.cloneNode(false)
  clonedBond.style.stroke = '#8080ff'
  clonedBond.style['stroke-width'] = '12px'
  clonedBond.style['stroke-linecap'] = 'round'
  clonedBond.setAttributeNS(null, 'class', 'substructure-highlight')
  return clonedBond
}

/**
 * Get atom postion from bonds containing it.
 * @param {string} atomName - name of the atom
 * @param {Array<SVGElement>} bondPaths - bond SVG elements containing the atom
 * @returns {Array<number, 2>} position of the atom contained in the bonds
 */
function getAtomPositionFromBonds (atomName, bondPaths) {
  // extract the bond position from a single bond
  if (bondPaths.length === 1) {
    return getBondPositionForAtom(atomName, bondPaths[0])
  }
  const combinedBonds = combineBonds(bondPaths)
  // extract the bond position from a single bond sorted to the front
  if (combinedBonds[0].length === 1) {
    return getBondPositionForAtom(atomName, combinedBonds[0][0])
  }
  /* If a bond is split into two the head and tail points of the two bonds
     will repeat. The position associated with the query that is not repeated
     is the true one */
  if (combinedBonds.length === 1 && combinedBonds[0].length === 2) {
    let positions = [
      ...getBondAtomPositions(combinedBonds[0][0]),
      ...getBondAtomPositions(combinedBonds[0][1]),
    ]
    const candidatePositions = [
      getBondPositionForAtom(atomName, combinedBonds[0][0]),
      getBondPositionForAtom(atomName, combinedBonds[0][1]),
    ]
    for (const point of candidatePositions) {
      let found = 0
      for (const otherPoint of positions) {
        if (point.every((val, index) => val === otherPoint[index])) {
          found += 1
        }
      }
      if (found === 1) {
        return point
      }
    }
  }

  // find the atoms point at the intersection of two split bonds
  let possibleAtomPoints = []
  for (const value of combinedBonds) {
    const currentAtomPositions = []
    for (const bond of value) {
      currentAtomPositions.push(getBondPositionForAtom(atomName, bond))
    }

    if (value.length === 1) {
      return currentAtomPositions[0]
    } else if (combinedBonds.length === 1 && currentAtomPositions.length === 2) {
      return currentAtomPositions[0]
    }
    if (possibleAtomPoints.length === 0) {
      possibleAtomPoints = currentAtomPositions.slice()
    } else {
      return getCommonPoint(currentAtomPositions, possibleAtomPoints)
    }
  }
}

/**
 * Combine bond elements to collection representing the same bond. Bonds to
 * heteroatoms can be split into two to color one half differently. Bonds
 * consisting of one element are sorted to the front.
 * @param {Array<SVGElement>} bondPaths - bond SVG elements to combine to bonds
 * @returns {Array<Array<SVGElement>>} combined bond elements
 */
function combineBonds (bondPaths) {
  const combinedBonds = new Map()
  for (const bond of bondPaths) {
    bond.classList.forEach((cssClass) => {
      if (cssClass.includes('atom')) {
        return
      }
      if (!combinedBonds.has(cssClass)) {
        combinedBonds.set(cssClass, [])
      }
      combinedBonds.get(cssClass).push(bond)
    })
  }
  return Array.from(combinedBonds.values()).sort((a, b) => a.length - b.length)
}

/**
 * Get positon of an atom in a bond by its name.
 * @param {string} atomName - name of the atom
 * @param {SVGElement} bondPath - bond SVG element
 * @returns {Array<number, 2>} position of the atom
 */
function getBondPositionForAtom(atomName, bond) {
  const [fromPosition, toPosition] = getBondAtomPositions(bond)
  if (bond.classList[1] === atomName) {
    return fromPosition
  } else {
    return toPosition
  }
}

/**
 * Get positions of the from and too atoms of a bond.
 * @param {SVGElement} bondPath - bond SVG element
 * @returns {Array<Array<number, 2>, 2>} from and too positions
 */
function getBondAtomPositions (bondPath) {
  const splitInstructions = bondPath.getAttribute('d').split(' ')
  const fromPosition = splitInstructions[1].split(',').map(parseFloat)
  const toPosition = splitInstructions[3].split(',').map(parseFloat)
  return [fromPosition, toPosition]
}

/**
 * Get the first common point.
 * @param {Array<Array<number, 2>>} points - array of points
 * @param {Array<Array<number, 2>>} otherPoints - other array of points
 * @returns {Array<number, 2>} first common point
 */
function getCommonPoint (points, otherPoints) {
  for (const point of points) {
    for (const otherPoint of otherPoints) {
      // array equal
      if (point.every((val, index) => val === otherPoint[index])) {
        return point
      }
    }
  }
}

/**
 * Get furthest bond position from another atom. Useuful for stereo bonds
 * pointing down, which are split into many lines.
 * @param {string} atomName - name of the atom
 * @param {Array<number, 2>} otherAtomPosition - position of the other atom
 * @param {Array<Array<SVGElement>>} bondPaths - bonds associated with both atoms
 * @returns {Array<number, 2>} furthest point from the other atom position
 */
function getFurthestFromOtherAtom (atomName, otherAtomPosition, bondPaths) {
  let furthestDistance = 0
  let furthestPoint = undefined
  for (let i = 0; i < bondPaths.length; i++) {
    const [fromPosition, toPosition] = getBondAtomPositions(bondPaths[i])
    const midPosition = [
      (fromPosition[0] + toPosition[0]) / 2,
      (fromPosition[1] + toPosition[1]) / 2
    ]
    const distance = getDistance(midPosition, otherAtomPosition)
    if (furthestDistance < distance) {
      furthestDistance = distance
      furthestPoint = midPosition
    }
  }
  return furthestPoint
}

/**
 * Euclidean distance between 2 2D points.
 * @param {Array<number, 2>} point - 2D point
 * @param {Array<number, 2>} otherPoint - other 2D point
 * @returns {number} euclidean distance
 */
function getDistance (point, otherPoint) {
  return Math.sqrt(
    Math.pow(point[0] - otherPoint[0], 2) + Math.pow(point[1] - otherPoint[1], 2)
  )
}

/**
 * Get all path positions.
 * @param {SVGElement} path - path to extract positions from
 * @returns {Array<Array<number, 2>>} path positions
 */
function getPathPositions(path) {
  const splitInstructions = path.getAttribute('d').split(' ')
  const positions = []
  for (const token of splitInstructions) {
    if (token.includes(',')) {
      positions.push(token.split(',').map(parseFloat))
    }
  }
  return positions
}
