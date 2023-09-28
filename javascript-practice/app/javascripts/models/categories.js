// model.js
import Category from "./category";
import CategoryService from "../services/categoryService";
class CategoryList {
  constructor() {
    this.service = new CategoryService();
    this.categoryList = [];
  }

  init = async () => {

    const data = await this.service.getCategories();
    this.categoryList = this.parseData(data);

  }

  parseData = (data) => {
    return data.map((item) => new Category(item));
  }

  getCategoryList = () => {
    return this.categoryList;
  }
}
export default CategoryList;
