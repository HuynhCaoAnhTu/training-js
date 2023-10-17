import Bill from "./bill";
import CategoryList from "./categories";
import ItemList from "./items";

class Model {
  constructor() {
    this.categoryList = new CategoryList();
    this.itemList = new ItemList();
		this.bill= new Bill()
  }
}
export default Model;
