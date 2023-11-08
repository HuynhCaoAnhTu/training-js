import ProductService from '../services/productService';
import Product from './product';

class ProductList {
  constructor () {
    this.service = new ProductService();
    this.productList = [];
  }

  init = async () => {
    const data = await this.service.getLocalStorageData();
    this.productList = this.parseData(data);
  }

  parseData = (data) => {
    return data.map((item) => {
      return new Product(item.productId, item.productName, item.productDes, item.categoryId, item.productUrl, item.productPrice, item.ingerdients, item.isSugar, item.isIce);
    });
  }

  getProdcutList = () => {
    return this.productList;
  }

  getProdcutById = (id) => {
    const product = this.productList.find(product => product.productId == id);
    return product;
  }

  generateId (length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }

  addProduct (product) {
    this.productList.unshift(product)
    this.service.setLocalStorage(this.productList);
    return this.productList;
  }

  updateProduct (id, name, desc, category, url, price, isSugar, isIce) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].productId == id) {
        this.productList[i].productName = name;
        this.productList[i].productDes = desc;
        this.productList[i].categoryId = +category;
        this.productList[i].productUrl = url;
        this.productList[i].productPrice = price;
        this.productList[i].isSugar = isSugar;
        this.productList[i].isIce = isIce;
        break;
      }
    }
    this.service.setLocalStorage(this.productList);
    return this.productList;
  }

  deleteProduct (id) {
    this.productList = this.productList.filter((product) => product.productId != id);
    this.service.setLocalStorage(this.productList);
    return this.productList;
  }
}
export default ProductList;
