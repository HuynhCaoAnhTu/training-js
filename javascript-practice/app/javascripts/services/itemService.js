import LocalStorageService from "./localstorageService";
import { API_BASE_URL } from "../constants/api";
import { ITEMS_ENDPOINT } from "../constants/api";
class ItemService {

	async getItems() {
		try {
			let itemsData = [];
			const storedData = LocalStorageService.getItemList();
			if (storedData) {
				itemsData = JSON.parse(storedData);
			} else {
				const response = await fetch(`${API_BASE_URL}${ITEMS_ENDPOINT}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				itemsData = await response.json();
				LocalStorageService.saveListToStorage('itemsData', itemsData);
			}
			return itemsData;
		} catch (error) {
			throw error;
		}
	}

}

export default ItemService;
