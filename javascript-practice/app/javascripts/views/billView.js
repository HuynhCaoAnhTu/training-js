// view.js
class BillView {

	constructor() {
		this.contentContainer = document.querySelector('.content-container');
		this.mainContent = document.querySelector('.main-content');
		this.productList = document.querySelector('.product-list');
		this.bill = document.querySelector('.bill');
		this.productListBillEl = document.querySelector('.product-list-bill');
		this.totalBill = document.querySelector('.total-bill-ammout');
	}

	renderBill = (productinBill,totalBill) => {
		this.contentContainer.style.display = 'flex';
		this.mainContent.style.flex = '2';
		this.productList.style.gridTemplateColumns = 'repeat(2, 1fr)';
		this.productListBillEl.innerHTML = "";
		productinBill.forEach(product => {
			this.renderproductInBill(product);
		})
		this.totalBill.innerHTML = `&dollar;${totalBill}`;
	}

	renderproductInBill = (product) => {
		this.productListBillEl.innerHTML += `
    <li class="product-bill" id="${product.id}">
			<img class="product-bill-img" src="${product.imageUrl}" alt="${product.name}">
			<div class="product-bill-info">
				<p class="product-bill-name">${product.name}</p>
				<div class="product-bill-detail">
					<p class="product-bill-qnty"> <span>x</span>${product.quantity}</p>
                <div class="product-bill-note">
                  <label class="note-label-sugar" for="product-bill-sugar">Sugar: </label>
                  <p class="product-bill-sugar">${product.ingredients.find(
                    (ingredient) => ingredient.name === "sugar"
                  ).percentage}<span>&percnt;</span></p>
                  <label class="note-label-ice" for="product-bill-ice">Ice:</label>
                  <p class="product-bill-ice">${product.ingredients.find(
                    (ingredient) => ingredient.name === "ice"
                  ).percentage}<span>&percnt;</span></p>
                </div>
					<p class="product-bill-price"><span>$</span>${product.total}</p>
				</div>
			</div>
			<div class="cta-bill">
				<button class="btn btn-cta-ins">+</button>
				<button class="btn btn-cta-des">-</button>
			</div>
		</li>`;
	}
}

export default BillView;
