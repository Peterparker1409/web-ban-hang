let users = JSON.parse(localStorage.getItem("users")) || [];
let isRegistered = false;

function checkUser(email, username) {
  const existingUserEmail = users.find((user) => user.email === email);
  const existingUserUsername = users.find((user) => user.username === username);

  if (existingUserEmail) {
    swal("The email address has been used!", {
      button: false,
      timer: 2000,
      icon: "error",
    });
    return false;
  }

  if (existingUserUsername) {
    swal("Username used!", {
      button: false,
      timer: 2000,
      icon: "error",
    });
    return false;
  }

  return true;
}

function validateEmail(email) {
  //? Biểu thức chính quy để kiểm tra địa chỉ email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    swal("Địa chỉ email không hợp lệ!", {
      button: false,
      timer: 2000,
      icon: "error",
    });
    return false;
  }
  return true;
}


function validateUsername(username) {
  if (username.length < 5) {
    swal("Tên người dùng phải có ít nhất 5 ký tự!", {
      button: false,
      timer: 2000,
      icon: "error",
    });
    return false;
  }
  return true;
}

function validatePassword(password) {
  if (password.length < 6) {
    swal("Mật khẩu phải có ít nhất 6 ký tự!", {
      button: false,
      timer: 2000,
      icon: "error",
    });
    return false;
  }

  var special = /[!@#$%^&*(),.?":{}|<>]/;
  if (!special.test(password)) {
    swal("Mật khẩu phải chứa ít nhất một ký tự đặc biệt!", {
      button: false,
      timer: 2000,
      icon: "error",
    });
    return false;
  }

  return true;
}

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!validateEmail(email) || !validateUsername(username) || !validatePassword(password)) {
    return;
  }
  if (!checkUser(email, username)) {
    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 10000000),
    email: email,
    username: username,
    password: password,
    
    isLocked: false,

  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  swal({
    title: "Sign Up Success",
    icon: "success",
    timer: 3000,
  }).then(() => {
    window.location.href =
      "http://127.0.0.1:5502/home/dangki-dangnhap/dangnhap.html";
  });
});
