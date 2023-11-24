const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const loginUsername = document.getElementById("username").value;
  const loginPassword = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users"));

  const matchedUser = users.find(
    (user) => user.username === loginUsername && user.password === loginPassword
  );

  if (matchedUser) {
    if (matchedUser.isLocked) {
      swal({
        title: "Account has been locked",
        icon: "error",
        timer: 3000,
        buttons: false,
      });
    } else {
      swal({
        buttons: false,
        title: 'Logged in successfully ',
        icon: "success",
        timer: 4000,
      });

      //? Đây lên  local storage
      localStorage.setItem("loggedInUsername", matchedUser.username);

      window.location.href = "http://127.0.0.1:5502/home/giohang.html";
    }
  } else {
    swal({

      title: "Wrong username or password",
      icon: "error",
      timer: 3000,
      buttons: false,
    });
  }
});
