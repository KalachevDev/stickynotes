/**
 * @type {LocalStorageAdapter}
 */
class LocalStorageAdapter {
    get _storage() {
        return window.localStorage;
    }

    getItem(key) {
        const stringified = this._storage.getItem(key);

        return this._serialize(stringified);
    }

    setItem(key, value) {
        const stringified = this._stringify(value);

        return this._storage.setItem(key, stringified);
    }

    _serialize(value) {
        return JSON.parse(value);
    }

    _stringify(value) {
        return JSON.stringify(value);
    }
}

export default new LocalStorageAdapter();