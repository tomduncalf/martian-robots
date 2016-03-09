"use strict"

const _ = require('lodash/fp')

// processInput :: String -> String
function processInput(input) {
  const lines = input.split('\n').filter(_.size)

  if (!lines.length) {
    throw new Error('No input lines found')
  }

  const [ worldW, worldH ] = lines[0].split(' ')
  let world = createWorld(worldW, worldH)

  let outputs = []
  const robotInstructions = _.chunk(2, lines.slice(1))

  robotInstructions.map(instruction => {
    const [ startPos, sequence ] = instruction

    const result = processRobotSequence(world, startPos, sequence)
    world = result[0]
    outputs.push(result[1])
  })

  return outputs.join('\n')
}

// processRobotSequence :: World -> String -> String -> [World, String]
// Take a start position and sequence of instructions for a robot and return the state of the world
// after the robots has navigated it, and the final position outpuy for the robot
function processRobotSequence(world, startPos, sequence) {
  return [ world, sequence ]
}

// createWorld :: Number -> Number -> [Boolean]
function createWorld(width, height) {
  if (!width && height) {
    throw new Error('No world dimensions found')
  }

  return []
}

module.exports = processInput
