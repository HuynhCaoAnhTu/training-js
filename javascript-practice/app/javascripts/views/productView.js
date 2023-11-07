// view.js
class ProductView {

	constructor() {
		this.Menu = document.querySelector('.menu');
		this.ProductListEl = document.getElementById('products');
		this.MenuTitle = document.querySelector('.menu-title');
		this.ProductTotal = document.getElementById('menu-total');
		this.loading = document.createElement('div');
	}

	renderProductList = (productList, categoryName) => {
		this.loading.className = "loader";
		this.Menu.appendChild(this.loading);
		this.MenuTitle.innerHTML = categoryName;
		this.ProductTotal.innerHTML = `${productList.length} result`;
		this.ProductListEl.innerHTML = "";

		productList.forEach(product => {
			this.renderProduct(product);
		})
	}

	renderProduct = (product) => {
		this.ProductListEl.innerHTML += `
    <li class="product" product-id="${product.productId}">
      <div class="product-container">
        <img class="product-img" src="${product.productUrl}" alt="${product.productName}">
        <div class="product-content">
          <p class="product-name">${product.productName}</p>
          <p class="product-des">${product.productDes}</p>
          <p class="product-price">&dollar; ${product.productPrice}</p>
					</div>
      </div>
			<div class="product-note">
			${product.isSugar === 1 ? `
				<div class="note-sugar">
					<h4 class="note-title">Sugar</h4>
					<ul class="note-list">
						<li class="note-option">20%</li>
						<li class="note-option">40%</li>
						<li class="note-option">60%</li>
					</ul>
				</div>
		` : ''}
		${product.isIce === 1 ? `
		<div class="note-ice">
			<h4 class="note-title">Ice</h4>
			<ul class="note-list">
				<li class="note-option">20%</li>
				<li class="note-option">40%</li>
				<li class="note-option">60%</li>
			</ul>
		</div>
` : ''}
		</div>

      <button class="btn btn-sencondary " id="cta-view" type="button">View detail</button>
			<button class="btn btn-primary " id="cta-add" type="button">Add to billing</button>
    </li>`;
	}
}

export default ProductView;
