"use strict"

const expect = require('chai').expect
const processInputSequence = require('./main')

function generateSequence(worldW, worldH, robots) {
  const seq = `${worldW} ${worldH}
${robots.map(instructions => instructions.join('\n')).join('\n')}`
  return seq
}

describe('martian robots', () => {
  describe('world size', () => {
    /*it('should initialize the world to the correct size', () => {
      expect()
    })*/
  })

  describe('zero length sequence', () => {
    it('should not move a robot from 0,0 N', () => {
      const input = generateSequence(10, 10, [['0 0 N']])
      expect(processInputSequence(input)).to.equal('00N')
    })

    it('should not move a robot from 1,1 N', () => {
      const input = generateSequence(10, 10, [['1 1 N']])
      expect(processInputSequence(input)).to.equal('11N')
    })

    it('should not move a robot from 1,1 E', () => {
      const input = generateSequence(10, 10, [['1 1 E']])
      expect(processInputSequence(input)).to.equal('11E')
    })
  })

  describe('single robot, single movement forward', () => {
    it('should move a robot from 0,0 N to 1,0 N', () => {
      const input = generateSequence(10, 10, [['0 0 N', 'F']])
      expect(processInputSequence(input)).to.equal('10N')
    })
  })

  describe('limits', () => {

  })
})
