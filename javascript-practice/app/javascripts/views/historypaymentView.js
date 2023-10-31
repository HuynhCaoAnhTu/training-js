class HistoryPaymentView{
	constructor() {
		this.tableContent = document.querySelector(".history-table tbody");
	}

	renderHistoryPayment = (hisroryList) => {
		if (hisroryList) {
			this.tableContent.innerHTML = "";

			hisroryList.forEach(history => {
				const billLength = history.bill.length;
					this.renderBillPaied(history,billLength);

				})
		};
	}

	renderBillPaied(bill,billLength) {
		this.tableContent.innerHTML +=
			`<tr>
			<td class="table-product-date" rowspan="${billLength+1}">${bill.date}</td>
			<td class="table-product-method"rowspan="${billLength+1}" >${bill.method}</td>
			<td class="table-product-total"rowspan="${billLength+1}" >&dollar;${bill.totalBill}</td>
		</tr>`;
		bill.bill.forEach(bill => {
			this.renderProductInBill(bill);
			})
	}

	renderProductInBill(bill){
		this.tableContent.innerHTML +=
		`<tr>
		<td class="table-product-name">${bill.name}</td>
		<td class="table-product-sugar">${bill.ingredients.find((ingredient) => ingredient.name === "sugar").percentage} %</td>
		<td class="table-product-ice">${bill.ingredients.find((ingredient) => ingredient.name === "ice").percentage} %</td>
		<td class="table-product-quantity">${bill.quantity}</td>
	</tr>`;
	}

}
export default HistoryPaymentView;
