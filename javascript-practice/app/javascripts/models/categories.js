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
    console.log(data)
    this.categoryList = data;
  }

  getCategoryList = () => {
    return this.categoryList;
  }
}
export default CategoryList;
