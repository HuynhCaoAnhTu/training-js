class ModalView {
	constructor() {
		this.tableContent = document.querySelector("#bill-table tbody");
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

}
export default ModalView;
