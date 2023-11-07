class ModalView {
	constructor() {
		this.tableContent = document.querySelector("#bill-table tbody");
	}

	openViewModal = (product) => {
		if (product) {
			const modalEl = document.getElementById("viewModal");
			this.handleCloseModal(modalEl);
			modalEl.setAttribute("data-id", product.productId);
			modalEl.querySelector('.modal-product-image').src = product.productUrl;
			modalEl.querySelector('.modal-product-name').textContent = product.productName;
			modalEl.querySelector('.modal-product-des').textContent = product.productDes;
			modalEl.querySelector('.modal-product-price').innerHTML = `&dollar;${product.productPrice}`;
			modalEl.style.display = 'block';
		};
	}

	handleCloseModal(modalEl) {
		const close = modalEl.querySelector(".close");
		const forms = document.querySelectorAll('.form');
		close.onclick = () => {
			modalEl.style.display = "none";
			this.resetForms(forms);
		}
		modalEl.addEventListener('click', (event) => {
			if (event.target === modalEl) {
				modalEl.style.display = "none";
				this.resetForms(forms);
			}
		});
		document.addEventListener('keydown', (event) => {
			if (event.keyCode === 27) {
				modalEl.style.display = "none";
			}
		});
	}

	resetForms(forms) {
		forms.forEach(form => {
			form.reset();
		});
	}

	closeModal(modalEl) {
		modalEl.style.display = "none";
	}

	openCheckoutModal = (bill, total) => {
		if (bill) {
			const modalEl = document.getElementById("checkoutModal");
			this.handleCloseModal(modalEl);
			const totalBill = document.querySelector(".table-product-total-bill");
			this.tableContent.innerHTML = "";
			bill.forEach(product => {
				this.renderProductPreCheckout(product);
			});
			totalBill.innerHTML = `&dollar;${total}`;
			modalEl.style.display = 'block';
		};
	}

	renderProductPreCheckout(product) {
		const sugar = product.ingredients.find((ingredient) => ingredient.name === "sugar").percentage;
		const ice = product.ingredients.find((ingredient) => ingredient.name === "ice").percentage;
		this.tableContent.innerHTML +=
			`<tr>
			<td class="table-product-name">${product.name}</td>
			${sugar !== 100 ? `	<td class="table-product-sugar">${sugar} %</td>` : '<td class="table-product-sugar"></td>'}
			${ice !== 100 ? `<td class="table-product-ice">${ice} %</td>` : '<td class="table-product-ice"></td>'}
			<td class="table-product-quantity">${product.quantity}</td>
			<td class="table-product-total">&dollar;${product.total}</td>
		</tr>`;
	}

	openAddModal(categories, selectedCategoryId) {
		const modalEl = document.getElementById("addModal");
		const categoryContent = modalEl.querySelector(".category-select");
		this.handleCloseModal(modalEl);
		categoryContent.innerHTML = "";
		categories.forEach(category => {
			this.renderCategoryOption(category, modalEl);
		});
		if (selectedCategoryId != 0) {
			categoryContent.value = selectedCategoryId;
			categoryContent.disabled = true;
		}
		else {
			categoryContent.disabled = false;
		}
		modalEl.style.display = 'block'
	}

	renderCategoryOption(category, modalEl) {
		const categoryContent = modalEl.querySelector(".category-select");
		categoryContent.innerHTML += `<option class=category-option" value="${category.categoryId}">${category.categoryName}</option>`;
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
		const form = document.getElementById('update-form');
		const name = form.querySelector('#input-name');
		const url = form.querySelector('#input-url');
		const desc = form.querySelector('#textarea-desc');
		const price = form.querySelector('#input-price');
		const category = form.querySelector("#category-select");
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

	showToast(message) {
		const toast = document.getElementById("toast");
		const messageEl = toast.querySelector(".message");
		messageEl.textContent = message;
		toast.className = "show";
		setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 1000);
	}

}
export default ModalView;
