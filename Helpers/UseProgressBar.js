import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { calculateIndividualProgressBarWidth } from '../Utilities/Utility';

const useProgressBar = (props) => {
    const {
        baseData,
        width,
        videoRef,
        currentStoryIndex,
    } = props;
    const [progressBarSyncingWidth, setProgressBarSyncingWidth] = useState(0);
    const [animatedWidth] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: progressBarSyncingWidth,
            duration: 50, // Animation duration in milliseconds
            useNativeDriver: false
        }).start();
    }, [progressBarSyncingWidth]);

    const handleVideoProgress = (progress) => {
        setProgressBarSyncingWidth(
            (progress.nativeEvent.currentTime / progress.nativeEvent.seekableDuration) *
            calculateIndividualProgressBarWidth(baseData, width, true)
        );
    };

    useEffect(() => {
        if (Platform.OS === 'web') {
            const timeupdateFunction = () => {
                videoRef?.current?.duration != NaN && videoRef?.current?.duration > 0 && setProgressBarSyncingWidth(
                    (videoRef?.current?.currentTime / videoRef?.current?.duration) *
                    calculateIndividualProgressBarWidth(baseData, width, true)
                );
            };
            videoRef?.current?.addEventListener('timeupdate', timeupdateFunction);
            return () => {
                videoRef?.current?.removeEventListener('timeupdate', timeupdateFunction);
            };
        } else {
            videoRef.current._onProgress = handleVideoProgress
        }
    }, []);

    useEffect(() => {
        setProgressBarSyncingWidth(0);
    }, [currentStoryIndex]);


    return {
        animatedWidth
    };
};

export default useProgressBar;
