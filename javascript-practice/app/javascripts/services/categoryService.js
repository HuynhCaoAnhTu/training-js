import LocalStorageService from "./localstorageService";
import { API_BASE_URL, CATEGORIES_ENDPOINT } from "../constants/api";
class CategoryService {

	getLocalStorage() {
		return LocalStorageService.get("categoriesData");
	}

	setLocalStorage(data) {
		return LocalStorageService.set("categoriesData", data);
	}

	async getCategories() {
		try {
			let categoriesData = [];
			const storedData = this.getLocalStorage();
			if (storedData) {
				categoriesData = JSON.parse(storedData);
			} else {
				const response = await fetch(`${API_BASE_URL}${CATEGORIES_ENDPOINT}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				categoriesData = await response.json();
				this.setLocalStorage(categoriesData);
			}
			return categoriesData;
		} catch (error) {
			throw new Error("Failed to get items");
		}
	}
}
export default CategoryService;
