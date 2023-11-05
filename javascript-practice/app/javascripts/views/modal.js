import Category from "../models/category";

class ModalView {
	constructor() {
		this.tableContent = document.querySelector("#bill-table tbody");
		this.categoryContent = document.querySelector(".category-select");
	}

	openViewModal = (product) => {
		console.log(product)
		if (product) {
			const modalEl = document.getElementById("viewModal");
			this.handleCloseModal(modalEl);
			modalEl.setAttribute("data-id", product.productId);
			modalEl.querySelector('.modal-product-image').src = product.productUrl;
			modalEl.querySelector('.modal-product-name').textContent = product.productName;
			modalEl.querySelector('.modal-product-des').textContent = product.productDes;
			modalEl.querySelector('.modal-product-price').innerHTML = `&dollar;${product.productPrice}`;
			modalEl.style.display = 'block'
		};
	}

	handleCloseModal(modalEl){
		const close = modalEl.querySelector(".close");
		close.onclick = function () {
			modalEl.style.display = "none";
		}
		modalEl.addEventListener('click', (event) => {
			if (event.target === modalEl) {
				modalEl.style.display = "none";
			}
		});
	}

	closeModal(modalEl){
		modalEl.style.display = "none";
	}

	openCheckoutModal = (bill, total) => {
		console.log(bill)
		if (bill) {
			const modalEl = document.getElementById("checkoutModal");
			this.handleCloseModal(modalEl);
			const totalBill = document.querySelector(".table-product-total-bill");
			this.tableContent.innerHTML = "";
			bill.forEach(product => {
				this.renderProductPreCheckout(product);
			})
			totalBill.innerHTML = `&dollar;${total}`;
			modalEl.style.display = 'block'
		};
	}

	renderProductPreCheckout(product) {
		const tableContent = document.querySelector("#bill-table tbody");
		console.log(tableContent);
		console.log(product);

		this.tableContent.innerHTML +=
			`<tr>
			<td class="table-product-name">${product.name}</td>
			<td class="table-product-sugar">${product.ingredients.find((ingredient) => ingredient.name === "sugar").percentage} %</td>
			<td class="table-product-ice">${product.ingredients.find((ingredient) => ingredient.name === "ice").percentage} %</td>
			<td class="table-product-quantity">${product.quantity}</td>
			<td class="table-product-total">&dollar;${product.total}</td>
		</tr>`;
	}

	openAddModal(categories) {
		const modalEl = document.getElementById("addModal");
		this.handleCloseModal(modalEl);
		this.categoryContent.innerHTML = "";
		categories.forEach(category => {
			this.renderCategoryOption(category, modalEl);
		});
		modalEl.style.display = 'block'
	}

	renderCategoryOption(category, modalEl) {
		const categoryContent = modalEl.querySelector(".category-select");
		categoryContent.innerHTML += `<option class=category-option" value="${category.categoryId}">${category.categoryName}</option>`
	}

	showError = (input, message) => {
		const formControl = input.parentElement;
		formControl.className = 'form-control error';
		const small = formControl.querySelector('small');
		small.textContent = message;
	}

	showSucces = (input) => {
		const formControl = input.parentElement;
		formControl.className = 'form-control success';
	}

	checkRequired = (inputArr) => {
		let isValid = true;
		inputArr.forEach((input) => {
			if (input.value.trim() == '') {
				this.showError(input, `This filed is required`)
				isValid = false;
			} else {
				this.showSucces(input);
				return true;
			}
		});
		return isValid;
	}

	checkNumber = (input) => {
		let isValid = true;
		const value = parseInt(input.value);
		if (!isNaN(value) && value > 0) {
			this.showSucces(input);
		} else {
			this.showError(input, 'Invalid number, must be greater than 1');
			isValid = false;
		}
		return isValid;
	}

	openUpdateModal(product, categories) {
		const modalEl = document.getElementById("updateModal");
		this.handleCloseModal(modalEl);
		categories.forEach(category => {
			this.renderCategoryOption(category, modalEl);
		});
		modalEl.style.display = 'block'
		const form = document.querySelector('.update-form');
		const name = form.querySelector('#add-input-name');
		const url = form.querySelector('#url-img');
		const desc = form.querySelector('#add-ta-desc');
		const price = form.querySelector('#add-input-price');
		const category = form.querySelector(".category-select");
		const sugar = form.querySelector('#checkbox-sugar');
		const ice = form.querySelector('#checkbox-ice');
		name.value = product.productName;
		desc.value = product.productDes;
		url.value = product.productUrl;
		price.value = product.productPrice;
		category.value = product.categoryId;
		if (product.isSugar === 1) {
			sugar.checked = true;
		} else {
			sugar.checked = false;
		}
		if (product.isIce === 1) {
			ice.checked = true;
		} else {
			ice.checked = false;
		}
	}

}
export default ModalView;
