// controller.js

class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  init = async () => {

    await this.initCategoryList();

  }

  initCategoryList = async () => {
    await this.model.categoryList.init();
    this.loadListCategoryList();
  }

  loadListCategoryList = () => {
    console.log(this.model.categoryList)
    console.log(this.model.categoryList.getCategoryList())
    const categories = this.model.categoryList.getCategoryList();
    this.view.categories.renderCategoryList(categories);
  }
}
export default AppController;