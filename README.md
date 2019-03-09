# How to install # 

```shell
npm install -g sublegends
```

# How to use #
#### Download all subtitles in a folder ####
Open the movie/serie folder
```shell
cd <movie/series-folder>
```
Use the Sublegends command on the folder
```shell
sublegends .
```
or
```shell
sublegends <path-to-folder>
```
It's all folks. The subtitles will be automatically downloaded for each series/movie.

#### Download unique file subtitle ####
You also can use the Sublegends command direct on file
```shell
sublegends /folder-path/my-file.mp4
```
Your file can be of any extension: `.mp4`,`.avi`,`.mkv`,`.anything`, etc.

# Technology used #
* [NodeJS](https://nodejs.org/en/)
* [Axios](https://www.npmjs.com/package/axios)
* [Commander](https://www.npmjs.com/package/commander)
* [SubDB](http://thesubdb.com)

# Sources #
https://github.com/viniciosanacleto/sublegends