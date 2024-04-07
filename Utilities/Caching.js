import { getData, removeValue, storeData } from './AsyncStorageFactory';

/* eslint-disable no-console */
const RNFS = require('react-native-fs');

const getCachePath = (url, folderName = "") => {
    if (!url)
        return folderName;
    let path_name = RNFS.DocumentDirectoryPath + "/" + (folderName != "" ? folderName + "/" : "") + getFileName(url);
    return path_name;
};
const getFileName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1, url.length)
}

const createCache = (url, folderName = "") => {
    let path_name = getCachePath(url, folderName);
    if (folderName != "") {
        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/" + folderName).then(() => {
            console.log("[Caching]: folder created");
        }).catch((err) => {
            console.log(err);
        });
    }
    return new Promise((resolve, reject) => {
        RNFS.exists(path_name).then(exists => {
            if (exists) {
                resolve({ success: true });
                console.log("[Caching]: Already downloaded", path_name);
            } else {
                RNFS.downloadFile({
                    fromUrl: url,
                    toFile: path_name.replace(/%20/g, "_"),
                    background: true
                })
                    .promise.then(res => {
                        console.log("[Caching]: File Downloaded", res);
                        storeData(getFileName(url), { downloaded: true, cTime: new Date() })
                        resolve({ ...res, success: true });
                    })
                    .catch(err => {
                        console.log("[Caching]: err downloadFile ", err);
                        reject({ ...err, success: false });
                    });
            }
        });
    })

};

const fetchFromCache = (url, folderName = "") => {
    let fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
    return new Promise((resolve, reject) => {
        let fileFound = false;
        RNFS.readDir(RNFS.DocumentDirectoryPath + (folderName != "" ? "/" + folderName : ""))
            .then(result => {
                result.forEach(element => {
                    if (element.name == fileName.replace(/%20/g, "_")) {
                        resolve(element.path);
                        fileFound = true;
                    }
                });
                if (!fileFound) {
                    resolve(url);
                    createCache(url);
                }
            })
            .catch(err => {
                createCache(url);
                reject(url, err);
            });
    });
};

const resolvePathForCachedItem = (url, folderName) => {
    let path_name = getCachePath(url, folderName);
    return new Promise((resolve) => {
        getData(getFileName(url)).then((res) => {
            if (res?.downloaded) {
                resolve(path_name);
            }
            else {
                resolve(url);
                createCache(url, folderName);
            }
        }).catch(() => {
            resolve(url);
            createCache(url, folderName);
        });
    });
};

const removeCachedFile = (url, folderName) => {
    let path_name = getCachePath(url, folderName);
    return new Promise((resolve) => {
        RNFS.unlink(path_name)
            .then(() => {
                removeValue(getFileName(url));
                resolve(true);
                console.log('[Caching]: FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                resolve(false);
                console.log('[Caching]: ', err.message);
            });
    });
};
const removeAllCachedFilesFromFolder = (folderName, expiryHrs = -1) => RNFS.readDir(RNFS.DocumentDirectoryPath + (folderName != "" ? "/" + folderName : ""))
    .then(result => {
        result.forEach(element => {
            RNFS.stat(element.path).then((itemMetaData) => {
                let itemCreationTime = new Date(itemMetaData.ctime).getTime()
                let currentTime = new Date().getTime();
                if ((expiryHrs == -1) || (Math.abs(Math.round((currentTime - itemCreationTime) / (1000 * 60 * 60))) > expiryHrs)) {
                    return RNFS.unlink(element.path)
                        .then(() => {
                            console.log('[Caching]: FILE DELETED', element.path);
                        })
                        .catch((err) => {
                            console.log('[Caching]: UNABLE TO PROCEED WITH FILE DELETION', err.message);
                        });
                }
            }).catch(() => { })

        });

    })
    .catch(err => {
        console.log('[Caching]: FOLDER CONTENT NOT DELETED', err);

    });



export { createCache, fetchFromCache, resolvePathForCachedItem, removeCachedFile, removeAllCachedFilesFromFolder };