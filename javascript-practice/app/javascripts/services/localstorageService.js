class LocalStorageService {
  static get (key) {
    return localStorage.getItem(key);
  }

  static set (key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
}
export default LocalStorageService;
