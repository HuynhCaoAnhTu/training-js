// controller.js
import { KEY_CODE_ENTER } from "../constants/key";
import { Ingredient } from "../models/product";
import HistoryPaymentService from "../services/historypaymentService";
class AppController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.categories = [];
		this.products = [];
		this.selectedCategoryId = 1;
		this.selectedCategoryName = "All menu";
		this.historyService= new HistoryPaymentService();
	}

	handleAddProduct(){
		const modal = document.getElementById("addModal");
		const close = modal.querySelector(".close");
		const addButton=document.querySelector(".cta-add-modal");
		close.onclick = function () {
			modal.style.display = "none";
		}
		var modals = document.getElementsByClassName("modal");
		window.onclick = function (event) {
				for (var i = 0; i < modals.length; i++) {
						var modal = modals[i];
						if (event.target == modal) {
								modal.style.display = "none";
						}
				}
		}
		addButton.addEventListener('click',()=>{
			this.view.modal.openAddModal();
		});


	}
	slidebarHandle(){
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
						switch(dataValue) {
							case "1":
								mainContent.style.display="block"
								bill.style.display="flex"
								// history.style.display="none"
								break;
							case "2":
								mainContent.style.display="none"
								bill.style.display="none"
								history.style.display="block";
								this.view.history.renderHistoryPayment(this.historyService.getLocalStorage());
								break;
						}
				});
		});
	}



	init = async () => {
		this.slidebarHandle();
		await this.initCategoryList();
		await this.initProductList();
		await this.initBill();
		this.searchHandle();
		this.handleAddProduct();
	}

	searchHandle() {
		const searchInput = document.querySelector('.header-search');
		const loading = document.querySelector('.loader');
		const menu = document.querySelector('.menu');
		searchInput.addEventListener('keypress', e => {
			if (e.keyCode == KEY_CODE_ENTER) {
				let count = 0;
				const allproducts = document.querySelectorAll(`.product `)
				const value = e.target.value;
				const lowercaseValue = value.toLowerCase();
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
	handleCheckout() {
		const modal = document.getElementById("checkoutModal");
		const close = modal.querySelector(".close");
		const checkoutButton = document.querySelector('.cta-checkout');
		close.onclick = function () {
			modal.style.display = "none";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		checkoutButton.addEventListener('click', (e) => {
			const bill = this.model.bill.getProductInBill();
			const parentEl = e.currentTarget.parentNode;
			const totalBill = parentEl.querySelector(".total-bill-ammout").textContent.trim().replace('$', '');
			this.view.modal.openCheckoutModal(bill, totalBill);
		});
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

	// CONTROLLER product
	initProductList = async () => {
		await this.model.productList.init();
		this.loadListproductList();
		this.hanlderproductEvent();
	}

	loadListproductList = () => {
		this.products = this.model.productList.getProdcutList();
		this.renderProduct(this.products)
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

	hanlderproductEvent() {
		this.handleproductClick();
		this.handleViewModal();
		this.handleAddToBill();
	}

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

	handleViewModal() {
		const modal = document.getElementById("viewModal");
		const close = modal.querySelector(".close");
		const viewDetailButton = document.querySelectorAll('#cta-view');
		close.onclick = function () {
			modal.style.display = "none";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
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

	handleNoteEvent(e) {
		const sugarOptions = e.currentTarget.querySelectorAll('.note-sugar .note-option');
		const iceOptions = e.currentTarget.querySelectorAll('.note-ice .note-option')
		sugarOptions.forEach(option => {
			option.addEventListener('click', (e) => {
				e.stopPropagation();

				if (option.classList.contains("option-selected")) {
					option.classList.remove('option-selected');
				}
				else {
					sugarOptions.forEach(otherproduct => {
						otherproduct.classList.remove('option-selected');
					});
					option.classList.add('option-selected');
				}
			});
		});
		iceOptions.forEach(option1 => {
			option1.addEventListener('click', (e) => {
				e.stopPropagation();
				if (option1.classList.contains("option-selected")) {
					option1.classList.remove('option-selected');
				}
				else {
					iceOptions.forEach(otherproduct => {
						otherproduct.classList.remove('option-selected');
					});
					option1.classList.add('option-selected');
				}

			});
		});
	}

	handleAddToBill() {
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
				if (sugarEl != null) {
					const sugarNote = sugarEl.textContent.trim().replace('%', '');
					const sugar = new Ingredient("sugar", +sugarNote);
					ingerdients.push(sugar)
				}
				else {
					const sugar = new Ingredient("sugar", 100);
					ingerdients.push(sugar)
				}
				if (iceEl != null) {
					const iceNote = iceEl.textContent.trim().replace('%', '');
					const ice = new Ingredient("ice", +iceNote);
					ingerdients.push(ice)
				}
				else {
					const ice = new Ingredient("ice", 100);
					ingerdients.push(ice)
				}
				this.addToBill(productId, productName, productUrl, productDes, +productPrice, ingerdients)
			});
		});
	}

	handleCateogyClick() {
		const categoryproducts = document.querySelectorAll('.category-item');
		categoryproducts.forEach(product => {
			product.addEventListener('click', (event) => {

				categoryproducts.forEach(otherproduct => {
					otherproduct.classList.remove('active');
				});
				product.classList.add('active');
				this.getCategoryInforOnClick(event)
				if (this.selectedCategoryId == 1) {
					this.renderProduct(this.products)
					this.hanlderproductEvent();
				}
				else {
					const productsFilter = this.products.filter(product => product.categoryId == this.selectedCategoryId);
					this.renderProduct(productsFilter)
					this.hanlderproductEvent();
				}
			});
		});
	}

	renderProduct(productList) {
		this.view.products.renderProductList(productList, this.selectedCategoryName);
	}

	// CONTROLLER BILL
	initBill = async () => {
		await this.model.bill.init();
		this.renderBill();
		await this.handleConfirmCheckout();
	}

	addToBill(productId, productName, productUrl, productDes, productPrice, ingerdient) {
		const latestBill = this.model.bill.addToBill(productId, productName, productUrl, productDes, productPrice, ingerdient);
		this.model.bill.service.setLocalStorage(latestBill);
		this.renderBill()
	}

	renderBill() {
		const bill = this.model.bill.getProductInBill();
		const totalBill = this.model.bill.calculateTotalValue()
		this.view.bill.renderBill(bill, totalBill);
		this.handleChangeQuantity();
		this.handleCheckout();

	}

	handleChangeQuantity() {
		const insButtons = document.querySelectorAll(".btn-cta-ins");
		const desButtons = document.querySelectorAll(".btn-cta-des");
		insButtons.forEach(insButton => {
			insButton.addEventListener('click', (event) => {
				const parentLi = event.currentTarget.parentNode.parentNode;
				const productId = parentLi.getAttribute("id");
				const sugarNote = parentLi.querySelector(".product-bill-sugar").textContent.trim().replace('%', '');
				const iceNote = parentLi.querySelector(".product-bill-ice").textContent.trim().replace('%', '');
				const ingredients = []
				const sugar = new Ingredient("sugar", +sugarNote);
				const ice = new Ingredient("ice", +iceNote);
				ingredients.push(sugar, ice)
				const latestBill = this.model.bill.increaseQuantity(productId, ingredients)
				this.model.bill.service.setLocalStorage(latestBill);
				this.renderBill()
			});
		});
		desButtons.forEach(desButton => {
			desButton.addEventListener('click', (event) => {
				const parentLi = event.currentTarget.parentNode.parentNode;
				const productId = parentLi.getAttribute("id");
				const sugarNote = parentLi.querySelector(".product-bill-sugar").textContent.trim().replace('%', '');
				const iceNote = parentLi.querySelector(".product-bill-ice").textContent.trim().replace('%', '');
				const ingredients = []
				const sugar = new Ingredient("sugar", +sugarNote);
				const ice = new Ingredient("ice", +iceNote);
				ingredients.push(sugar, ice)
				const latestBill = this.model.bill.decreaseQuantity(productId, ingredients)
				this.model.bill.service.setLocalStorage(latestBill);
				this.renderBill()
			});
		});
	}

	handleConfirmCheckout() {
		const checkoutButton = document.querySelector(".cta-checkout-bill");
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
			var now = new Date();
			const bill = this.model.bill.getProductInBill();
			const history = this.historyService.getLocalStorage();
			const modal=event.target.parentNode.parentNode;
			const totalBill = event.target.parentNode.querySelector(".table-product-total-bill").textContent.trim().replace('$', '');
			const dateCheckout = `${now.getDate()}/${now.getUTCMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()} `;
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
			modal.style.display= "none"
			this.renderBill();
		});
	}

}
export default AppController;
