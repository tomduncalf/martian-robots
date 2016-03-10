"use strict"

const _ = require('lodash/fp')

const MAX_WORLD_DIM = 50

// processInput :: String -> String
// Process an input string representing information about the world and a number of robot
// instruction sequences, outputting each robot's final position
function processInput(input) {
  const lines = input.split('\n').filter(_.size)

  if (!lines.length) {
    throw new Error('No input lines found')
  }

  const [ worldMaxX, worldMaxY ] = lines[0].split(' ')
  const robotInstructions = _.chunk(2, lines.slice(1))

  const initialState = {
    world: createWorld(parseInt(worldMaxX, 10) + 1, parseInt(worldMaxY, 10) + 1),
    output: []
  }

  const finalState = robotInstructions.reduce(
    (currentState, instruction) => {
      const [ startPos, sequence ] = instruction

      const result = processRobotSequence(currentState.world, startPos, sequence)

      return {
        world: result.world,
        output: currentState.output.concat(result.output)
      }
    },
    initialState
  )

  return finalState.output.join('\n')
}

// createWorld :: Number -> Number -> World
// World is: [[Boolean]]
//
// Create a 2-dimensional array of booleans representing the world, with the boolean used to
// represent if a robot has been lost at a given position
function createWorld(width, height) {
  if (!(width && height)) {
    throw new Error('No world dimensions found')
  }

  if (width > MAX_WORLD_DIM || height > MAX_WORLD_DIM) {
    throw new Error('Maximum world dimensions exceeded')
  }

  const world = _.range(0, width).map(() => _.range(0, height).map(() => false))
  return world
}

// processRobotSequence :: World -> String -> String -> ProcessedState
// ProcessedState is: { world: World, output: String }
//
// Take a start position, world and sequence of instructions for a robot and return the state of the world
// after the robots has navigated it, and the final position of the robot
function processRobotSequence(world, startPos, sequence) {
  const splitStartPos = startPos.split(' ')
  const splitSequence = sequence ? sequence.split('') : []

  if (splitStartPos.length !== 3) {
    throw new Error(`Invalid start position supplied: ${startPos}`)
  }

  const initialState = {
    world: world,
    position: { x: parseInt(splitStartPos[0], 10), y: parseInt(splitStartPos[1], 10) },
    direction: splitStartPos[2],
    lost: false
  }

  const finalState = splitSequence.reduce(
    (currentState, step) => {
      if (!currentState.lost) {
        return processStep(currentState, step)
      } else {
        return currentState
      }
    },
    initialState
  )

  return {
    world: finalState.world,
    output: `${finalState.position.x} ${finalState.position.y} ${finalState.direction}${finalState.lost ? ' LOST' : ''}`
  }
}

// processStep :: State -> String -> State
// State is: { world: World, position: Position, direction: String, lost: Boolean }
// Position is: { x: Number, y: Number }
//
// Process a single step of a sequence and return the new state as a result of it
function processStep(state, step) {
  const newState = Object.assign({}, state)

  switch (step) {
    case 'F':
      const newPosition = getRelativePosition(state.position, state.direction, 1)
      const robotLostHere = state.world[state.position.x][state.position.y] === true
      const isOutsideBounds = outsideBounds(newPosition, state.world)

      if (isOutsideBounds && !robotLostHere) {
        newState.world[state.position.x][state.position.y] = true
        newState.lost = true
      } else if (!isOutsideBounds) {
        newState.position = newPosition
      }

      break
    case 'R':
      newState.direction = getRelativeDirection(state.direction, 1)
      break
    case 'L':
      newState.direction = getRelativeDirection(state.direction, -1)
      break
  }

  return newState
}

// outsideBounds :: Position -> World -> Boolean
// Check if a position is outside the bounds of a rectangular world
function outsideBounds(position, world) {
  return position.x > world.length - 1 || position.x < 0 || position.y > world[0].length - 1|| position.y < 0
}

// getRelativePosition :: Position -> String -> Number -> Position
// Get the position {x, y} relative to a given position in a given direction for a given delta
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

// getRelativeDirection :: String -> Number -> String
// Get the compass direction relative to the given direction and delta
function getRelativeDirection(direction, delta) {
  const directions = ['N', 'E', 'S', 'W']
  return directions[mod((directions.indexOf(direction) + delta), directions.length)]
}

// JS modulo doesn't behave as we want for negatives:
// http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
function mod(n, m) {
  return ((n % m) + m) % m
}

module.exports = processInput
