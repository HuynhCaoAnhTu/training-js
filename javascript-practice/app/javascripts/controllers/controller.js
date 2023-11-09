import { KEY_CODE_ENTER } from '../constants/keyCode';
import Product, { Ingredient } from '../models/product';
import HistoryPaymentService from '../services/historypaymentService';

class AppController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.categories = [];
		this.selectedCategoryId = '0';
		this.selectedCategoryName = 'All menu';
		this.historyService = new HistoryPaymentService();
	}

	init = async () => {
		this.slidebarHandle();
		await this.initCategory();
		await this.initProduct();
		await this.initBill();
		this.searchHandle();
	}

	/**
	 * Handles the sidebar.
	 */
	slidebarHandle() {
		const mainContent = document.querySelector('.main-content');
		const bill = document.querySelector('.bill');
		const listItems = document.querySelectorAll('.slide-navigation .icon');
		const history = document.querySelector('.history-payment');

		listItems.forEach(item => {
			item.addEventListener('click', () => {
				listItems.forEach(item => {
					item.classList.remove('slide-active');
				});
				item.classList.add('slide-active');
				const dataValue = item.getAttribute('data');
				switch (dataValue) {
					case '1':
						mainContent.style.display = 'block';
						bill.style.display = 'flex';
						history.style.display = 'none';
						break;
					case '2':
						mainContent.style.display = 'none';
						bill.style.display = 'none';
						history.style.display = 'block';
						this.view.history.renderHistoryPayment(this.historyService.getLocalStorage());
						break;
					case '3':
						mainContent.style.display = 'none';
						bill.style.display = 'none';
						history.style.display = 'none';
						this.view.modal.showToast('Sorry this function has not develop');
						break;
					case '4':
						mainContent.style.display = 'none';
						bill.style.display = 'none';
						history.style.display = 'none';
						this.view.modal.showToast('Sorry this function has not develop');
						break;
					case '5':
						mainContent.style.display = 'none';
						bill.style.display = 'none';
						history.style.display = 'none';
						this.view.modal.showToast('Sorry this function has not develop');
						break;
				}
			});
		});
	}

	/**
	 * Handles search product by product name.
	 */
	searchHandle() {
		const searchInput = document.querySelector('.header-search');
		const loading = document.querySelector('.loader');
		const menu = document.querySelector('.menu');

		searchInput.addEventListener('keypress', e => {
			if (e.keyCode == KEY_CODE_ENTER) {
				let count = 0;
				const allproducts = document.querySelectorAll('.product ');
				const value = e.target.value;
				const lowercaseValue = value.toLowerCase();
				// show loading
				menu.style.opacity = 0.2;
				loading.style.display = 'block';

				allproducts.forEach(product => {
					const productNameElement = product.querySelector('.product-name');
					var productName = productNameElement.textContent.toLowerCase();
					if (!productName.includes(lowercaseValue)) {
						product.style.display = 'none';
					} else {
						product.style.display = 'flex';
						count += 1
					}
				});

				loading.style.display = 'none';
				menu.style.opacity = 1;
				this.view.products.ProductTotal.innerHTML = `${count} result`;
			}
		})
	}

	// CONTROLLER CATEGORY
	initCategory = async () => {
		await this.model.categoryList.init();
		this.loadListCategoryList();
	}

	loadListCategoryList = () => {
		this.categories = this.model.categoryList.getCategoryList();
		this.view.categories.renderCategoryList(this.categories);
	}

	// CONTROLLER product
	initProduct = async () => {
		await this.model.productList.init();
		this.loadListproductList();
		this.handleCateogyClick();
		this.handleOpenAddProductModal();
		this.handleOpenUpdateProductModal();
		this.handleDeleteProduct();
		this.handleAddProduct();
	}

	/**
	 * Get product list on model and render.
	 */
	loadListproductList = () => {
		const products = this.model.productList.getProdcutList();
		this.renderProduct(products);
	}

	/**
	 * Save the category Id and Category Name selected.
	 * @param {Event} event - The event object.
	 */
	getCategoryInforOnClick(event) {
		const categoryId = event.currentTarget.getAttribute('category-id');

		if (categoryId != 0) {
			const category = this.categories.find(category => category.categoryId == categoryId);
			this.selectedCategoryId = categoryId;
			this.selectedCategoryName = category.categoryName;
		} else {
			this.selectedCategoryId = 0;
			this.selectedCategoryName = 'All menu';
		}
	}

	/**
 * Handles product event.
 */
	hanlderproductEvent = () => {
		this.handleproductClick();
		this.handleViewProductModal();
		this.handleAddProductToBill();
	}

	/**
 * Handle the event when the product is clicked.
 */
	handleproductClick() {
		const productElements = document.querySelectorAll('.product');

		productElements.forEach((product) => {
			var isNoteVisible = false;

			product.addEventListener('click', (e) => {
				const productNote = e.currentTarget.querySelector('.product-note');
				const cta_view = e.currentTarget.querySelector('#cta-view');
				const cta_add = e.currentTarget.querySelector('#cta-add');

				this.handleNoteEvent(e);

				if (!isNoteVisible) {
					productNote.style.display = 'flex';
					isNoteVisible = true;
					cta_view.style.display = 'none';
					cta_add.style.display = 'block';
				} else {
					productNote.style.display = 'none';
					cta_add.style.display = 'none';
					cta_view.style.display = 'block';
					isNoteVisible = false;
				}
			});
		});
	}

	/**
 * Handle the event when view detail button is clicked.
 */
	handleViewProductModal() {
		const viewDetailButton = document.querySelectorAll('#cta-view');

		viewDetailButton.forEach((button) => {
			button.addEventListener('click', (e) => {
				e.stopPropagation();
				const parentLi = e.currentTarget.parentNode;
				const productId = parentLi.getAttribute('product-id');
				const productInfo = this.model.productList.getProdcutById(productId);

				this.view.modal.openViewModal(productInfo);
			});
		});
	}

	/**
		* Handles the change in quantity of a product in the bill.
		* @param {NodeList} options - The options to choose from.
		* @param {HTMLElement} clickedOption - The clicked option to highlight.
		*/
	handleOptionClick(options, clickedOption) {
		options.forEach(option => {
			if (option === clickedOption) {
				if (!option.classList.contains('option-selected')) {
					option.classList.add('option-selected');
				}
			} else {
				option.classList.remove('option-selected');
			}
		});
	}

	/**
	* Handles the selection of sugar and ice options for a product.
	* @param {Event} e - The event object.
	*/
	handleNoteEvent(e) {
		const sugarOptions = e.currentTarget.querySelectorAll('.note-sugar .note-option');
		const iceOptions = e.currentTarget.querySelectorAll('.note-ice .note-option')

		sugarOptions.forEach(option => {
			option.addEventListener('click', (e) => {
				e.stopPropagation();
				this.handleOptionClick(sugarOptions, option);
			});
		});

		iceOptions.forEach(option1 => {
			option1.addEventListener('click', (e) => {
				e.stopPropagation();
				this.handleOptionClick(iceOptions, option1);
			});
		});
	}

	/**
		* Handles adding a product to the bill.
		*/
	handleAddProductToBill() {
		const AddToBillButton = document.querySelectorAll('#cta-add');

		AddToBillButton.forEach((button) => {
			button.addEventListener('click', (e) => {
				e.stopPropagation();
				const parentLi = e.currentTarget.parentNode;
				const productId = parentLi.getAttribute('product-id');
				const productName = parentLi.querySelector('.product-name').textContent;
				const productUrl = parentLi.querySelector('.product-img').src;
				const productDes = parentLi.querySelector('.product-des').textContent;
				const productPrice = parentLi.querySelector('.product-price').textContent.trim().replace('$', '');
				const ingerdients = [];
				const sugarEl = parentLi.querySelector('.note-sugar .option-selected');
				const iceEl = parentLi.querySelector('.note-ice .option-selected');

				this.addIngredient(sugarEl, 'sugar', ingerdients);
				this.addIngredient(iceEl, 'ice', ingerdients);
				this.addToBill(productId, productName, productUrl, productDes, +productPrice, ingerdients);
				this.view.modal.showToast('Product has been added to bill');
			});
		});
	}

	/**
	* Adds an ingredient to the list.
	* @param {HTMLElement} element - The selected element.
	* @param {string} name - The name of the ingredient.
	* @param {Ingredient[]} ingredients - The list of ingredients to update.
	*/
	addIngredient(element, name, ingredients) {
		let note = 100;
		if (element != null) {
			note = element.textContent.trim().replace('%', '');
		}
		const ingredient = new Ingredient(name, +note);
		ingredients.push(ingredient);
	}

	/**
	 * Get the note percentage from an element.
	 * @param {HTMLElement} element - The element containing the note percentage.
	 * @returns {number} - The note percentage value.
	 */
	getNote(element) {
		return element ? element.textContent.trim().replace('%', '') : 100;
	}

	/**
	* Handles category item click events.
	*/
	handleCateogyClick() {
		const categoryproducts = document.querySelectorAll('.category-item');

		categoryproducts.forEach(product => {
			product.addEventListener('click', (event) => {
				categoryproducts.forEach(otherproduct => {
					otherproduct.classList.remove('active');
				});
				product.classList.add('active');

				this.getCategoryInforOnClick(event);

				if (this.selectedCategoryId == 0) {
					this.renderProduct(this.model.productList.getProdcutList())
				} else {
					const productsFilter = this.model.productList.getProdcutList().filter(product => product.categoryId == this.selectedCategoryId);
					this.renderProduct(productsFilter)
				}
			});
		});
	}

	/**
	* Render the product list.
	* @param {Product[]} productList - The list of products to render.
	*/
	renderProduct(productList) {
		this.view.products.renderProductList(productList, this.selectedCategoryName);
		this.hanlderproductEvent();
	}

	/**
 * Retrieves form data for adding or updating a product.
 * @param {HTMLFormElement} form - The form element containing product information.
 * @returns {Object|null} - An object containing product details or null if validation fails.
 */
	getFormData(form) {
		const name = form.querySelector('#input-name');
		const url = form.querySelector('#input-url');
		const desc = form.querySelector('#textarea-desc');
		const price = form.querySelector('#input-price');
		const category = form.querySelector('#category-select');
		const sugar = form.querySelector('#checkbox-sugar');
		const ice = form.querySelector('#checkbox-ice');
		const checkRequired = this.view.modal.checkRequired([name, url, desc, price]);
		const checkNumber = this.view.modal.checkNumber(price);

		if (checkRequired === false || checkNumber === false) {
			return null;
		}
		return {
			name: name.value,
			url: url.value,
			desc: desc.value,
			category: category.value,
			price: price.value,
			isSugar: sugar.checked ? 1 : 0,
			isIce: ice.checked ? 1 : 0,
		};
	}

	/**
 * Handles event for adding a new product.
 */
	handleAddProduct = () => {
		const addButton = document.querySelector('.cta-add-product');
		const form = document.getElementById('add-form');

		addButton.addEventListener('click', (e) => {
			const formData = this.getFormData(form);

			if (formData) {
				const product = new Product(
					this.model.productList.generateId(),
					formData.name,
					formData.desc,
					formData.category,
					formData.url,
					formData.price,
					formData.isSugar,
					formData.isIce
				);
				const products = this.model.productList.addProduct(product);
				this.view.modal.showToast('Added new product!');
				this.renderProduct(products);
			} else {
				e.preventDefault();
			}
		});
	}

	/**
 * Handles event for updating a product.
 * @param {string} productId - The ID of the product to be updated.
 */
	handleUpdateProduct = (productId) => {
		const form = document.getElementById('update-form');
		const update = form.querySelector('.cta-update');
		update.addEventListener('click', (e) => {
			const formData = this.getFormData(form);
			if (formData) {
				const products = this.model.productList.updateProduct(
					productId,
					formData.name,
					formData.desc,
					formData.category,
					formData.url,
					formData.price,
					formData.isSugar,
					formData.isIce
				);
				this.view.modal.showToast('Updated product!');
				this.renderProduct(products);
			} else {
				e.preventDefault();
			}
		});
	}

	/**
 * Handles event for deleting a product.
 */
	handleDeleteProduct() {
		const deleteButtons = document.querySelectorAll('.cta-delete-product');
		const modalEl = document.getElementById('viewModal');
		deleteButtons.forEach(deleteButton => {
			deleteButton.addEventListener('click', (e) => {
				const userChoice = confirm('Do you want to delete this product');
				if (userChoice) {
					const productId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
					const products = this.model.productList.deleteProduct(productId);
					this.view.modal.showToast('Deleted product!');
					this.renderProduct(products);
					this.view.modal.closeModal(modalEl);
				}
			});
		});
	}

	/**
 * Handles event for opening the modal to add a new product.
 */
	handleOpenUpdateProductModal() {
		const updateButtons = document.querySelectorAll('.cta-update-product')
		const categories = this.model.categoryList.getCategoryList();
		updateButtons.forEach(updateButton => {
			updateButton.addEventListener('click', (e) => {
				const productId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
				const product = this.model.productList.getProdcutById(productId);
				this.view.modal.openUpdateModal(product, categories);
				this.handleUpdateProduct(productId);
			});
		});
	}

	/**
 * Handles event for opening the modal to update a product.
 */
	handleOpenAddProductModal = () => {
		const addButton = document.querySelector('.cta-add-modal');
		const categories = this.model.categoryList.getCategoryList();
		addButton.addEventListener('click', () => {
			this.view.modal.openAddModal(categories, this.selectedCategoryId);
		});
	}

	// CONTROLLER BILL
	initBill = async () => {
		await this.model.bill.init();
		this.renderBill();
		this.handleConfirmCheckout();
	}

	/**
		* Add a product to the bill.
		* @param {string} productId - The product ID.
		* @param {string} productName - The product name.
		* @param {string} productUrl - The product image URL.
		* @param {string} productDes - The product description.
		* @param {number} productPrice - The product price.
		* @param {Ingredient[]} ingredients - The list of ingredients for the product.
		*/
	addToBill = (productId, productName, productUrl, productDes, productPrice, ingerdient) => {
		const latestBill = this.model.bill.addToBill(productId, productName, productUrl, productDes, productPrice, ingerdient);
		this.model.bill.service.setLocalStorage(latestBill);
		this.renderBill();
	}

	/**
	 * Render the bill and update the total value.
	 */
	renderBill() {
		const bill = this.model.bill.getProductInBill();
		const totalBill = this.model.bill.calculateTotalValue();
		this.view.bill.renderBill(bill, totalBill);
		this.handleUpdateQuantityButton();
		this.handleOpenCheckoutModal();
	}

	/**
		* Handle the change in quantity of a product in the bill.
		* @param {Event} event - The event object.
		* @param {string} action - The action to perform (increase or decrease).
		*/
	handleChangeQuantity(event, action) {
		const parentLi = event.currentTarget.parentNode.parentNode;
		const productId = parentLi.getAttribute('id');
		const sugarNoteEl = parentLi.querySelector('.product-bill-sugar');
		const iceNoteEl = parentLi.querySelector('.product-bill-ice');


		const sugarNote = this.getNote(sugarNoteEl);
		const iceNote = this.getNote(iceNoteEl);

		const ingredients = []
		const sugar = new Ingredient('sugar', +sugarNote);
		const ice = new Ingredient('ice', +iceNote);
		ingredients.push(sugar, ice);

		if (action === 'increase') {
			const latestBill = this.model.bill.increaseQuantity(productId, ingredients);
			this.model.bill.service.setLocalStorage(latestBill);
		} else if (action === 'decrease') {
			const latestBill = this.model.bill.decreaseQuantity(productId, ingredients);
			this.model.bill.service.setLocalStorage(latestBill);
		}

		this.renderBill();
	}

	/**
		* Handle events for quantity increase and decrease buttons.
		*/
	handleUpdateQuantityButton = () => {
		const insButtons = document.querySelectorAll('.btn-cta-ins');
		const desButtons = document.querySelectorAll('.btn-cta-des');

		insButtons.forEach(insButton => {
			insButton.addEventListener('click', (event) => {
				this.handleChangeQuantity(event, 'increase');
			});
		});

		desButtons.forEach(desButton => {
			desButton.addEventListener('click', (event) => {
				this.handleChangeQuantity(event, 'decrease');
			});
		});
	}

	/**
		* Handle event to open the checkout modal.
		*/
	handleOpenCheckoutModal() {
		const checkoutButton = document.getElementById('cta-open-checkout');

		checkoutButton.addEventListener('click', (e) => {
			const bill = this.model.bill.getProductInBill();
			const parentEl = e.currentTarget.parentNode;
			const totalBill = parentEl.querySelector('.total-bill-ammout').textContent.trim().replace('$', '');
			this.view.modal.openCheckoutModal(bill, totalBill);
		});
	}

	/**
		* Handle event to confirm the checkout.
		*/
	handleConfirmCheckout() {
		const checkoutButton = document.getElementById('cta-checkout');
		let methodName;
		const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');

		paymentMethodInputs.forEach(function (input) {
			if (input.checked) {
				methodName = input.value;
			}
			input.addEventListener('change', function () {
				if (input.checked) {
					methodName = input.value;
				}
			});
		});

		checkoutButton.addEventListener('click', (event) => {
			const bill = this.model.bill.getProductInBill();
			var now = new Date();
			const history = this.historyService.getLocalStorage();
			const modal = event.target.parentNode.parentNode;
			const totalBill = event.target.parentNode.querySelector('.table-product-total-bill').textContent.trim().replace('$', '');
			const dateCheckout = `${now.getDate()}/${now.getUTCMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()} `;

			if (bill.length == 0) {
				event.preventDefault();
				this.view.modal.showToast('Your bill is empty!');
			} else {
				checkoutButton.disabled = false;
				history.push({
					date: dateCheckout,
					bill: bill,
					totalBill: +totalBill,
					method: methodName
				});
				this.historyService.setLocalStorage(history);
				this.view.history.renderHistoryPayment(history, totalBill);
				this.model.bill.clearBill();
				this.model.bill.service.clearBillLocalStorage();
				modal.style.display = 'none';
				this.view.modal.showToast('Successful checkout');
				this.renderBill();
			}
		});
	}
}
export default AppController;
