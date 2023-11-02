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
			modalEl.setAttribute("data-id", product.productId);
			modalEl.querySelector('.modal-product-image').src = product.productUrl;
			modalEl.querySelector('.modal-product-name').textContent = product.productName;
			modalEl.querySelector('.modal-product-des').textContent = product.productDes;
			modalEl.querySelector('.modal-product-price').innerHTML = `&dollar;${product.productPrice}`;
			modalEl.style.display = 'block'
		};
	}

	openCheckoutModal = (bill, total) => {
		console.log(bill)
		if (bill) {
			const modalEl = document.getElementById("checkoutModal");
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
		this.categoryContent.innerHTML= "";
		categories.forEach(category=>{
			this.renderCategoryOption(category);
		});
		modalEl.style.display = 'block'
	}

	renderCategoryOption(category){
		this.categoryContent.innerHTML +=`<option class=category-option" value="${category.categoryId}">${category.categoryName}</option>`
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
}
export default ModalView;
