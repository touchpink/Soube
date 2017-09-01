/**
 * @author Diego Alberto Molina Vera
 * @copyright 2016 - 2017
 */
/* --------------------------------------- Modules ------------------------------------------- */
const path = require('path')
const fs = require('fs')

/* --------------------------------------- Functions ------------------------------------------- */
// List of files and sub-files
// In this way, we avoid to use recursion
function findFiles(dir) {
    let tmpFolders = []
    let allFiles = []
    let folders = []
    let foldersSize = 0
    let baseFolder = ''

    fs.readdirSync(dir).forEach(function (files) {
        // Based folders
        baseFolder = path.join(dir, files)
        if (fs.lstatSync(baseFolder).isDirectory())
            folders.push(baseFolder)
        else if (fs.lstatSync(baseFolder).isFile() && /\.(mp3|wav|ogg)$/ig.test(baseFolder.trim()))
            allFiles.push(baseFolder)
    })

    foldersSize = folders.length - 1
    var count = 0
    while (foldersSize > -1) {
        fs.readdirSync(folders[foldersSize]).forEach(function (files) {
            baseFolder = path.join(folders[foldersSize], files)
            if (fs.lstatSync(baseFolder).isDirectory())
                tmpFolders.push(baseFolder)
            else if (fs.lstatSync(baseFolder).isFile() && /\.(mp3|wav|ogg)$/ig.test(baseFolder.trim()))
                allFiles.push(baseFolder)
        })

        folders.pop()
        folders = folders.concat(tmpFolders)
        foldersSize = folders.length - 1
    }

    postMessage({ files: allFiles.join('|') })
}


this.onmessage = function (e) {
    findFiles(e.data.folder)
}
