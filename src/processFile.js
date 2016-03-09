"use strict"

const fs = require('fs')

const processInput = require('./main')

const args = process.argv.slice(2)
if (!args[0]) {
  throw new Error('No filename specified - specify filename as first input argument')
}

fs.readFile(args[0], 'utf-8', (err, data) => {
  if (err) {
    throw err
  }

  console.log(processInput(data))
})
