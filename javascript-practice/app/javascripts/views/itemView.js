// view.js
class ItemView {

  constructor() {
    this.ItemListEl = document.getElementById('items');
    this.MenuTitle = document.querySelector('.menu-title');
    this.ItemTotal = document.getElementById('menu-total');
  }
  renderItemList = (itemList,categoryName) => {
    this.MenuTitle.innerHTML= categoryName;
    this.ItemTotal.innerHTML= `${itemList.length} result`;
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
      <button class="btn-sencondary" type="button">View detail</button>
    </li>`;
  }
}
export default ItemView;