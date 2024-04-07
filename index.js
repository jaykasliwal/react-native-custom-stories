/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import StoryContainer from './Components/StoryContainer.js';
import useNNStories from './Helpers/UseNNStories.js';
import ProgressBar from './Components/ProgressBar.js';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const NNStories = forwardRef((props, ref) => {
    const {
        height,
        width,
        Header,
        SidePanel,
        ProgressBar,
        SubHeader,
        Footer,
        currentLapsedTime,
        storyWrapperStyle,
        sideControlPannelWidth,
    } = props;

    const {
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
     } = useNNStories(props);

    useImperativeHandle(ref, () => ({
        //function exposed to play video from outside the skeleton, can be access via ref
        play() {
            if (!allStoriesEnd) {
                setIsPaused(false);
            }
        },
        //function exposed to pause video from outside the skeleton, can be access via ref
        pause() {
            setIsPaused(true);
        },
        //function exposed to get play or pause state of video from outside the skeleton, can be access via ref
        getVideoState() {
            return isPaused;
        },
        //function exposed to restart video from outside the skeleton, can be access via ref
        restart() {
            if (!allStoriesEnd) {
                videoRef.current.seek(1);
            }
        },
        //function exposed to get currentIndex from outside the skeleton, can be access via ref
        currentRunningIndex() {
            return currentStoryIndex;
        },
        //function exposed to update volume state from outside the skeleton, can be access via ref
        updateVolumeState(value) {
            setVolumeState(value);
        },
        //function exposed to get volume state from outside the skeleton, can be access via ref
        getVolumeState() {
            return volumeState;
        }
    }));

    return (
        <GestureHandlerRootView style={Platform.OS == 'web' ? { flex: 1, position: 'static' } : { flex: 1 }} >
            <Host>
                <View style={[styles.container, { height: height, width: width }, storyWrapperStyle]}>
                    <StoryContainer
                        baseData={baseData}
                        videoRef={videoRef}
                        height={height}
                        currentStoryIndex={currentStoryIndex}
                        isPaused={isPaused}
                        isMuted={volumeState}
                        onPressOnRightSideOfStory={onPressOnRightSideOfStory}
                        onPressOnLeftSideOfStory={onPressOnLeftSideOfStory}
                        onCenterTap={onCenterTap}
                        currentLapsedTime={currentLapsedTime}
                        onLongPressStart={onLongPressStart}
                        onLongPressEnd={onLongPressEnd}
                        storyWrapperStyle={storyWrapperStyle}
                        onCurrentStoryEnd={onCurrentStoryEnd}
                    />
                    <Header currentStoryIndex={currentStoryIndex} videoRef={videoRef} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <>
                            <ProgressBar
                                baseData={baseData}
                                width={width - sideControlPannelWidth}
                                videoRef={videoRef}
                                currentStoryIndex={currentStoryIndex}
                            />
                            <View style={{marginTop: 12, position:'absolute'}}>
                                <SubHeader />
                            </View>
                        </>
                        <SidePanel currentStoryIndex={currentStoryIndex} />
                    </View>
                    <View style={[styles.footerWrap, { bottom: 10 }]}>
                        <Footer currentIndex={currentStoryIndex} setCurrentStoryIndex={setCurrentStoryIndex} />
                    </View>
                </View>
            </Host>
        </GestureHandlerRootView>
    );
});

const styles = StyleSheet.create({
    container: {
      //defualt container styles
    },
    footerWrap: {
        position: 'absolute',
        zIndex: 1,
        width: '100%'
    }
});

NNStories.defaultProps = {
    height: Dimensions.get('window').height * 0.9,
    width: Dimensions.get('window').width,
    currentLapsedTime: 0,
    sideControlPannelWidth: 0,
    showProgressBarSuffixIcon: false,
    showShortlistOnTopFold: false,
    isMuted: true,
    initialvideoState: false, // false -> play || true -> pause
    SidePanel: () => { return <></> },
    Header: () => { return <></> },
    SubHeader: () => { return <></> },
    ProgressBar: ProgressBar,
    Footer: () => { return <></> },
    onNextPress: () => { },
    onPrevPress: () => { },
    onCenterPress: () => { },
    onStoryStart: () => { },
    onStoryEnd: () => { },
    onBuffer: () => { },
    onPause: () => { },
    onPlay: () => { },
};

NNStories.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    sideControlPannelWidth: PropTypes.number,
    currentLapsedTime: PropTypes.number,
    setCurrentLapsedTime: PropTypes.func,
    showProgressBarSuffixIcon: PropTypes.bool,
    isMuted: PropTypes.bool,
    SidePanel: PropTypes.func,
    Header: PropTypes.func,
    SubHeader: PropTypes.func,
    ProgressBar: PropTypes.func,
    Footer: PropTypes.func,
    onNextPress: PropTypes.func,
    onPrevPress: PropTypes.func,
    onCenterPress: PropTypes.func,
    onStoryStart: PropTypes.func,
    onStoryEnd: PropTypes.func,
    onBuffer: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
};

export default NNStories;
