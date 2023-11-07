import BillService from "../services/billService";
class Bill {
	constructor() {
		this.service = new BillService();
		this.productsInBill = [];
		this.totalValue;
	}

	init = async () => {
		const data = await this.service.getLocalStorageData();
		this.productsInBill = data;
	}

	getProductInBill() {
		return this.productsInBill;
	}

	clearBill() {
		return this.productsInBill.splice(0, this.productsInBill.length);
	}

	addToBill(id, name, imageUrl, description, price, ingredients) {
		let productAdded = false;
		for (let i = 0; i < this.productsInBill.length; i++) {
			const existingProduct = this.productsInBill[i];
			if (existingProduct.id === id && JSON.stringify(existingProduct.ingredients) === JSON.stringify(ingredients)) {
				existingProduct.quantity += 1;
				existingProduct.total = existingProduct.quantity * existingProduct.price;
				productAdded = true;
				break;
			}
		}
		if (!productAdded) {
			this.productsInBill.push({
				id: id,
				quantity: 1,
				name: name,
				imageUrl: imageUrl,
				description: description,
				price: price,
				total: price,
				ingredients: ingredients,
			});
		}
		return this.productsInBill;
	}

	increaseQuantity(productId, ingredients) {
		var existingProduct = [];
		for (let i = 0; i < this.productsInBill.length; i++) {
			existingProduct = this.productsInBill[i];
			if (existingProduct.id === productId && JSON.stringify(existingProduct.ingredients) === JSON.stringify(ingredients)) {
				existingProduct.quantity += 1;
				existingProduct.total = existingProduct.quantity * existingProduct.price;
				break;
			}
		}
		return this.productsInBill;
	}

	decreaseQuantity(productId, ingredients) {
		var existingProduct = [];
		for (let i = 0; i < this.productsInBill.length; i++) {
			existingProduct = this.productsInBill[i];
			if (existingProduct.id === productId && JSON.stringify(existingProduct.ingredients) === JSON.stringify(ingredients)) {
				existingProduct.quantity -= 1;
				existingProduct.total = existingProduct.quantity * existingProduct.price;
				if (existingProduct.quantity === 0) {
					this.productsInBill.splice(i, 1);
				}
				break;
			}
		}
		return this.productsInBill;
	}

	calculateTotalValue() {
		this.totalValue = this.productsInBill.reduce((total, product) => total + product.total, 0);
		return this.totalValue;
	}

}
export default Bill;
