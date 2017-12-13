#!/usr/bin/env node

'use strict';
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const colors = require('colors')

// get the egret dist path
let targetPath = process.cwd()
if (process.argv.length >= 3) {
  targetPath = process.argv[process.argv.length - 1]
}
targetPath = path.resolve(targetPath)

// read all file in a dir
let readDir = (filepath) => {
  let files = fs.readdirSync(filepath)
  let result = []
  files.map(fn => {
    let thisPath = path.resolve(filepath, fn)
    let stats = fs.lstatSync(thisPath)
    if (stats.isFile()) {
      if (fn.search('.wxss') === fn.length - 5) {
        result.push(thisPath)
      }
    } else if (stats.isDirectory()) {
      result = result.concat(readDir(thisPath))
    }
  })

  return result
}

let wxssFiles = readDir(targetPath)
let successCnt = 0
// start to rename file
wxssFiles.map(wf => {
  let nwf = wf.substr(0, wf.length - 4) + 'less'
  let r = shell.mv(wf, nwf)
  if (!r || r.code !== 0) {
    console.log('[FAILED]'.red, 'rename'.yellow, wf.cyan, 'to', path.basename(nwf).cyan)
  } else {
    // replace .wxss to .less in file content
    let content = fs.readFileSync(nwf, {
      encoding: 'utf8'
    })
    fs.writeFileSync(nwf, content.replace(/\.wxss/g, '\.less'))
    successCnt++
    console.log('[SUCCESS]'.green, 'rename'.yellow, wf.cyan, 'to', path.basename(nwf).cyan)
  }
})
console.log('total', String(wxssFiles.length).cyan, '.wxss files,', String(successCnt).green, 'renamed as less')
