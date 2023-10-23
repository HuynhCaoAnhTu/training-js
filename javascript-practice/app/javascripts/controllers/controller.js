// controller.js
import { KEY_CODE_ENTER } from "../constants/key";
class AppController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.categories = [];
		this.products = [];
		this.selectedCategoryId = 1
		this.selectedCategoryName = "All menu"
	}
	init = async () => {
		await this.initCategoryList();
		await this.initProductList();
		await this.initBill();
		this.searchHandle();
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
			console.log(this.selectedCategoryName );
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
				console.log(cta_add)
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
		const modal = document.getElementById("myModal");
		const close = document.getElementsByClassName("close")[0];
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
				console.log(productId)
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

					console.log(`Selected Ice Option: ${option.textContent}`);
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
				const productPrice = parentLi.querySelector('.product-price').textContent;
				const priceInt=parseInt(productPrice.replace(/\D/g, ''), 10);
				const ingerdient =[];
				const sugarEl = parentLi.querySelector('.note-sugar .option-selected');
				const iceEl = parentLi.querySelector('.note-ice .option-selected');
				if (sugarEl != null) {
					var sugarNote = sugarEl.textContent;
					ingerdient.push({
						name: "sugar",
						percentage: sugarNote
					})
				}
				else{
					ingerdient.push({
						name: "sugar",
						percentage: "0"
					})
				}
				if (iceEl != null) {
					var iceNote = iceEl.textContent;
					ingerdient.push({
						name: "ice",
						percentage: iceNote
					})
				}
				else{
					ingerdient.push({
						name: "ice",
						percentage: "0"
					})
				}
				console.log(ingerdient)
				this.addToBill(productId,productName,productUrl,productDes,priceInt, ingerdient)
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
	}

	addToBill(productId,productName,productUrl,productDes,productPrice, ingerdient) {
		const latestBill = this.model.bill.addToBill(productId,productName,productUrl,productDes,productPrice, ingerdient);
		this.model.bill.service.setLocalStorage(latestBill);
		this.renderBill()
	}

	renderBill() {
		const bill= this.model.bill.getProductInBill();
		const totalBill= this.model.bill.calculateTotalValue()
		this.view.bill.renderBill(bill,totalBill);
		this.handleChangeQuantity();
	}

	handleChangeQuantity(){
		const insButtons= document.querySelectorAll(".btn-cta-ins");
		const desButtons= document.querySelectorAll(".btn-cta-des");
		insButtons.forEach(insButton => {
			insButton.addEventListener('click', (event) => {
				const parentLi = event.currentTarget.parentNode.parentNode;
				const productId= parentLi.getAttribute("id");
				const sugarNote= parentLi.querySelector(".product-bill-sugar").textContent;
				const iceNote= parentLi.querySelector(".product-bill-ice").textContent;
				const ingredient=[]
				ingredient.push({
					name: "sugar",
					percentage: sugarNote,
				})
				ingredient.push({
					name: "ice",
					percentage: iceNote,
				})
				const latestBill = this.model.bill.increaseQuantity(productId,ingredient)
				console.log(latestBill)
				this.model.bill.service.setLocalStorage(latestBill);
				this.renderBill()
			});
		});
		desButtons.forEach(desButton => {
			desButton.addEventListener('click', (event) => {
				const parentLi = event.currentTarget.parentNode.parentNode;
				const productId= parentLi.getAttribute("id");
				const sugarNote= parentLi.querySelector(".product-bill-sugar").textContent;
				const iceNote= parentLi.querySelector(".product-bill-ice").textContent;
				const ingredient=[]
				ingredient.push({
					name: "sugar",
					percentage: sugarNote,
				})
				ingredient.push({
					name: "ice",
					percentage: iceNote,
				})
				const latestBill = this.model.bill.decreaseQuantity(productId,ingredient)
				console.log(latestBill)
				this.model.bill.service.setLocalStorage(latestBill);
				this.renderBill()
			});
		});
	}
}
export default AppController;
