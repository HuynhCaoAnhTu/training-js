import { KEY_CODE_ENTER } from '../constants/keyCode';
import Product, { Ingredient } from '../models/product';
import HistoryPaymentService from '../services/historypaymentService';

class AppController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
    this.categories = [];
    this.selectedCategoryId = '0';
    this.selectedCategoryName = 'All menu';
    this.historyService = new HistoryPaymentService();
  }

  init = async () => {
    this.slidebarHandle();
    await this.initCategory();
    await this.initProduct();
    await this.initBill();
    this.searchHandle();
  }

  slidebarHandle () {
    const mainContent = document.querySelector('.main-content');
    const bill = document.querySelector('.bill');
    const listItems = document.querySelectorAll('.slide-navigation .icon');
    const history = document.querySelector('.history-payment');
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        listItems.forEach(item => {
          item.classList.remove('slide-active');
        });
        item.classList.add('slide-active');
        const dataValue = item.getAttribute('data');
        switch (dataValue) {
          case '1':
            mainContent.style.display = 'block';
            bill.style.display = 'flex';
            history.style.display = 'none';
            break;
          case '2':
            mainContent.style.display = 'none';
            bill.style.display = 'none';
            history.style.display = 'block';
            this.view.history.renderHistoryPayment(this.historyService.getLocalStorage());
            break;
          case '3':
            mainContent.style.display = 'none';
            bill.style.display = 'none';
            history.style.display = 'none';
            this.view.modal.showToast('Sorry this function has not develop');
            break;
          case '4':
            mainContent.style.display = 'none';
            bill.style.display = 'none';
            history.style.display = 'none';
            this.view.modal.showToast('Sorry this function has not develop');
            break;
          case '5':
            mainContent.style.display = 'none';
            bill.style.display = 'none';
            history.style.display = 'none';
            this.view.modal.showToast('Sorry this function has not develop');
            break;
        }
      });
    });
  }

  searchHandle () {
    const searchInput = document.querySelector('.header-search');
    const loading = document.querySelector('.loader');
    const menu = document.querySelector('.menu');
    searchInput.addEventListener('keypress', e => {
      if (e.keyCode == KEY_CODE_ENTER) {
        let count = 0;
        const allproducts = document.querySelectorAll('.product ');
        const value = e.target.value;
        const lowercaseValue = value.toLowerCase();
        menu.style.opacity = 0.2;
        loading.style.display = 'block';
        allproducts.forEach(product => {
          const productNameElement = product.querySelector('.product-name');
          var productName = productNameElement.textContent.toLowerCase();
          if (!productName.includes(lowercaseValue)) {
            product.style.display = 'none';
          } else {
            product.style.display = 'flex';
            count += 1
          }
        });
        loading.style.display = 'none';
        menu.style.opacity = 1;
        this.view.products.ProductTotal.innerHTML = `${count} result`;
      }
    })
  }

  // CONTROLLER CATEGORY
  initCategory = async () => {
    await this.model.categoryList.init();
    this.loadListCategoryList();
  }

  loadListCategoryList = () => {
    this.categories = this.model.categoryList.getCategoryList();
    this.view.categories.renderCategoryList(this.categories);
  }

  // CONTROLLER product
  initProduct = async () => {
    await this.model.productList.init();
    this.loadListproductList();
    this.handleCateogyClick();
    this.handleOpenAddProductModal();
    this.handleOpenUpdateProductModal();
    this.handleDeleteProduct();
    this.handleAddProduct();
  }

  loadListproductList = () => {
    const products = this.model.productList.getProdcutList();
    this.renderProduct(products);
  }

  getCategoryInforOnClick (event) {
    const categoryId = event.currentTarget.getAttribute('category-id');
    if (categoryId != 0) {
      const category = this.categories.find(category => category.categoryId == categoryId);
      this.selectedCategoryId = categoryId;
      this.selectedCategoryName = category.categoryName;
    } else {
      this.selectedCategoryId = 0;
      this.selectedCategoryName = 'All menu';
    }
  }

  hanlderproductEvent = () => {
    this.handleproductClick();
    this.handleViewProductModal();
    this.handleAddProductToBill();
  }

  handleproductClick () {
    const productElements = document.querySelectorAll('.product');
    productElements.forEach((product) => {
      var isNoteVisible = false;
      product.addEventListener('click', (e) => {
        const productNote = e.currentTarget.querySelector('.product-note');
        const cta_view = e.currentTarget.querySelector('#cta-view');
        const cta_add = e.currentTarget.querySelector('#cta-add');
        this.handleNoteEvent(e);
        if (!isNoteVisible) {
          productNote.style.display = 'flex';
          isNoteVisible = true;
          cta_view.style.display = 'none';
          cta_add.style.display = 'block';
        } else {
          productNote.style.display = 'none';
          cta_add.style.display = 'none';
          cta_view.style.display = 'block';
          isNoteVisible = false;
        }
      });
    });
  }

  handleViewProductModal () {
    const viewDetailButton = document.querySelectorAll('#cta-view');
    viewDetailButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentLi = e.currentTarget.parentNode;
        const productId = parentLi.getAttribute('product-id');
        const productInfo = this.model.productList.getProdcutById(productId);
        this.view.modal.openViewModal(productInfo);
      });
    });
  }

  handleOptionClick (options, clickedOption) {
    options.forEach(option => {
      if (option === clickedOption) {
        if (!option.classList.contains('option-selected')) {
          option.classList.add('option-selected');
        }
      } else {
        option.classList.remove('option-selected');
      }
    });
  }

  handleNoteEvent (e) {
    const sugarOptions = e.currentTarget.querySelectorAll('.note-sugar .note-option');
    const iceOptions = e.currentTarget.querySelectorAll('.note-ice .note-option')
    sugarOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleOptionClick(sugarOptions, option);
      });
    });

    iceOptions.forEach(option1 => {
      option1.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleOptionClick(iceOptions, option1);
      });
    });
  }

  handleAddProductToBill () {
    const AddToBillButton = document.querySelectorAll('#cta-add');
    AddToBillButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentLi = e.currentTarget.parentNode;
        const productId = parentLi.getAttribute('product-id');
        const productName = parentLi.querySelector('.product-name').textContent;
        const productUrl = parentLi.querySelector('.product-img').src;
        const productDes = parentLi.querySelector('.product-des').textContent;
        const productPrice = parentLi.querySelector('.product-price').textContent.trim().replace('$', '');
        const ingerdients = [];
        const sugarEl = parentLi.querySelector('.note-sugar .option-selected');
        const iceEl = parentLi.querySelector('.note-ice .option-selected');
        if (sugarEl != null) {
          const sugarNote = sugarEl.textContent.trim().replace('%', '');
          const sugar = new Ingredient('sugar', +sugarNote);
          ingerdients.push(sugar)
        } else {
          const sugar = new Ingredient('sugar', 100);
          ingerdients.push(sugar)
        }
        if (iceEl != null) {
          const iceNote = iceEl.textContent.trim().replace('%', '');
          const ice = new Ingredient('ice', +iceNote);
          ingerdients.push(ice)
        } else {
          const ice = new Ingredient('ice', 100);
          ingerdients.push(ice)
        }
        this.addToBill(productId, productName, productUrl, productDes, +productPrice, ingerdients);
        this.view.modal.showToast('Product has been added to bill');
      });
    });
  }

  handleCateogyClick () {
    const categoryproducts = document.querySelectorAll('.category-item');
    categoryproducts.forEach(product => {
      product.addEventListener('click', (event) => {
        categoryproducts.forEach(otherproduct => {
          otherproduct.classList.remove('active');
        });
        product.classList.add('active');

        this.getCategoryInforOnClick(event);

        if (this.selectedCategoryId == 0) {
          this.renderProduct(this.model.productList.getProdcutList())
        } else {
          const productsFilter = this.model.productList.getProdcutList().filter(product => product.categoryId == this.selectedCategoryId);
          this.renderProduct(productsFilter)
        }
      });
    });
  }

  renderProduct (productList) {
    this.view.products.renderProductList(productList, this.selectedCategoryName);
    this.hanlderproductEvent();
  }

  getFormData (form) {
    const name = form.querySelector('#input-name');
    const url = form.querySelector('#input-url');
    const desc = form.querySelector('#textarea-desc');
    const price = form.querySelector('#input-price');
    const category = form.querySelector('#category-select');
    const sugar = form.querySelector('#checkbox-sugar');
    const ice = form.querySelector('#checkbox-ice');
    const checkRequired = this.view.modal.checkRequired([name, url, desc, price]);
    const checkNumber = this.view.modal.checkNumber(price);
    if (checkRequired === false || checkNumber === false) {
      return null;
    }
    return {
      name: name.value,
      url: url.value,
      desc: desc.value,
      category: category.value,
      price: price.value,
      isSugar: sugar.checked ? 1 : 0,
      isIce: ice.checked ? 1 : 0,
    };
  }

  handleAddProduct = () => {
    const addButton = document.querySelector('.cta-add-product');
    const form = document.getElementById('add-form');
    addButton.addEventListener('click', (e) => {
      const formData = this.getFormData(form);
      if (formData) {
        const product = new Product(
          this.model.productList.generateId(),
          formData.name,
          formData.desc,
          formData.category,
          formData.url,
          formData.price,
          formData.isSugar,
          formData.isIce
        );
        const products = this.model.productList.addProduct(product);
        this.view.modal.showToast('Added new product!');
        this.renderProduct(products);
      } else {
        e.preventDefault();
      }
    });
  }

  handleUpdateProduct = (productId) => {
    const form = document.getElementById('update-form');
    const update = form.querySelector('.cta-update');
    update.addEventListener('click', (e) => {
      const formData = this.getFormData(form);
      if (formData) {
        const products = this.model.productList.updateProduct(
          productId,
          formData.name,
          formData.desc,
          formData.category,
          formData.url,
          formData.price,
          formData.isSugar,
          formData.isIce
        );
        this.view.modal.showToast('Updated product!');
        this.renderProduct(products);
      } else {
        e.preventDefault();
      }
    });
  }

  handleDeleteProduct () {
    const deleteButtons = document.querySelectorAll('.cta-delete-product');
    const modalEl = document.getElementById('viewModal');
    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', (e) => {
        const userChoice = confirm('Do you want to delete this product');
        if (userChoice) {
          const productId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
          const products = this.model.productList.deleteProduct(productId);
          this.view.modal.showToast('Deleted product!');
          this.renderProduct(products);
          this.view.modal.closeModal(modalEl);
        }
      });
    });
  }

  handleOpenUpdateProductModal () {
    const updateButtons = document.querySelectorAll('.cta-update-product')
    const categories = this.model.categoryList.getCategoryList();
    updateButtons.forEach(updateButton => {
      updateButton.addEventListener('click', (e) => {
        const productId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
        const product = this.model.productList.getProdcutById(productId);
        this.view.modal.openUpdateModal(product, categories);
        this.handleUpdateProduct(productId);
      });
    });
  }

  handleOpenAddProductModal = () => {
    const addButton = document.querySelector('.cta-add-modal');
    const categories = this.model.categoryList.getCategoryList();
    addButton.addEventListener('click', () => {
      this.view.modal.openAddModal(categories, this.selectedCategoryId);
    });
  }

  // CONTROLLER BILL
  initBill = async () => {
    await this.model.bill.init();
    this.renderBill();
    this.handleConfirmCheckout();
  }

  addToBill = (productId, productName, productUrl, productDes, productPrice, ingerdient) => {
    const latestBill = this.model.bill.addToBill(productId, productName, productUrl, productDes, productPrice, ingerdient);
    this.model.bill.service.setLocalStorage(latestBill);
    this.renderBill();
  }

  renderBill () {
    const bill = this.model.bill.getProductInBill();
    const totalBill = this.model.bill.calculateTotalValue();
    this.view.bill.renderBill(bill, totalBill);
    this.handleUpdateQuantityButton();
    this.handleOpenCheckoutModal();
  }

  handleChangeQuantity (event, action) {
    const parentLi = event.currentTarget.parentNode.parentNode;
    const productId = parentLi.getAttribute('id');
    const sugarNoteEl = parentLi.querySelector('.product-bill-sugar');
    const iceNoteEl = parentLi.querySelector('.product-bill-ice');
    let sugarNote, iceNote;
    if (sugarNoteEl) {
      sugarNote = sugarNoteEl.textContent.trim().replace('%', '');
    } else {
      sugarNote = 100;
    }
    if (iceNoteEl) {
      iceNote = iceNoteEl.textContent.trim().replace('%', '');
    } else {
      iceNote = 100;
    }
    const ingredients = []
    const sugar = new Ingredient('sugar', +sugarNote);
    const ice = new Ingredient('ice', +iceNote);
    ingredients.push(sugar, ice);
    if (action === 'increase') {
      const latestBill = this.model.bill.increaseQuantity(productId, ingredients);
      this.model.bill.service.setLocalStorage(latestBill);
    } else if (action === 'decrease') {
      const latestBill = this.model.bill.decreaseQuantity(productId, ingredients);
      this.model.bill.service.setLocalStorage(latestBill);
    }
    this.renderBill();
  }

  handleUpdateQuantityButton = () => {
    const insButtons = document.querySelectorAll('.btn-cta-ins');
    const desButtons = document.querySelectorAll('.btn-cta-des');
    insButtons.forEach(insButton => {
      insButton.addEventListener('click', (event) => {
        this.handleChangeQuantity(event, 'increase');
      });
    });

    desButtons.forEach(desButton => {
      desButton.addEventListener('click', (event) => {
        this.handleChangeQuantity(event, 'decrease');
      });
    });
  }

  handleOpenCheckoutModal () {
    const checkoutButton = document.getElementById('cta-open-checkout');
    checkoutButton.addEventListener('click', (e) => {
      const bill = this.model.bill.getProductInBill();
      const parentEl = e.currentTarget.parentNode;
      const totalBill = parentEl.querySelector('.total-bill-ammout').textContent.trim().replace('$', '');
      this.view.modal.openCheckoutModal(bill, totalBill);
    });
  }

  handleConfirmCheckout () {
    const checkoutButton = document.getElementById('cta-checkout');
    let methodName;
    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodInputs.forEach(function (input) {
      if (input.checked) {
        methodName = input.value;
      }
      input.addEventListener('change', function () {
        if (input.checked) {
          methodName = input.value;
        }
      });
    });
    checkoutButton.addEventListener('click', (event) => {
      const bill = this.model.bill.getProductInBill();
      var now = new Date();
      const history = this.historyService.getLocalStorage();
      const modal = event.target.parentNode.parentNode;
      const totalBill = event.target.parentNode.querySelector('.table-product-total-bill').textContent.trim().replace('$', '');
      const dateCheckout = `${now.getDate()}/${now.getUTCMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()} `;
      if (bill.length == 0) {
        event.preventDefault();
        this.view.modal.showToast('Your bill is empty!');
      } else {
        checkoutButton.disabled = false;
        history.push({
          date: dateCheckout,
          bill: bill,
          totalBill: +totalBill,
          method: methodName
        });
        this.historyService.setLocalStorage(history);
        this.view.history.renderHistoryPayment(history, totalBill);
        this.model.bill.clearBill();
        this.model.bill.service.clearBillLocalStorage();
        modal.style.display = 'none';
        this.view.modal.showToast('Successful checkout');
        this.renderBill();
      }
    });
  }
}
export default AppController;
