#!/usr/bin/env node

const File = require('./file')
const Color = require('./color-console')
const Commander = require('commander')
const Path = require('path')
const SubDBService = require('./services/subdb')
const PackageJson = require('./package.json')

main()

async function main() {
    Commander
        .version(PackageJson.version)
        .arguments('<path>')
        .action(function (path) {
            dirValue = Path.dirname(path)
            fileValue = Path.basename(path)
            pathValue = dirValue + '/' + fileValue
        })
        .option('-l, --lang [value]', 'Language to search e.g.: en')
        .option('-H --hash', 'Get the 64kb hash for the file')
        .option('-s --search', 'Search for languages that subtitle is available')
        .parse(process.argv)

    try {
        // Execute program if has an argument
        if (process.argv.length > 2) {
            // console.log(`Path: ${Color.blue(dirValue)}`);
            console.log(`File/Folder: ${Color.blue(fileValue)}`)
            console.log(`Sub. Lang: ${Color.blue(Commander.lang ? Commander.lang : 'default (en)')} \n`)

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
        // Show help if don't have an argument
        else {
            Commander.help()
        }
    }
    catch (e) {
        console.log(Color.red('An error has occurred, make sure that you are using the command correctly:'))
        console.log('sublegends '+Commander.usage())
    }
}

function getHash(path) {
    console.log('Getting hashes... \n')
    if (File.isDirectory(path)) {
        let listFiles = File.getFileList(path)
        listFiles = File.validateFileExtensions(listFiles)
        for (let file of listFiles) {
            console.log(`${file}: ${Color.green(File.calculateHash(path + '/' + file))}`)
        }
    }
    else {
        console.log(`${Color.green(File.calculateHash(path))}`)
    }
}

async function search(path) {
    console.log('Subtitles available:')

    if (File.isDirectory(path)) {
        let listFiles = File.getFileList(path)
        listFiles = File.validateFileExtensions(listFiles)
        for (let file of listFiles) {
            let hash = File.calculateHash(path + '/' + file)
            let res = await SubDBService.search(hash)
            console.log(`${file}: ${Color.green(res.toUpperCase())}`)
        }
    }
    else {
        // Only search if file extension is valid
        if (File.validateFileExtensions(path)) {
            let hash = File.calculateHash(path)
            let res = await SubDBService.search(hash)
            console.log(Color.green(res.toUpperCase()))
        }
        else{
            console.log("This file hasn't a valid extension")
        }
    }
}

async function download(path, lang) {
    console.log('Downloading Subtitles... \n')
    if (File.isDirectory(path)) {
        let listFiles = File.getFileList(path)
        listFiles = File.validateFileExtensions(listFiles)
        for (let file of listFiles) {
            let hash = File.calculateHash(path + '/' + file)
            let res = await SubDBService.download(hash, lang)
            if (res && res != '') {
                File.writeSub(path + '/' + file, res)
                console.log(`${file}: ${Color.green('OK')}`)
            }
            else {
                console.log(`${file}: ${Color.red('SUBTITLE NOT FOUND!')}`)
            }
        }
    }
    else {
        //Only download if file extension is valid
        if (File.validateFileExtensions(path)) {
            let hash = File.calculateHash(path)
            let res = await SubDBService.search(hash)
            if (res && res != '') {
                File.writeSub(path, res)
                console.log(`${Path.basename(path)}: ${Color.green('OK')}`)
            }
            else {
                console.log(`${Path.basename(path)}: ${Color.red('SUBTITLE NOT FOUND!')}`)
            }
        }
        else{
            console.log("This file hasn't a valid extension")
        }
    }
}
