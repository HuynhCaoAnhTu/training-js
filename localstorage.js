/* eslint-disable no-param-reassign */
// async trả về 1 promise
async function fetchDataFromAPI(apiUrl) {
  try {
    const response = await fetch(apiUrl); // Đợi fetch() hoàn thành và trả về kết quả
    if (!response.ok) {
      throw new Error('Lỗi khi tải dữ liệu từ API');
    }
    const data = await response.json(); // Đợi hoàn thành và trả về kết quả
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function saveDataToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Dữ liệu đã được lưu vào localStorage.');
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu vào localStorage:', error);
  }
}

function loadDataFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    console.log('Không tìm thấy dữ liệu trong localStorage.');
    return null;
  } catch (error) {
    console.error('Lỗi khi truy xuất dữ liệu từ localStorage:', error);
    return null;
  }
}

async function checkDataInStorageOrFetchAndSave(apiUrl, key) {
  // Kiểm tra xem trong localStorage đã có dữ liệu hay chưa
  const storedData = loadDataFromLocalStorage(key);

  if (storedData) {
    // Nếu có dữ liệu trong localStorage, trả về nó
    return storedData;
  }
  // Nếu chưa có dữ liệu trong localStorage, gọi lại API để lấy dữ liệu
  try {
    const data = await fetchDataFromAPI(apiUrl);

    // Lưu dữ liệu vào localStorage
    await saveDataToLocalStorage(key, data);

    // Trả về dữ liệu đã được tải từ API
    return data;
  } catch (error) {
    console.error('Đã xảy ra lỗi khi tải dữ liệu từ API:', error);
    throw error;
  }
}

const apiUrl = 'https://api.publicapis.org/entries';
const key = 'apiData';

// Gọi hàm để truy xuất và hiển thị dữ liệu từ localStorage
function main() {
  const storedData = loadDataFromLocalStorage(key); // Load dữ liệu
  const entry = storedData.entries;
  entry.forEach((entries) => {
  // console.log('API:', entries.API);
  // console.log('Description:', entries.Description);
  // console.log('Category:', entries.Category);
  // console.log('--------------------------------');
    if (entries.Category === 'Weather') {
      console.log('API:', entries.API);
      console.log('Description:', entries.Description);
      console.log('Category:', entries.Category);
      console.log('--------------------------------');
    }
  });

  // Thay đổi data trong localStorage
  if (storedData.entries) {
    storedData.entries.forEach((entryChange) => {
      if (entryChange.Category === 'Weather') {
        entryChange.Description = 'Changed';
      }
    });
  }

  localStorage.setItem(key, JSON.stringify(storedData));
  // Xoá data trong localstorage
  // if (storedData.entries) {
  //   storedData.entries = storedData.entries.filter((entry1) => entry1.Category !== 'Weather');
  // }
  // localStorage.setItem(key, JSON.stringify(storedData));

  // localStorage.clear();
  // window.location.reload();
}
// Xử lý Promise
checkDataInStorageOrFetchAndSave(apiUrl, key)
  .then((data) => {
    console.log('Dữ liệu đã được tải hoặc lấy từ localStorage:', data);
    main();
  })
  .catch((error) => {
    console.error('Đã xảy ra lỗi:', error);
  });
