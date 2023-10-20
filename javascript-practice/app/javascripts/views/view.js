import CategoryView from "./categoryView";
import ProdcutView from "./productView";
import ModalView from "./modal";
import BillView from "./billView";
class View {
	constructor() {
		this.categories = new CategoryView;
		this.products = new ProdcutView;
		this.modal = new ModalView;
		this.bill = new BillView;
	}
}
export default View;
