import CategoryView from "./categoryView";
import ItemView from "./itemView";
import ModalView from "./modal";
import BillView from "./billView";
class View {
	constructor() {
		this.categories = new CategoryView;
		this.items = new ItemView;
		this.modal = new ModalView;
		this.bill = new BillView;
	}
}
export default View;
