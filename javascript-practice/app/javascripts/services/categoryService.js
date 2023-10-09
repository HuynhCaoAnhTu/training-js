import LocalStorageService from "./localstorageService";
import { API_BASE_URL, CATEGORIES_ENDPOINT } from "../constants/api";
import { CATEGORIES_ENDPOINT } from "../constants/api";
class CategoryService {

	async getCategories() {
		try {
			let categoriesData = [];
			const storedData = LocalStorageService.getCategoryList();
			if (storedData) {
				categoriesData = JSON.parse(storedData);
			} else {
				const response = await fetch(`${API_BASE_URL}${CATEGORIES_ENDPOINT}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				categoriesData = await response.json();
				LocalStorageService.saveListToStorage('categoriesData', categoriesData);
			}
			return categoriesData;
		} catch (error) {
			throw error;
		}
	}

}

export default CategoryService;
