import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

const useNNStories = (props) => {
    const {
        ref,
        data,
        // currentStoryIndexRef,
        initialvideoState,
        // setIsPaused,
        isMuted,
        // setIsMuted,
        setCurrentLapsedTime,
        height,
        onNextPress,
        onPrevPress,
        onCenterPress,
        onStoryStart,
        onStoryEnd,
        onBuffer,
        onPause,
        onPlay,
        onLongPress,
        onCurrentIndexChange,
        startingIndex
    } = props;

    const [baseData, setBaseData] = useState(data);
    const videoRef = useRef(null);
    const [allStoriesEnd, setAllStoriesEnd] = useState(false);
    const [volumeState, setVolumeState] = useState(isMuted); // volumeState: true = muted,     volumeState: false = unMuted
    const [currentStoryIndex, setCurrentStoryIndex] = useState(startingIndex);
    const [isPaused, setIsPaused] = useState(initialvideoState);

    useEffect(() => {
        setTimeout(() => {
            setIsPaused(false);
        }, 10)
    }, []);

    //exposing callbacks for onPlay and onPause
    useEffect(() => {
        if (isPaused) {
            onPause();
        }
        else {
            onPlay();
        }
    }, [isPaused]);

    //Progress bar set to zero on every index change
    useEffect(() => {
        setAllStoriesEnd(false);
        setIsPaused(false);
        setCurrentLapsedTime(0);
        onStoryStart(currentStoryIndex); // callback exposed for new story start
        onCurrentIndexChange(currentStoryIndex);
    }, [currentStoryIndex]);

    //Auto Pause on page scroll
    useEffect(() => {
        if (Platform.OS === 'web') {
            if (typeof window != 'undefined') {
                var scollFunction = () => {
                    setIsPaused(window.scrollY >= height * 0.35);
                };
                window.addEventListener('scroll', scollFunction);
            }
            return () => {
                window.removeEventListener('scroll', scollFunction);
            };
        }
    }, []);

    //function handling for center tap
    function onCenterTap() {
        onCenterPress(); //callback for center tap
    }

    //function handling on Story end
    function onCurrentStoryEnd() {
        if (currentStoryIndex + 1 < baseData.length) {
            setAllStoriesEnd(false);
            setCurrentStoryIndex(currentStoryIndex + 1);
            // currentStoryIndexRef.current = currentStoryIndex + 1;
        }
        else if (currentStoryIndex + 1 == baseData.length) {
            setAllStoriesEnd(true);
        }
        onStoryEnd(); // callback for right press exposed
    }

    //function handling next Press or left slide
    function onPressOnRightSideOfStory() {
        if (currentStoryIndex + 1 < baseData.length) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            // currentStoryIndexRef.current = currentStoryIndex + 1;
        }
        onNextPress(); // callback for right press exposed
    }

    //function handling Previous Press or right slide
    function onPressOnLeftSideOfStory() {
        if (currentStoryIndex - 1 >= 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
            // currentStoryIndexRef.current = currentStoryIndex - 1;
        }
        onPrevPress(); // callback for left press exposed
    }

    //function handling long press start
    function onLongPressStart() {
        setIsPaused(true);
        onLongPress();
    }

    //function handling long press end
    function onLongPressEnd() {
        setIsPaused(false);
    }

    // function updateCurrentStoryIndex(index){
    //     setCurrentStoryIndex(index);
    //     currentStoryIndexRef.current = index;
    // }

    return {
        baseData,
        videoRef,
        allStoriesEnd,
        currentStoryIndex, 
        volumeState,
        isPaused, 
        setIsPaused,
        setVolumeState,
        setCurrentStoryIndex,
        onPressOnRightSideOfStory,
        onPressOnLeftSideOfStory,
        onCenterTap,
        onCurrentStoryEnd,
        onLongPressStart,
        onLongPressEnd,
    };
};

export default useNNStories;
