class Ingredient {
	constructor(name, percentage) {
		this.name = name;
		this.percentage = percentage
	}
}

class Prodcut {
	constructor(id, name, des, categoryid, url, price, ingredient) {
		this.productId = id
		this.productName = name
		this.productDes = des
		this.categoryId = categoryid
		this.productUrl = url
		this.productPrice = price
		this.ingredient = ingredient

	}
}
export default Prodcut; Ingredient;
