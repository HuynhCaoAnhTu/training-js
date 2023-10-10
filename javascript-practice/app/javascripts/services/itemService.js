import { ITEMS_ENDPOINT } from "../constants/api";
import { ITEMS_STORAGE_KEY } from "../constants/key";
import BaseService from "./baseService";
class ItemService extends BaseService {
	constructor(){
		super(ITEMS_STORAGE_KEY,ITEMS_ENDPOINT)
	}
}
export default ItemService;
