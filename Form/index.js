document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const isEmailValid = validateInput("email", /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "Email không hợp lệ.");
      const isUsernameValid = validateInput("username", /^[A-Za-z0-9_]{3,20}$/, "Tên người dùng không hợp lệ.");
      const isPasswordValid = validateInput("password", /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$/, "Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 ký tự và ít nhất 1 ký tự in hoa và 1 kí tự đặc biệt không phải là ký tự (số hoặc ký tự đặc biệt).");
      const isConfirmPasswordValid = validateInput("confirm-password", /.*/, "Vui lòng xác nhận mật khẩu.");
  
      if (isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
        alert("Đăng ký thành công!");
  
        const emailValue = document.getElementById("email").value;
        const usernameValue = document.getElementById("username").value;
        const passwordValue = document.getElementById("password").value;
  
        console.log("Email:", emailValue);
        console.log("Username:", usernameValue);
        console.log("Password:", passwordValue);
      }
    });
  
    function validateInput(inputId, regex, errorMessage) {
      const inputElement = document.getElementById(inputId);
      const errorElement = document.getElementById(`${inputId}-error`);
      const inputValue = inputElement.value.trim(); // Loại bỏ khoảng trắng dư thừa
  
      if (inputValue === "") {
        errorElement.textContent = "Trường này không được trống.";
        return false;
      }
  
      if (!regex.test(inputValue)) {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    }
  });
  