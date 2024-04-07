import { getData, storeData } from './Utility';
import {
    createCache,
    resolvePathForCachedItem as getCachePath,
    removeAllCachedFilesFromFolder
} from './Caching';

const FOLDER_NAME_TO_STORE_VIDEOS = "xid_stories";
const NUM_OF_PRECEEDING_STORIES_TO_CACHE = 3;
const CACHE_CLEAR_DURATION_IN_HRS = 22;
const VIDEO_CACHE_CLEARED_TIME = "VIDEO_CACHE_CLEARED_TIME";

const cacheProjectVideos = (storiesData, currentIndex) => {
    createCacheForVideosSequentially(storiesData, currentIndex, currentIndex + NUM_OF_PRECEEDING_STORIES_TO_CACHE)
};
const createCacheForVideosSequentially = (storiesData, currentIndex, upperIndexLimitToCache) => {
    console.log("[Caching]: createCacheForVideosSequentially called for the index", currentIndex, upperIndexLimitToCache);
    if (currentIndex < upperIndexLimitToCache) {
        createCache(storiesData[currentIndex]?.storyUrl, FOLDER_NAME_TO_STORE_VIDEOS).then((res) => {
            console.log("[Caching] promise resolved");
            if (res?.success) {
                console.log("[Caching]: caching successful for the index", currentIndex);
                createCacheForVideosSequentially(storiesData, currentIndex + 1, upperIndexLimitToCache);
            }
        }).catch(() => {
            console.log("[Caching]: caching failed for ", currentIndex);
        })
    }
}
const resolvePathForCachedItem = (videoUrl) => {
    return getCachePath(videoUrl, FOLDER_NAME_TO_STORE_VIDEOS);
};

const clearCachedVideos = async (videoCacheExpiryTimeInhrs = 22) => {
    let currentTime = new Date();
    let lastClearedTime = await getData(VIDEO_CACHE_CLEARED_TIME);
    if (!lastClearedTime) {
        storeData(VIDEO_CACHE_CLEARED_TIME, currentTime);
    }
    else {
        let lastClearedTimeObj = new Date(lastClearedTime);
        if (Math.abs(Math.round((currentTime.getTime() - lastClearedTimeObj.getTime()) / (1000 * 60 * 60))) > CACHE_CLEAR_DURATION_IN_HRS) {
            removeAllCachedFilesFromFolder(FOLDER_NAME_TO_STORE_VIDEOS, videoCacheExpiryTimeInhrs).then(() => {
                storeData(VIDEO_CACHE_CLEARED_TIME, currentTime);
            }).catch(() => {

            })
        }
    }

};

export { cacheProjectVideos, resolvePathForCachedItem, clearCachedVideos };