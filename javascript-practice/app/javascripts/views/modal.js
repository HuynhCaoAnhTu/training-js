class ModalView {
	constructor() {
		this.modalEl = document.querySelector(".modal");
	}

	openViewModal = (item) => {
		console.log(item)
		if (item) {
			this.modalEl.setAttribute("data-id", item.itemId);
			console.log(this.modalEl.querySelector('.modal-item-image'))
			this.modalEl.querySelector('.modal-item-image').src = item.itemUrl;
			this.modalEl.querySelector('.modal-item-name').textContent = item.itemName;
			this.modalEl.querySelector('.modal-item-des').textContent = item.itemDes;
			this.modalEl.querySelector('.modal-item-price').innerHTML = `&dollar;${item.itemPrice}`;
			this.modalEl.style.display = 'block'
		};
	}
}
export default ModalView;
