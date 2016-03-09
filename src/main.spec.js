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
      expect(processInputSequence(input)).to.equal('0 0 N')
    })

    it('should not move a robot from 1,1 N', () => {
      const input = generateSequence(10, 10, [['1 1 N']])
      expect(processInputSequence(input)).to.equal('1 1 N')
    })

    it('should not move a robot from 1,1 E', () => {
      const input = generateSequence(10, 10, [['1 1 E']])
      expect(processInputSequence(input)).to.equal('1 1 E')
    })
  })

  describe('single robot', () => {
    describe('simple sequences', () => {
      describe('"F" sequence', () => {
        it('should move a robot from 0,0 N to 0,1 N', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'F']])
          expect(processInputSequence(input)).to.equal('0 1 N')
        })

        it('should move a robot from 0,0 E to 1,0 E', () => {
          const input = generateSequence(10, 10, [['0 0 E', 'F']])
          expect(processInputSequence(input)).to.equal('1 0 E')
        })

        it('should move a robot from 1,1 S to 1,0 S', () => {
          const input = generateSequence(10, 10, [['1 1 S', 'F']])
          expect(processInputSequence(input)).to.equal('1 0 S')
        })

        it('should move a robot from 1,1 W to 0,1 W', () => {
          const input = generateSequence(10, 10, [['1 1 W', 'F']])
          expect(processInputSequence(input)).to.equal('0 1 W')
        })
      })

      describe('"FFFFF" sequence', () => {
        it('should move a robot from 0,0 N to 0,5 N', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'FFFFF']])
          expect(processInputSequence(input)).to.equal('0 5 N')
        })
      })

      describe('"R" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 E', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'R']])
          expect(processInputSequence(input)).to.equal('0 0 E')
        })

        it('should move a robot from 0,0 E to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 E', 'R']])
          expect(processInputSequence(input)).to.equal('0 0 S')
        })

        it('should move a robot from 0,0 S to 0,0 W', () => {
          const input = generateSequence(10, 10, [['0 0 S', 'R']])
          expect(processInputSequence(input)).to.equal('0 0 W')
        })

        it('should move a robot from 0,0 W to 0,0 N', () => {
          const input = generateSequence(10, 10, [['0 0 W', 'R']])
          expect(processInputSequence(input)).to.equal('0 0 N')
        })
      })

      describe('"L" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 W', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'L']])
          expect(processInputSequence(input)).to.equal('0 0 W')
        })

        it('should move a robot from 0,0 E to 0,0 N', () => {
          const input = generateSequence(10, 10, [['0 0 E', 'L']])
          expect(processInputSequence(input)).to.equal('0 0 N')
        })

        it('should move a robot from 0,0 S to 0,0 E', () => {
          const input = generateSequence(10, 10, [['0 0 S', 'L']])
          expect(processInputSequence(input)).to.equal('0 0 E')
        })

        it('should move a robot from 0,0 W to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 W', 'L']])
          expect(processInputSequence(input)).to.equal('0 0 S')
        })
      })

      describe('"RR" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'RR']])
          expect(processInputSequence(input)).to.equal('0 0 S')
        })
      })

      describe('"LL" sequence', () => {
        it('should move a robot from 0,0 N to 0,0 S', () => {
          const input = generateSequence(10, 10, [['0 0 N', 'LL']])
          expect(processInputSequence(input)).to.equal('0 0 S')
        })
      })
    })

    describe('mixed sequences', () => {
      it('"FFRFFLFF" should move a robot from 0,0N to 2,4N', () => {
        const input = generateSequence(10, 10, [['0 0 N', 'FFRFFLFF']])
        expect(processInputSequence(input)).to.equal('2 4 N')
      })
    })

    describe('robot is lost when moving off the grid', () => {
      it('is lost when moving off the north of the grid', () => {
        const input = generateSequence(10, 10, [['0 9 N', 'F']])
        expect(processInputSequence(input)).to.equal('0 9 LOST')
      })

      it('is lost when moving off the east of the grid', () => {
        const input = generateSequence(10, 10, [['9 0 E', 'F']])
        expect(processInputSequence(input)).to.equal('9 0 LOST')
      })

      it('is lost when moving off the south of the grid', () => {
        const input = generateSequence(10, 10, [['0 0 S', 'F']])
        expect(processInputSequence(input)).to.equal('0 0 LOST')
      })

      it('is lost when moving off the west of the grid', () => {
        const input = generateSequence(10, 10, [['0 0 W', 'F']])
        expect(processInputSequence(input)).to.equal('0 0 LOST')
      })
    })


  })

  describe('limits', () => {

  })
})
