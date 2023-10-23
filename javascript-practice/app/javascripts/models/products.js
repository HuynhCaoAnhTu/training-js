
import ProductService from "../services/productService";
import { PRODUCTS_STORAGE_KEY } from "../constants/key";
class ProductList {
  constructor() {
    this.service = new ProductService();
    this.productList = [];
  }

  init = async () => {
    const data = await this.service.getLocalStorageData();
    this.productList = data;
  }

  getProdcutList = () => {
    return this.productList;
  }

	getProdcutById = (id) => {
    const data = JSON.parse(this.service.getLocalStorage(PRODUCTS_STORAGE_KEY));
		const product = data.find(product => product.productId == id);
    return product;
  }
}
export default ProductList;
