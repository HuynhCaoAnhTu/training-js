import { CATEGORIES_ENDPOINT } from "../constants/api";
import { CATEGORIES_STORAGE_KEY } from "../constants/storageKey";
import BaseService from "./baseService";

class CategoryService extends BaseService {
	constructor() {
		super(CATEGORIES_STORAGE_KEY, CATEGORIES_ENDPOINT);
	}
}
export default CategoryService;
