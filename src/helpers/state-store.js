const isLocalStorage = window && window.localStorage && window.localStorage.setItem;
const codePrefix = '__StateStoreCode__';

let storage;
if (isLocalStorage) {
    storage = window.localStorage;
}

export default class StateStore {
    static getItem(key) {
        let value = isLocalStorage ? storage.getItem(key) : StateStore._store[key];
        // localStorage returns null if key isn't found, while _store object will return undefined
        // Coerce undefined values to null for consistency
        if (value === undefined) {
            value = null;
        }
        value = JSON.parse(value);
        if (typeof value === 'string' && value.indexOf(codePrefix) === 0) {
            if (value === (codePrefix + 'NaN')) {
                value = NaN;
            } else if (value === (codePrefix + 'Infinity')) {
                value = Infinity;
            }
        }
        return value;
    }

    static setItem(key, value) {
        if (value === undefined) {
            return;
        }
        // Special handling for NaN and Infi
        if (typeof value === 'number' && isNaN(value)) {
            value = codePrefix + 'NaN';
        }
        if (value === Infinity) {
            value = codePrefix + 'Infinity';
        }
        StateStore._store[key] = JSON.stringify(value);
        if (isLocalStorage) {
            storage.setItem(key, StateStore._store[key]);
        }
    }

    static removeItem(key) {
        delete StateStore._store[key];
        if (isLocalStorage) {
            storage.removeItem(key);
        }
    }

    static clear() {
        StateStore._store = {};
        if (isLocalStorage) {
            storage.clear();
        }
    }
}

StateStore._store = {};
