// view.js
class BillView {

	constructor() {
		this.contentContainer = document.querySelector('.content-container');
		this.mainContent = document.querySelector('.main-content');
		this.itemList = document.querySelector('.product-list');
		this.bill=document.querySelector('.bill');
		this.ItemListBillEl = document.querySelector('.product-list-bill');
	}

	renderBill = (IteminBill) => {
		this.contentContainer.style.display= 'flex';
		this.mainContent.style.flex= '2';
		this.itemList.style.gridTemplateColumns = 'repeat(2, 1fr)';
		this.ItemListBillEl.innerHTML = "";
		IteminBill.forEach(Item => {
			this.renderItemInBill(Item);
		})
	}

	renderItemInBill = (Item) => {
		this.ItemListBillEl.innerHTML += `
    <li class="item-bill" id="${Item.id}">
			<img class="item-bill-img" src="${Item.imageUrl}" alt="${Item.name}">
			<div class="item-bill-info">
				<p class="item-bill-name">${Item.name}</p>
				<div class="item-bill-detail">
					<p class="item-bill-qnty"> <span>x</span>${Item.quantity}</p>
					<div class="item-bill-note">
						<label class="note-label-sugar" for="item-bill-sugar">Sugar: </label>
						<p class="item-bill-sugar">${Item.sugarNote}</p>
						<label class="note-label-ice" for="item-bill-ice">Ice:</label>
						<p class="item-bill-ice">${Item.iceNote}</p>
					</div>
					<p class="item-bill-price"><span>$</span>${Item.totalPrice}</p>
				</div>
			</div>
			<div class="cta-bill">
				<button class="btn btn-cta-ins">+</button>
				<button class="btn btn-cta-des">-</button>
				<!-- <button class="btn btn-cta-remove">x</button> -->
			</div>
		</li>`;
	}
}

export default BillView;
