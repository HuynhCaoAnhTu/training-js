
import ItemService from "../services/itemService";
import { ITEMS_STORAGE_KEY } from "../constants/key";
class ItemList {
  constructor() {
    this.service = new ItemService();
    this.itemList = [];
  }

  init = async () => {
    const data = await this.service.getLocalStorageData();
    this.itemList = data;
  }

  getItemList = () => {
    return this.itemList;
  }

	getItemById = (id) => {
    const data = JSON.parse(this.service.getLocalStorage(ITEMS_STORAGE_KEY));
		const item = data.find(item => item.itemId == id);
    return item;
  }
}
export default ItemList;
