const myPromise = new Promise((resolve, reject) => {
  const randomNumber = Math.random();

  if (randomNumber < 0.5) {
    resolve("Thành công! Số ngẫu nhiên: " + randomNumber);
  } else {
    reject("Thất bại! Số ngẫu nhiên: " + randomNumber);
  }
});

myPromise.then(successMessage => {
  console.log(successMessage);
}).catch(errorMessage => {
  console.error(errorMessage);
});


// -------Promise.all and Promise.race-------
function simulateAsyncTask(taskName, duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Hoàn thành: ${taskName}`);
    }, duration);
  });
}

const promise1 = simulateAsyncTask("Tác vụ 1", 2000);
const promise2 = simulateAsyncTask("Tác vụ 2", 1500);
const promise3 = simulateAsyncTask("Tác vụ 3", 1000);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log("Kết quả từ tất cả các Promises: ", results);
  })
  .catch(error => {
    console.error("Lỗi: ", error);
  });

Promise.race([promise1, promise2, promise3])
  .then(result => {
    console.log("Promise đầu tiên hoàn thành: ", result);
  })
  .catch(error => {
    console.error("Lỗi từ Promise đầu tiên: ", error);
  });