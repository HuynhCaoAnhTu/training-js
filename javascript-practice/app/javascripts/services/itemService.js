import LocalStorageService from "./localstorageService";
import { API_BASE_URL, ITEMS_ENDPOINT } from "../constants/api";
class ItemService {

	getLocalStorage() {
		return LocalStorageService.get('itemsData');
	}

	setLocalStorage(data) {
		return LocalStorageService.set('itemsData', data);
	}

	async getItems() {
		try {
			let itemsData = [];
			const storedData = this.getLocalStorage();
			if (storedData) {
				itemsData = JSON.parse(storedData);
			} else {
				const response = await fetch(`${API_BASE_URL}${ITEMS_ENDPOINT}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				itemsData = await response.json();
				this.setLocalStorage(itemsData);
			}
			return itemsData;
		} catch (error) {
			throw error;
		}
	}
}
export default ItemService;
