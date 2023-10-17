import CategoryView from "./categoryView";
import ItemView from "./itemView";
import ModalView from "./modal";
class View {
	constructor() {
		this.categories = new CategoryView;
		this.items = new ItemView;
		this.modal = new ModalView;
	}
}
export default View;
