// controller.js

class AppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.categories;
    this.items;
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
    this.items = this.model.itemList.getItemList();
    this.renderItemListbyCaterogy(this.items);

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
    const categoryDefaut = document.querySelector('.category-item');
    categoryDefaut.classList.add('active');
    this.view.items.renderItemList(itemList, this.selectedCategoryName);
    categoryItems.forEach(item => {
      item.addEventListener('click', (event) => {

        categoryItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        item.classList.add('active');

        this.getCategoryInforOnClick(event)
        this.items  = itemList.filter(item => item.categoryId == this.selectedCategoryId);
        console.log(this.items)
        this.view.items.renderItemList(this.items, this.selectedCategoryName);
      });
    });
    
  }
}
export default AppController;