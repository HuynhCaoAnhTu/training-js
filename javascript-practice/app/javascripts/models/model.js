import CategoryList from "./categories";
import ItemList from "./items";

class Model {
  constructor() {
    this.categoryList = new CategoryList();
    this.itemList = new ItemList();
  }
}
export default Model;