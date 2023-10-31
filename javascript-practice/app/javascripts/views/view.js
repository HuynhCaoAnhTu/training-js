import CategoryView from "./categoryView";
import ProdcutView from "./productView";
import ModalView from "./modal";
import BillView from "./billView";
import HistoryPaymentView from "./historypaymentView";
class View {
	constructor() {
		this.categories = new CategoryView;
		this.products = new ProdcutView;
		this.modal = new ModalView;
		this.bill = new BillView;
		this.history= new HistoryPaymentView;
	}
}
export default View;
