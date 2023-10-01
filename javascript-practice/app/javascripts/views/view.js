import CategoryView from "./categoryView";

import ItemView from "./itemView";
class View {
    constructor() {
        this.categories = new CategoryView;
        this.items = new ItemView;
    }
}
export default View;