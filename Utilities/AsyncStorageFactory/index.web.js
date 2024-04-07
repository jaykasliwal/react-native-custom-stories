import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    if (checkIfKeyIsValid(key)) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e, 'error');
        }
    }
};

const getData = async (key) => {
    if (checkIfKeyIsValid(key)) {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue !== null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e, 'error');
        }
    }
};

const mergeData = async (key, value) => {
    // will **override existing data and merge it
    if (checkIfKeyIsValid(key)) {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e, 'error');
        }
    }
};

const removeValue = async (key) => {
    if (checkIfKeyIsValid(key)) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.log(e, 'error');
        }
    }
};

const getAllKeys = async () => {
    let keys = [];
    try {
        keys = await AsyncStorage.getAllKeys();
        return keys;
    } catch (e) {
        console.log(e, 'error');
    }
};

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e, 'error');
    }
};

const getMultipleData = async (keysArray = []) => {
    let values;
    try {
        values = await AsyncStorage.multiGet(keysArray);
        return values;
        // will return [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]--->
        // value will be in stringified format
    } catch (e) {
        console.log(e, 'error');
    }
};

const setMultipleData = async (keysArray, valuesArray) => {
    if (keysArray.length !== valuesArray.length) {
        console.log('data concern', 'error');
        return;
    }
    const dataArray = [];
    for (let i = 0; i < keysArray.length; i++) {
        dataArray.push([keysArray[i], JSON.stringify(valuesArray[i])]);
    }
    try {
        await AsyncStorage.multiSet(dataArray);
    } catch (e) {
        console.log(e, 'error');
    }
};

const checkIfKeyIsValid = (key) => {
    if (!key || typeof key !== 'string') {
        console.log('key is invalid', 'error');
        return false;
    }
    return true;
};

export {
    storeData,
    getData,
    mergeData,
    removeValue,
    getAllKeys,
    clearAll,
    getMultipleData,
    setMultipleData,
};
