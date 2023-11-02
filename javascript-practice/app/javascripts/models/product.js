export class Ingredient {
	constructor(name, percentage) {
		this.name = name;
		this.percentage = percentage
	}
}

export default class Product {
	constructor(id, name, des, categoryid, url, price, ingredient,isSugar,isIce) {
		this.productId = id
		this.productName = name
		this.productDes = des
		this.categoryId = categoryid
		this.productUrl = url
		this.productPrice = price
		this.ingredient = ingredient
		this.isSugar =isSugar;
		this.isIce = isIce;
	}
}
