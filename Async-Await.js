async function fetchDataFromJSONFile() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/cbmgit/852c2702d4342e7811c95f8ffc2f017f/raw/InsuranceCompanies.json');

    if (!response.ok) {
      throw new Error('Lỗi khi tải dữ liệu từ tệp JSON');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

fetchDataFromJSONFile()
  .then((data) => {
    const Companies = data.InsuranceCompanies['Top Insurance Companies'];
    Companies.forEach((company) => {
      console.log('Tên công ty:', company.Name);
      console.log('Market Capitalization', company['Market Capitalization']);
      console.log('--------------------------');
    });
  })
  .catch((error) => {
    console.error('Đã xảy ra lỗi:', error);
  });
