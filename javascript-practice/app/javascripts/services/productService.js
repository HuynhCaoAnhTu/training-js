import { PRODUCTS_ENDPOINT } from "../constants/api";
import { PRODUCTS_STORAGE_KEY } from "../constants/storageKey";
import BaseService from "./baseService";
class ProductService extends BaseService {
	constructor(){
		super(PRODUCTS_STORAGE_KEY,PRODUCTS_ENDPOINT)
	}
}
export default ProductService;
