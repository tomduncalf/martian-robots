"use strict"

const _ = require('lodash/fp')

// processInput :: String -> String
function processInput(input) {
  const lines = input.split('\n').filter(_.size)

  if (!lines.length) {
    throw new Error('No input lines found')
  }

  const [ worldW, worldH ] = lines[0].split(' ')
  const robotInstructions = _.chunk(2, lines.slice(1))

  const initialState = {
    world: createWorld(parseInt(worldW, 10), parseInt(worldH, 10)),
    output: []
  }

  const finalState = robotInstructions.reduce(
    (accState, instruction) => {
      const [ startPos, sequence ] = instruction
      console.log(`startPos ${startPos}, sequence ${sequence}`)

      const result = processRobotSequence(accState.world, startPos, sequence)

      return {
        world: result['world'],
        output: accState.output.concat(result['output'])
      }
    },
    initialState
  )

  return finalState.output.join('\n')
}

// createWorld :: Number -> Number -> [Boolean]
// Create a 2-dimensional array of booleans representing the world and whether a robot
// has been lost at a given position
function createWorld(width, height) {
  if (!(width && height)) {
    throw new Error('No world dimensions found')
  }

  if (width > 50 || height > 50) {
    throw new Error('Maximum world dimensions exceeded')
  }

  const world = _.range(0, width).map(() => _.range(0, height).map(() => false))
  return world
}

// processRobotSequence :: World -> String -> String -> [World, String]
// Take a start position and sequence of instructions for a robot and return the state of the world
// after the robots has navigated it, and the final position outpuy for the robot
function processRobotSequence(world, startPos, sequence) {
  const splitStartPos = startPos.split(' ')
  const splitSequence = sequence ? sequence.split('') : []

  if (splitStartPos.length !== 3) {
    throw new Error(`Invalid start position supplied: ${startPos}`)
  }

  const initialState = {
    position: { x: parseInt(splitStartPos[0], 10), y: parseInt(splitStartPos[1], 10) },
    direction: splitStartPos[2],
    lost: false
  }

  const finalState = splitSequence.reduce(
    (accState, step) => {
      return processStep(accState, step)
    },
    initialState
  )

  return {
    world: world,
    output: `${finalState.position.x} ${finalState.position.y} ${finalState.direction}`
  }
}

function processStep(state, step) {
  const newState = Object.assign({}, state)

  switch (step) {
    case 'F':
      newState.position = getRelativePosition(state.position, state.direction, 1)
      break
    case 'R':
      newState.direction = getRelativeDirection(state.direction, 1)
      break;
    case 'L':
      newState.direction = getRelativeDirection(state.direction, -1)
      break;
  }

  return newState
}

function getRelativePosition(position, direction, delta) {
  switch (direction) {
    case 'N':
      return { x: position.x, y: position.y + delta }
    case 'E':
      return { x: position.x + delta, y: position.y }
    case 'S':
      return { x: position.x, y: position.y - delta }
    case 'W':
      return { x: position.x - delta, y: position.y }
  }
}

function getRelativeDirection(direction, delta) {
  const directions = ['N', 'E', 'S', 'W']
  return directions[mod((directions.indexOf(direction) + delta), directions.length)];
}

// JS modulo doesn't behave for negatives: http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
function mod(n, m) {
    return ((n % m) + m) % m;
}

module.exports = processInput
