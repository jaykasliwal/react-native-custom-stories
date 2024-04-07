import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import VideoPlayer from './VideoPlayer';
import LinearGradient from 'react-native-linear-gradient';
import useStoryContainer from '../Helpers/UseStoryContainer';

const StoryContainer = (props) => {
    const {
        baseData,
        videoRef,
        height,
        currentStoryIndex,
        onCurrentStoryEnd,
        isPaused,
        isMuted,
        onPressOnRightSideOfStory,
        onPressOnLeftSideOfStory,
        onCenterTap,
        onLongPressStart,
        onLongPressEnd,
        storyWrapperStyle,
    } = props;

    const { panResponder } = useStoryContainer(props);

    return (
        <View style={[styles.container, storyWrapperStyle]} {...panResponder.panHandlers}>
            <LinearGradient
                colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0)']}
                style={styles.linearGradientHeader}
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.7)', 'rgba(255, 255, 255, 0)']}
                style={styles.linearGradientFooter}
            />
            <View style={styles.touchableAreaWrapper}>
                <TouchableOpacity
                    style={styles.leftTouchableArea}
                    activeOpacity={1}
                    onPress={() => {
                        onPressOnLeftSideOfStory();
                    }}
                    onLongPress={() => {
                        onLongPressStart();
                    }}
                    onPressOut={() => {
                        onLongPressEnd();
                    }}
                />
                <TouchableOpacity
                    ComponentType={TouchableOpacity}
                    activeOpacity={1}
                    style={styles.middelTouchableArea}
                    onPress={() => {
                        onCenterTap()
                    }}
                    onLongPress={() => {
                        onLongPressStart();
                    }}
                    onPressOut={() => {
                        onLongPressEnd();
                    }}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.rightTouchableArea}
                    onPress={() => {
                        onPressOnRightSideOfStory();
                    }}
                    onLongPress={() => {
                        onLongPressStart();
                    }}
                    onPressOut={() => {
                        onLongPressEnd();
                    }}
                />
            </View>
            <VideoPlayer
                baseData={baseData}
                videoRef={videoRef}
                height={height}
                currentStoryIndex={currentStoryIndex}
                isPaused={isPaused}
                isMuted={isMuted}
                onCurrentStoryEnd={onCurrentStoryEnd}
                storyWrapperStyle={storyWrapperStyle}
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
    touchableAreaWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
        zIndex: 1,
    },
    leftTouchableArea: {
        height: '100%',
        width: '35%',
    },
    middelTouchableArea: {
        height: '100%',
        width: '30%',
    },
    rightTouchableArea: {
        height: '100%',
        width: '35%',
    },
    fullscreenIconWrapper: {
        width: 36,
        height: 36,
        position: 'absolute',
        right: 12,
        marginTop: 62,
        zIndex: 10,
    },
    speakerWrapper: {
        width: 36,
        height: 36,
        position: 'absolute',
        right: 12,
        marginTop: 106,
        zIndex: 10,
    },
    shortlistWrapper: {
        width: 36,
        height: 36,
        position: 'absolute',
        right: 12,
        marginTop: 150,
        zIndex: 10,
    },
    speaker: {
        width: 36,
        height: 36,
    },
    linearGradientHeader: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: '20%',
        zIndex: 1,
    },
    linearGradientFooter: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: '35%',
        zIndex: 1,
        transform: [{ rotate: '180deg' }]
    },
});

export default StoryContainer;
