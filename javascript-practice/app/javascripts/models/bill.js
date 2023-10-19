import BillService from "../services/billService";
class Bill {
	constructor() {
		this.service = new BillService();
		this.itemsInBill = [];
	}

	init = async () => {
		const data = await this.service.getLocalStorageData();
		console.log(data)
		this.itemsInBill = data;
	}

	getItemInBill() {
		return this.itemsInBill;
	}

	addToBill(data, noteSugar, noteIce) {
		const itemId = +data.itemId;
		const existingItem = this.itemsInBill.find(item => item.id === itemId);
		console.log(existingItem)
		if (existingItem) {
			if (noteSugar == "0" && noteIce == "0") {
				existingItem.quantity += 1;
			} else {
				this.itemsInBill.push({
					id: itemId,
					quantity: 1,
					name: data.itemName,
					imageUrl: data.itemUrl,
					totalPrice: +data.itemPrice,
					total: +data.itemPrice,
					sugarNote: noteSugar,
					iceNote: noteIce,
				});
			}
		} else {
			this.itemsInBill.push({
				id: itemId,
				quantity: 1,
				name: data.itemName,
				imageUrl: data.itemUrl,
				totalPrice: +data.itemPrice,
				total: +data.itemPrice,
				sugarNote: noteSugar,
				iceNote: noteIce,
			});
		}

		return this.itemsInBill;
	}

}
export default Bill;
