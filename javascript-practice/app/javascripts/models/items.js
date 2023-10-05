
import ItemService from "../services/itemService";
class ItemList {
  constructor() {
    this.service = new ItemService();
    this.itemList = [];
  }

  init = async () => {
    const data = await this.service.getItems();
    this.itemList = data;
  }

  getItemList = () => {
    return this.itemList;
  }
}
export default ItemList;
