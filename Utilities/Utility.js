import {
    PROGRESS_BAR_INDIVIDUAL_PADDING,
    PROGRESS_BAR_WRAPPER_LEFT_RIGHT_PADDING,
    WINDOW_WIDTH,
} from '../Helpers/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  if (checkIfKeyIsValid(key)) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e, "error");
    }
  }
};

export const getData = async (key) => {

  if (checkIfKeyIsValid(key)) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e, "error");
    }
  }
};

export function calculateIndividualProgressBarWidth(baseData, width = WINDOW_WIDTH, currentStory = false) {
    if (currentStory) {
        return (
            (width -
                PROGRESS_BAR_WRAPPER_LEFT_RIGHT_PADDING -
                ((baseData.length - 1) * PROGRESS_BAR_INDIVIDUAL_PADDING)) * (baseData.length < 4 ? 0.6 : 0.4)
        );
    }
    return (
        (((width -
            PROGRESS_BAR_WRAPPER_LEFT_RIGHT_PADDING -
            ((baseData.length - 1) * PROGRESS_BAR_INDIVIDUAL_PADDING)) * (baseData.length < 4 ? 0.4 : 0.6)) / (baseData.length - 1)
        )
    );
};
