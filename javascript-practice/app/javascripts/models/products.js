
import ProductService from "../services/productService";
import Product from "./product";
import { PRODUCTS_STORAGE_KEY } from "../constants/key";
class ProductList {
	constructor() {
		this.service = new ProductService();
		this.productList = [];
	}

	init = async () => {
		const data = await this.service.getLocalStorageData();
		this.productList = this.parseData(data).reverse();
	}

	parseData = (data) => {
		return data.map((item) => {
			return new Product(item.productId, item.productName, item.productDes, item.categoryId, item.productUrl, item.productPrice,item.ingerdients,item.isSugar,item.isIce);
		});
	}

	getProdcutList = () => {
		return this.productList;
	}

	getProdcutById = (id) => {
		const data = JSON.parse(this.service.getLocalStorage(PRODUCTS_STORAGE_KEY));
		const product = data.find(product => product.productId == id);
		return product;
	}

	generateId(length = 10) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let id = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			id += characters.charAt(randomIndex);
		}
		return id;
	}

	addProduct(product){
		this.productList.push(product)
		this.service.setLocalStorage(this.productList);
	}

}
export default ProductList;
