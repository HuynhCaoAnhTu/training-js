
import ProductService from "../services/productService";
import { PRODUCTS_STORAGE_KEY } from "../constants/key";
class ProductList {
  constructor() {
    this.service = new ProductService();
    this.itemList = [];
  }

  init = async () => {
    const data = await this.service.getLocalStorageData();
    this.itemList = data;
  }

  getProdcutList = () => {
    return this.itemList;
  }

	getProdcutById = (id) => {
    const data = JSON.parse(this.service.getLocalStorage(PRODUCTS_STORAGE_KEY));
		const item = data.find(item => item.itemId == id);
    return item;
  }
}
export default ProductList;
