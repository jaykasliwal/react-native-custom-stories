import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
    const {
        baseData,
        videoRef,
        height,
        currentStoryIndex,
        isPaused,
        isMuted,
        onCurrentStoryEnd,
        storyWrapperStyle
    } = props;
    const [videoUrl, setVideoUrl] = useState("");
    
    useEffect(() => {
        if (Platform.OS === 'android') {
            import('../../Utilities/VideoCaching').then((res) => {
                res?.resolvePathForCachedItem(baseData[currentStoryIndex]?.storyUrl).then((url) => {
                    setVideoUrl(url);
                }).catch(() => {
                    setVideoUrl(baseData[currentStoryIndex]?.storyUrl);
                });
            });
        } else {
            setVideoUrl(baseData[currentStoryIndex]?.storyUrl);
        }
    }, [currentStoryIndex]);

        return (
        <View style={[styles.container, { height: height }, storyWrapperStyle]}>
            <Video
                ref={videoRef}
                style={[storyWrapperStyle, styles.inlineStyle]}
                playWhenInactive={false}
                source={{ uri: videoUrl }}
                resizeMode='contain'
                autoPlay
                onEnd={onCurrentStoryEnd}
                ignoreSilentSwitch={'ignore'}
                muted={isMuted}
                paused={isPaused}
                preload={'auto'}
                width={'100%'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    inlineStyle: {
        flex: 1,
    }
});


VideoPlayer.defaultProps = {
    data: {},
};

VideoPlayer.propTypes = {
    data: PropTypes.object,
    baseData: PropTypes.object
};

export default VideoPlayer;