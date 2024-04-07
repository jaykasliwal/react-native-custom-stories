import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
    const {
        baseData,
        videoRef,
        height,
        currentStoryIndex,
        isPaused,
        isMuted,
        onPressOnRightSideOfStory,
        onCurrentStoryEnd,
        fullScreenMode,
        currentLapsedTime,
        id,
        storyWrapperStyle
    } = props;

    useEffect(() => {
        if (videoRef.current) {
            isPaused ? videoRef.current.pause() : videoRef.current.play();
        }
    }, [isPaused]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentLapsedTime;
        }
    }, [fullScreenMode]);

    return (
        <div id="STORY_VIDEO_WEB" style={{ width: '100%', display: 'flex', justifyContent: 'center', height: height, ...storyWrapperStyle }}>
            <video
                ref={videoRef}
                id={id}
                src={baseData[currentStoryIndex]?.storyUrl}
                autoPlay
                onEnded={onCurrentStoryEnd}
                controls={false}
                playsInline
                muted={isMuted}
                preload={'auto'}
                width={'100%'}
                webkit-playsinline="true"
                style={{objectFit: 'fill'}}
            />
            {currentStoryIndex + 1 < baseData.length ? (
                <video
                    src={baseData[currentStoryIndex + 1]?.storyUrl}
                    onLoadEnd={onPressOnRightSideOfStory}
                    muted
                    height={0}
                    width={0}
                    preload={'auto'}
                    playsinline
                    webkit-playsinline="true"
                />
            ) : null}
        </div>
    );
};

VideoPlayer.defaultProps = {
    baseData: [],
};

VideoPlayer.propTypes = {
    baseData: PropTypes.array,
};

export default VideoPlayer;
