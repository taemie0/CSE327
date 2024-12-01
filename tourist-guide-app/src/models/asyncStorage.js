import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores a value in AsyncStorage under a given key.
 *
 * @async
 * @function
 * @param {string} key - The key under which the value will be stored.
 * @param {string} value - The value to be stored.
 * @returns {Promise<void>} A promise that resolves when the data has been stored.
 * @throws {Error} Logs an error message to the console if the storage operation fails.
 */
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error storing value:', error);
    }
};

/**
 * Retrieves a value from AsyncStorage based on the given key.
 *
 * @async
 * @function
 * @param {string} key - The key used to retrieve the stored value.
 * @returns {Promise<string | null>} A promise that resolves to the retrieved value, or `null` if the key does not exist.
 * @throws {Error} Logs an error message to the console if the retrieval operation fails.
 */
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.error('Error retrieving value:', error);
    }
};
