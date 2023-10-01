// controller.js

class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  init = async () => {

    await this.initCategoryList();
    await this.initItemList();

  }

  // CONTROLLER CATEGORY
  initCategoryList = async () => {
    await this.model.categoryList.init();
    this.loadListCategoryList();
  }

  loadListCategoryList = () => {
    const categories = this.model.categoryList.getCategoryList();
    this.view.categories.renderCategoryList(categories);
  }

  // CONTROLLER ITEM
  initItemList = async () => {
    await this.model.itemList.init();
    this.loadListItemList();
  }

  loadListItemList = () => {
    const items = this.model.itemList.getItemList();
    this.view.items.renderItemList(items);
  }

}
export default AppController;