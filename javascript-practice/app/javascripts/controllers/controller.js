// controller.js

class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.categories;
    this.allItems;
    this.currentItems;
    this.selectedCategoryId = 1
    this.selectedCategoryName = "All menu"
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
    this.categories = this.model.categoryList.getCategoryList();
    this.view.categories.renderCategoryList(this.categories);
  }

  // CONTROLLER ITEM
  initItemList = async () => {
    await this.model.itemList.init();
    this.loadListItemList();
  }

  loadListItemList = () => {
    this.allItems = this.model.itemList.getItemList();
    this.currentItems = this.allItems
    this.renderItemListbyCaterogy(this.currentItems);

  }

  getCategoryInforOnClick(event) {
    this.selectedCategoryId = event.currentTarget.getAttribute('category-id');
    const category = this.categories.find(category => category.categoryId == this.selectedCategoryId);
    if (category) {
      this.selectedCategoryName = category.categoryName;
    } else {
      console.log("Unknown Category");
    }
  }

  renderItemListbyCaterogy(itemList) {
    const categoryItems = document.querySelectorAll('.category-item');
    this.view.items.renderItemList(itemList, this.selectedCategoryName);
    categoryItems.forEach(item => {
      item.addEventListener('click', (event) => {

        categoryItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        item.classList.add('active');

        this.getCategoryInforOnClick(event)

        if (this.selectedCategoryId == 1) {
          this.view.items.renderItemList(this.allItems, this.selectedCategoryName);
          this.currentItems = this.allItems
        }
        else {
          this.currentItems = itemList.filter(item => item.categoryId == this.selectedCategoryId);
          this.view.items.renderItemList(this.currentItems, this.selectedCategoryName);
        }
      });
    });
  }
}
export default AppController;