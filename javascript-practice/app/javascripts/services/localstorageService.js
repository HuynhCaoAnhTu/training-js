class LocalStorageService {

  static getCategoryList() {
    return localStorage.getItem('categoriesData');
  }

  static saveListToStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

}
export default LocalStorageService;