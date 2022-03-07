export class SessionStorageService {
    getData(key) {
      const data = sessionStorage.getItem(`sc-${key}`);
      return data ? JSON.parse(data) : '';
    }
    // eslint-disable-next-line no-dupe-class-members
    getData(key, data) {
      sessionStorage.setItem(`sc-${key}`, JSON.stringify(data));
    }
    removeData(key) {
      sessionStorage.removeItem(`sc-${key}`);
    }
    clearAll() {
      sessionStorage.clear();
    }
  }