class ColorConsole{
    green(string){
        return `\x1b[32m${string}\x1b[0m`
    }

    red(string){
        return `\x1b[31m${string}\x1b[0m`
    }

    blue(string){
        return `\x1b[34m${string}\x1b[0m`
    }
}

module.exports = new ColorConsole