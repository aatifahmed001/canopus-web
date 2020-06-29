
const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
}

const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

const clearLocalStorage = () => {
    localStorage.clear();
}

export const LocalStorage = {
    saveInLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    clearLocalStorage
};