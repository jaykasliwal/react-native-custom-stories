import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { calculateIndividualProgressBarWidth } from '../Utilities/Utility';
import useProgressBar from '../Helpers/UseProgressBar';

const ProgressBar = (props) => {
    const {
        baseData,
        width,
        currentStoryIndex,
    } = props;

    const { animatedWidth } = useProgressBar(props);

    return (
        <View style={[styles.container, { marginTop: 14 }]}>
            <View style={[styles.progressWrapper]}>
                {baseData?.map((item, index) => {
                    return (
                        <View key={index}
                            style={[
                                styles.progressBarCover,
                                {
                                    width: calculateIndividualProgressBarWidth(
                                        baseData,
                                        width,
                                        index == currentStoryIndex
                                    ),
                                },
                            ]}
                        >
                            <Animated.View
                                style={[
                                    styles.filledProgressBar, currentStoryIndex === index && styles.transitionEffect,
                                    {
                                        width:
                                            index > currentStoryIndex
                                                ? 0
                                                : index < currentStoryIndex
                                                    ? calculateIndividualProgressBarWidth(
                                                        baseData,
                                                        width,
                                                        index == currentStoryIndex
                                                    )
                                                    : index == currentStoryIndex
                                                        ? animatedWidth
                                                        : 'auto',
                                    },
                                ]}
                            />
                        </View>
                    );
                }
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 12,
        marginRight: 16,
        marginTop: 14,
    },
    heading: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "600",
        color: 'white',
        flex: 1,
        alignSelf: 'center',
    },
    progressWrapper: {
        flexDirection: 'row',
    },
    progressHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressBarCover: {
        height: 4,
        borderRadius: 62,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginRight: 9,
        transition: 'width 0.5s ease',
    },
    transitionEffect: {
        transition: 'width 0.5s ease',
    },
    filledProgressBar: {
        height: 4,
        borderRadius: 62,
        backgroundColor: 'white',
        transition: 'width 0.5s ease',
    },
    iconsWrapper: {
        flexDirection: 'row',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    shortlistImage: {
        width: 20,
        height: 20,
        marginRight: 10,
        transition: 'all 0.1s ease-in-out',
    },
});

export default ProgressBar;
