import { useState } from 'react';
import { PanResponder } from 'react-native';

const useStoryContainer = (props) => {
    const [swipeDirection, setSwipeDirection] = useState(null);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => {
            if (gestureState.dx > 50) {
                setSwipeDirection('right');
                return true;
            } else if (gestureState.dx < -50) {
                setSwipeDirection('left');
                return true;
            }
            return false;
        },
        onMoveShouldSetPanResponder: (event, gestureState) => {
            if (gestureState.dx > 50) {
                setSwipeDirection('right');
                return true;
            } else if (gestureState.dx < -50) {
                setSwipeDirection('left');
                return true;
            }
            return false;
        },
        onPanResponderMove: () => false,
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (evt, gestureState) => {
            if (Math.abs(gestureState.dx) > 50) {
                if (swipeDirection === 'right') {
                    props.onPressOnLeftSideOfStory();
                    console.log('Swiped right');
                } else if (swipeDirection === 'left') {
                    props.onPressOnRightSideOfStory();
                    console.log('Swiped left');
                }
            }
            setSwipeDirection(null);
        },
        onPanResponderTerminationRequest: () => false,
    });

    return {
        panResponder
    };
};

export default useStoryContainer;
