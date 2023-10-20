import Bill from "./bill";
import CategoryList from "./categories";
import ProductList from "./products";

class Model {
  constructor() {
    this.categoryList = new CategoryList();
    this.productList = new ProductList();
		this.bill= new Bill()
  }
}
export default Model;
