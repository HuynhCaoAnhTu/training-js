// view.js
class CategoryView {

  constructor() {
    this.CategoryListEl = document.getElementById('categories');
  }
  renderCategoryList = (categoryList) => {
    // this.CategoryListEl.innerHTML = "";
    categoryList.forEach(Category => {
      this.renderCategory(Category);
    })
  }

  renderCategory = (Category) => {
    if(Category.categoryId==1){
      this.CategoryListEl.innerHTML += `  
      <li class="category-item active" category-id="${Category.categoryId}">
            <img class="category-img" src="${Category.categoryUrl}" alt="${Category.categoryName}">
            <p class="category-name">${Category.categoryName}</p>
          </li>`;
    }
    else
    this.CategoryListEl.innerHTML += `  
    <li class="category-item" category-id="${Category.categoryId}">
          <img class="category-img" src="${Category.categoryUrl}" alt="${Category.categoryName}">
          <p class="category-name">${Category.categoryName}</p>
        </li>`;
  }
}
export default CategoryView;