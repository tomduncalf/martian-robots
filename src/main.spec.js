"use strict"

const expect = require('chai').expect
const processInput = require('./main')

function generateSequence(worldW, worldH, robots) {
  return `${worldW} ${worldH}
${robots.map(instructions => instructions.join('\n')).join('\n')}`
}

describe('martian robots', () => {
  describe('zero length sequence', () => {
    it('should not move a robot from 0,0 N', () => {
      const input = generateSequence(10, 10, [['0 0 N']])
      expect(processInput(input)).to.equal('0 0 N')
    })

    it('should not move a robot from 1,1 N', () => {
      const input = generateSequence(10, 10, [['1 1 N']])
      expect(processInput(input)).to.equal('1 1 N')
    })

    it('should not move a robot from 1,1 E', () => {
      const input = generateSequence(10, 10, [['1 1 E']])
      expect(processInput(input)).to.equal('1 1 E')
    })
  })

  describe('single robot', () => {
    describe('simple sequences', () => {
      describe('"F" sequence', () => {
        it('should move a robot from 0,0 N to 0,1 N', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'F']])
          expect(processInput(input)).to.equal('0 1 N')
        })

        it('should move a robot from 0,0 E to 1,0 E', () => {
          const input = generateSequence(10, 10, [['0 0 E', 'F']])
          expect(processInput(input)).to.equal('1 0 E')
        })

        it('should move a robot from 1,1 S to 1,0 S', () => {
          const input = generateSequence(10, 10, [['1 1 S', 'F']])
          expect(processInput(input)).to.equal('1 0 S')
        })

        it('should move a robot from 1,1 W to 0,1 W', () => {
          const input = generateSequence(10, 10, [['1 1 W', 'F']])
          expect(processInput(input)).to.equal('0 1 W')
        })
      })

      describe('"FFFFF" sequence', () => {
        it('should move a robot from 0,0 N to 0,5 N', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'FFFFF']])
          expect(processInput(input)).to.equal('0 5 N')
        })
      })

      describe('"R" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 E', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'R']])
          expect(processInput(input)).to.equal('0 0 E')
        })

        it('should move a robot from 0,0 E to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 E', 'R']])
          expect(processInput(input)).to.equal('0 0 S')
        })

        it('should move a robot from 0,0 S to 0,0 W', () => {
          const input = generateSequence(10, 10, [['0 0 S', 'R']])
          expect(processInput(input)).to.equal('0 0 W')
        })

        it('should move a robot from 0,0 W to 0,0 N', () => {
          const input = generateSequence(10, 10, [['0 0 W', 'R']])
          expect(processInput(input)).to.equal('0 0 N')
        })
      })

      describe('"L" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 W', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'L']])
          expect(processInput(input)).to.equal('0 0 W')
        })

        it('should move a robot from 0,0 E to 0,0 N', () => {
          const input = generateSequence(10, 10, [['0 0 E', 'L']])
          expect(processInput(input)).to.equal('0 0 N')
        })

        it('should move a robot from 0,0 S to 0,0 E', () => {
          const input = generateSequence(10, 10, [['0 0 S', 'L']])
          expect(processInput(input)).to.equal('0 0 E')
        })

        it('should move a robot from 0,0 W to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 W', 'L']])
          expect(processInput(input)).to.equal('0 0 S')
        })
      })

      describe('"RR" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'RR']])
          expect(processInput(input)).to.equal('0 0 S')
        })
      })

      describe('"LL" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'LL']])
          expect(processInput(input)).to.equal('0 0 S')
        })
      })
    })

    describe('mixed sequences', () => {
      it('"FFRFFLFF" should move a robot from 0,0 N to 2,4 N', () => {
        const input = generateSequence(10, 10, [['0 0 N', 'FFRFFLFF']])
        expect(processInput(input)).to.equal('2 4 N')
      })

      it('"RFRFRFRF" should move a robot from 1,1 E TO 1,1 E', () => {
        const input = generateSequence(5, 3, [['1 1 E', 'RFRFRFRF']])
        expect(processInput(input)).to.equal('1 1 E')
      })

      it('"FRRFLLF" should move a robot from 3,2 N to 3,3 N', () => {
        const input = generateSequence(5, 3, [['3 2 N', 'FRRFLLF']])
        expect(processInput(input)).to.equal('3 3 N')
      })
    })

    describe('robot is lost when moving off the grid', () => {
      it('is lost when moving off the north of the grid', () => {
        const input = generateSequence(10, 10, [['0 10 N', 'F']])
        expect(processInput(input)).to.equal('0 10 N LOST')
      })

      it('is lost when moving off the east of the grid', () => {
        const input = generateSequence(10, 10, [['10 0 E', 'F']])
        expect(processInput(input)).to.equal('10 0 E LOST')
      })

      it('is lost when moving off the south of the grid', () => {
        const input = generateSequence(10, 10, [['0 0 S', 'F']])
        expect(processInput(input)).to.equal('0 0 S LOST')
      })

      it('is lost when moving off the west of the grid', () => {
        const input = generateSequence(10, 10, [['0 0 W', 'F']])
        expect(processInput(input)).to.equal('0 0 W LOST')
      })

      it('does not process further instructions after a robot is lost', () => {
        const input = generateSequence(10, 10, [['0 0 W', 'FRR']])
        expect(processInput(input)).to.equal('0 0 W LOST')
      })

      it('should get lost at the correct location for a sample position', () => {
        const input = generateSequence(5, 3, [['3 3 N', 'F']])
        expect(processInput(input)).to.equal('3 3 N LOST')
      })

      it('should get lost at the correct location for a sample sequence', () => {
        const input = generateSequence(5, 3, [['3 2 N', 'FRRFLLFFRRFLL']])
        expect(processInput(input)).to.equal('3 3 N LOST')
      })
    })
  })

  describe('multiple robots', () => {
    it('should process sequences for multiple robots', () => {
      const input = generateSequence(10, 10, [['0 0 N', 'F'], ['5 0 E', 'F'], ['10 0 S', 'R']])
      expect(processInput(input)).to.equal(['0 1 N', '6 0 E', '10 0 W'].join('\n'))
    })

    it('should not allow a second robot to get lost where the first did', () => {
      const input = generateSequence(10, 10, [['0 10 N', 'F'], ['0 9 N', 'FF']])
      expect(processInput(input)).to.equal(['0 10 N LOST', '0 10 N'].join('\n'))
    })
  })

  it('should process the sample input correctly', () => {
    const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`

    const expected = `1 1 E
3 3 N LOST
2 3 S`

    expect(processInput(input)).to.equal(expected)
  })
})
