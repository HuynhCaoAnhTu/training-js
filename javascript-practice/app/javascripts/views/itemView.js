// view.js
class ItemView {

	constructor() {
		this.Menu = document.querySelector('.menu');
		this.ItemListEl = document.getElementById('items');
		this.MenuTitle = document.querySelector('.menu-title');
		this.ItemTotal = document.getElementById('menu-total');
		this.loading = document.createElement('div');
	}

	renderItemList = (itemList, categoryName) => {
		this.loading.className = "loader"
		this.Menu.appendChild(this.loading);
		this.MenuTitle.innerHTML = categoryName;
		this.ItemTotal.innerHTML = `${itemList.length} result`;
		this.ItemListEl.innerHTML = "";

		itemList.forEach(Item => {
			this.renderItem(Item);
		})
	}

	renderItem = (Item) => {
		this.ItemListEl.innerHTML += `
    <li class="item" item-id="${Item.itemId}">
      <div class="item-container">
        <img class="item-img" src="${Item.itemUrl}" alt="${Item.itemName}">
        <div class="item-content">
          <p class="item-name">${Item.itemName}</p>
          <p class="item-des">${Item.itemDes}</p>
          <p class="item-price">&dollar; ${Item.itemPrice}</p>
					</div>
      </div>
			<div class="item-note">
				<div class="note-sugar">
					<h4 class="note-title">Sugar</h4>
					<ul class="note-list">
						<li class="note-option">20%</li>
						<li class="note-option">40%</li>
						<li class="note-option">60%</li>
					</ul>
				</div>
				<div class="note-ice">
					<h4 class="note-title">Ice</h4>
					<ul class="note-list">
						<li class="note-option">20%</li>
						<li class="note-option">40%</li>
						<li class="note-option">60%</li>
					</ul>
				</div>
			</div>
      <button class="btn-sencondary " id="cta-view" type="button">View detail</button>
			<button class="btn-primary " id="cta-add" type="button">Add to billing</button>
    </li>`;
	}
}

export default ItemView;
