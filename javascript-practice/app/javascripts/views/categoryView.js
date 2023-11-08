class CategoryView {
	constructor() {
		this.CategoryListEl = document.getElementById('categories');
	}

	renderCategoryList = (categoryList) => {
		categoryList.forEach(Category => {
			this.renderCategory(Category);
		})
	}

	renderCategory = (Category) => {
		this.CategoryListEl.innerHTML += `
    <li class="category-item" category-id="${Category.categoryId}">
          <img class="category-img" src="${Category.categoryUrl}" alt="${Category.categoryName}">
          <p class="category-name">${Category.categoryName}</p>
        </li>`;
	}
}
export default CategoryView;
