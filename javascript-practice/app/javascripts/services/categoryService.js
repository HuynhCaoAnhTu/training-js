class CategoryService {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async getCategories() {
		try {
			let categoriesData = [];

			const storedData = localStorage.getItem('categoriesData');
			if (storedData) {
				categoriesData = JSON.parse(storedData);
				console.log(categoriesData)
			} else {
				const response = await fetch('http://localhost:3000/categories');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				categoriesData = await response.json();
				localStorage.setItem('categoriesData', JSON.stringify(categoriesData));
			}

			return categoriesData;
		} catch (error) {
			throw error;
		}
	}

}

export default CategoryService;
