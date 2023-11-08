import LocalStorageService from "./localstorageService";
import { API_BASE_URL } from "../constants/api";

class BaseService {
	constructor(storage_key, resource) {
		this.storage_key = storage_key;
		this.resource = resource;
	}

	getLocalStorage() {
		return LocalStorageService.get(this.storage_key);
	}

	setLocalStorage(data) {
		return LocalStorageService.set(this.storage_key, data);
	}

	async getLocalStorageData() {
		try {
			let data = [];
			const storedData = this.getLocalStorage();
			if (storedData) {
				data = JSON.parse(storedData);
			} else {
				const response = await fetch(`${API_BASE_URL}${this.resource}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				data = await response.json();
				this.setLocalStorage(data);
			}
			return data;
		} catch (error) {
			throw new Error("Failed");
		}
	}
}
export default BaseService;
