import { HISTORYPAYMENT_STORAGE_KEY } from "../constants/storageKey";
import LocalStorageService from "./localstorageService";
import BaseService from "./baseService";

class HistoryPaymentService extends BaseService {
	constructor() {
		super(HISTORYPAYMENT_STORAGE_KEY);
	}

	getLocalStorage() {
		let data = []
		const storedData = LocalStorageService.get(HISTORYPAYMENT_STORAGE_KEY);
		if (storedData) {
			data = JSON.parse(storedData).reverse();
		}
		return data;
	}

}
export default HistoryPaymentService;
