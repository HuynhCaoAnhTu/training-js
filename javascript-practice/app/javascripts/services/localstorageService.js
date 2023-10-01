class LocalStorageService {

  static getCategoryList() {
    return localStorage.getItem('categoriesData');
  }

  static saveListToStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  static getItemList() {
    return localStorage.getItem('itemsData');
  }

}
export default LocalStorageService;