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

  addToBill(data, noteSugar, noteIce) {
		this.itemsInBill.push({
			id: +data.itemId,
			quantity: 1,
			name: data.itemName,
			imageUrl: data.itemUrl,
			totalPrice: +data.itemPrice,
			total: +data.itemPrice,
			sugarNote: noteSugar,
			iceNote: noteIce,
		});
		return this.itemsInBill;
	}
}
export default Bill;
