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
    this.searchHandle();

  }

  searchHandle() {
    var searchInput = document.querySelector('.header-search');
    searchInput.addEventListener('input', e => {
      const value = e.target.value;
      const lowercaseValue = value.toLowerCase(); 
      // Set all item hidden 
      var allItems = document.querySelectorAll(`.item`)
      allItems.forEach(hiddenItem => {
        hiddenItem.classList.add('hidden');
      });
      // Check 
      this.currentItems.forEach(item => {
        var itemNamelowercase= item.itemName.toLowerCase()
        if (itemNamelowercase.includes(lowercaseValue)) {
          var visibleItems = document.querySelector(`[item-id="${item.itemId}"]`)
          visibleItems.classList.remove('hidden');
        }
      })
      if (value == null) {
        allItems.classList.remove('hidden');
      }
      var hiddenItems = document.querySelectorAll(`.hidden`)
      this.view.items.ItemTotal.innerHTML = `${allItems.length - hiddenItems.length} result`;
    })
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