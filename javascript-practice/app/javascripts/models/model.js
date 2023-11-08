import Bill from './bill';
import CategoryList from './categories';
import ProductList from './products';
import Ingredient from './product'

class Model {
  constructor () {
    this.categoryList = new CategoryList();
    this.productList = new ProductList();
    this.bill = new Bill();
    this.ingerdient = new Ingredient();
  }
}
export default Model;
