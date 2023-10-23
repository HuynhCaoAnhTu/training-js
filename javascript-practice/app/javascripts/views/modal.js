class ModalView {
	constructor() {
		this.modalEl = document.querySelector(".modal");
	}

	openViewModal = (product) => {
		console.log(product)
		if (product) {
			this.modalEl.setAttribute("data-id", product.productId);
			console.log(this.modalEl.querySelector('.modal-product-image'))
			this.modalEl.querySelector('.modal-product-image').src = product.productUrl;
			this.modalEl.querySelector('.modal-product-name').textContent = product.productName;
			this.modalEl.querySelector('.modal-product-des').textContent = product.productDes;
			this.modalEl.querySelector('.modal-product-price').innerHTML = `&dollar;${product.productPrice}`;
			this.modalEl.style.display = 'block'
		};
	}
}
export default ModalView;
