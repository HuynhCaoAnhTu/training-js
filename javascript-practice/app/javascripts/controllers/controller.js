// controller.js

class AppController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.categories = [];
		this.allItems = [];
		this.currentItems = [];
		this.selectedCategoryId = 1
		this.selectedCategoryName = "All menu"
	}
	init = async () => {
		await this.initCategoryList();
		await this.initItemList();
		this.searchHandle();
	}

	searchHandle() {
		const searchInput = document.querySelector('.header-search');
		const loading = document.querySelector('.loader');
		const menu = document.querySelector('.menu');
		searchInput.addEventListener('keypress', e => {
			if (e.keyCode == "13") {
				let count = 0;
				const allItems = document.querySelectorAll(`.item `)
				const value = e.target.value;
				const lowercaseValue = value.toLowerCase();
				menu.style.opacity = 0.2;
				loading.style.display = 'block';
				allItems.forEach(item => {
					const itemNameElement = item.querySelector('.item-name');
					var itemName = itemNameElement.textContent.toLowerCase();
					if (!itemName.includes(lowercaseValue)) {
						item.style.display = 'none';
					} else {
						item.style.display = 'flex';
						count += 1
					}
				});
				loading.style.display = 'none';
				menu.style.opacity = 1;
				this.view.items.ItemTotal.innerHTML = `${count} result`;
			}
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
		this.renderItem(this.currentItems)
		this.handleCateogyClick();

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

	handleCateogyClick() {
		const categoryItems = document.querySelectorAll('.category-item');
		categoryItems.forEach(item => {
			item.addEventListener('click', (event) => {

				categoryItems.forEach(otherItem => {
					otherItem.classList.remove('active');
				});
				item.classList.add('active');
				this.getCategoryInforOnClick(event)
				if (this.selectedCategoryId == 1) {
					this.currentItems = this.allItems
					this.renderItem(this.currentItems)
				}
				else {
					this.currentItems = this.allItems.filter(item => item.categoryId == this.selectedCategoryId);
					this.renderItem(this.currentItems)
				}
			});
		});
	}

	renderItem(itemList) {
		this.view.items.renderItemList(itemList, this.selectedCategoryName);
	}
}
export default AppController;
