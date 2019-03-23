const fs = require('fs')
const crypto = require('crypto')
const Path = require('path')
class File {
    /**
     * Calculate MD5 hash of file using first and last 64kb data of file
     * @param {string} filePath 
     * @param {number} readSize 
     */
    calculateHash(filePath, readSize = 64) {
        let readSizeKbs = readSize * 1024

        if (fs.existsSync(filePath)) {
            let fileSize = fs.statSync(filePath).size
            let buffer = new Buffer(readSizeKbs * 2)
            let openedFile = fs.openSync(filePath, "r")

            let bytes = fs.readSync(openedFile, buffer, 0, readSizeKbs, 0)
            bytes += fs.readSync(openedFile, buffer, readSizeKbs, readSizeKbs, fileSize - readSizeKbs)

            return crypto.createHash('md5').update(buffer).digest('hex')
        }
        else {
            throw new Error(`File doesn't exist`)
        }
    }

    /**
     * Verify if path directs to a directory or a file
     * @param {string} path 
     */
    isDirectory(path) {
        return fs.lstatSync(path).isDirectory()
    }

    /**
     * Get the list of files in a folder
     * @param {string} path 
     * @returns array
     */
    getFileList(path) {
        if (this.isDirectory(path)) {
            return fs.readdirSync(path).filter((file) => {
                return !this.isDirectory(path + '/' + file)
            })
        }
        else {
            return [Path.basename(path)]
        }
    }

    /**
     * Write in a SRT file the content of the substitle
     * @param {string} path 
     * @param {string} content 
     */
    writeSub(path, content) {
        try {
            let baseName = Path.basename(path)
            let basePath = Path.dirname(path)
            let extName = Path.extname(path)
            let subFileName = basePath + '/' + baseName.replace(extName, '.srt')

            fs.writeFileSync(subFileName, content)
        }
        catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Get the list of valid file extensions
     */
    _getValidFileExtensions() {
        return JSON.parse(fs.readFileSync('./misc/extensions.json'))
    }

    /**
     * Validate extensions of a file list
     * @param {Array | String} files 
     * @returns {Array | String | null} validList
     */
    validateFileExtensions(files) {
        let extensions = this._getValidFileExtensions()
        if (typeof (files) == 'object') {
            let validList = []
            for (let file of files) {
                let ext = Path.extname(file).substr(1)
                if (extensions.includes(ext)) {
                    validList.push(file)
                }
            }
            return validList
        }
        else if(typeof (files) == 'string'){
            let ext = Path.extname(files).substr(1)
            if (extensions.includes(ext)) {
                return files
            }
            return null
        }
        else{
            return null
        }
    }
}

module.exports = new File