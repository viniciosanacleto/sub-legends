#!/usr/bin/env node

const File = require('./file')
const Commander = require('commander')
const Path = require('path')
const SubDBService = require('./services/subdb')

main()

async function main() {
    Commander
        .version('1.0.0')
        .arguments('<path>')
        .action(function (path) {
            dirValue = Path.dirname(path)
            fileValue = Path.basename(path)
            pathValue = dirValue + '/' + fileValue
        })
        .option('-l, --lang [value]', 'Language to search e.g.: en')
        .option('-h --hash', 'Get the 64kb hash for the file')
        .option('-s --search', 'Search for languages that subtitle is available')
        .parse(process.argv)

    try {
        console.log(`Path: ${dirValue}`);
        console.log(`File: ${fileValue}`)
        console.log(`Sub. Lang: ${Commander.lang ? Commander.lang : 'default (en)'} \n`)
        // console.log(`Is a directory: ${File.isDirectory(pathValue)}`)
        // console.log(File.getFileList(pathValue))

        if (Commander.hash) {
            getHash(pathValue)
        }
        else if (Commander.search) {
            await search(pathValue)
        }
        else {
            let lang = Commander.lang ? Commander.lang : 'en'
            await download(pathValue, lang)
        }
    }
    catch (e) {
        console.error('ERROR:', e)
    }
}

function getHash(path) {
    if (File.isDirectory(path)) {
        let listFiles = File.getFileList(path)
        for (let file of listFiles) {
            console.log(`Hash [${file}]: ${File.calculateHash(path + '/' + file)}`)
        }
    }
    else {
        console.log(`Hash: ${File.calculateHash(path)}`)
    }
}

async function search(path) {
    console.log('Subtitles available:')

    if (File.isDirectory(path)) {
        let listFiles = File.getFileList(path)
        for (let file of listFiles) {
            let hash = File.calculateHash(path + '/' + file)
            let res = await SubDBService.search(hash)
            console.log(`[${file}]: ${res.toUpperCase()}`)
        }
    }
    else {
        let hash = File.calculateHash(path)
        let res = await SubDBService.search(hash)
        console.log(res.toUpperCase())
    }
}

async function download(path, lang) {
    console.log('Downloading Subtitles')
    if (File.isDirectory(path)) {
        let listFiles = File.getFileList(path)
        for (let file of listFiles) {
            let hash = File.calculateHash(path + '/' + file)
            let res = await SubDBService.download(hash, lang)
            if (res && res != '') {
                File.writeSub(path + '/' + file, res)
                console.log(`[${file}]: OK`)
            }
            else{
                console.log(`[${file}]: SUBTITLE NOT FOUND!`)
            }
        }
    }
    else {
        let hash = File.calculateHash(path)
        let res = await SubDBService.search(hash)
        if (res && res != '') {
            File.writeSub(path, res)
            console.log(`[${Path.basename(path)}]: OK`)
        }
        else{
            console.log(`[${Path.basename(path)}]: SUBTITLE NOT FOUND!`)
        }
    }
}
