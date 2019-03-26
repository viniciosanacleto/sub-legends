# Sublegends #
Download subtitles direct from your terminal

# Last updates #
##### v1.1.3 #####
* Readme update

##### v1.1.0 #####
* File extension validation
* Error catching bugs
* Help as default command if no path has been passed
* Console outputs colored
  

# How to install # 

```shell
npm install -g sublegends
```

# How to use #
#### Download all subtitles from a folder ####
Open the movie/serie folder
```shell
cd <path-to-folder>
```
Use the Sublegends command on the folder
```shell
sublegends .
```
or
```shell
sublegends <path-to-folder>
```
It's all folks. The subtitles will be automatically downloaded for each series/movie file.

#### Download unique subtitle for a file ####
You also can use the Sublegends command for a unique file
```shell
sublegends /folder-path/my-file.mp4
```
Your file can be of any valid extension. [List of valid extensions](https://github.com/viniciosanacleto/sublegends/blob/master/src/misc/extensions.json)

#### Change the subtitle language ####
By default the subtitles are downloaded in english. However if you want to download in other language you can use the `-l` or `--lang` option e.g:
```shell
sublegends . -l fr
```
If you want to know what languages are available for a specific file:
```shell
sublegends <path-to-file> -s
```
Know the languages available for a list of files inside a folder:
```shell
sublegends <path-to-folder> -s
```

# Technology used #
* [NodeJS](https://nodejs.org/en/)
* [Axios](https://www.npmjs.com/package/axios)
* [Commander](https://www.npmjs.com/package/commander)
* [SubDB](http://thesubdb.com)

# Sources #
https://github.com/viniciosanacleto/sublegends