// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function() {
    
    window.location.href = "http://127.0.0.1:5502/Admin/dangnhap-admin/index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  let storedCartData = localStorage.getItem("cart");

  if (storedCartData) {
      
      storedCartData = JSON.parse(storedCartData);

      //? hiển thị tên người dùng 
      let usernameElement = document.getElementById("username");
      usernameElement.textContent = storedCartData.user;

      //? gọi id bảng
      let table = document.getElementById("cartTable");

      //? tạo bảng 
      let thead = document.createElement("thead");
      let headerRow = document.createElement("tr");
      let headers = ["Product Image", "Product Name", "Product Price", "Quantity"];
      headers.forEach(function (headerText) {
          let th = document.createElement("th");
          th.textContent = headerText;
          headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      //? tạo tr và td 
      let tbody = document.createElement("tbody");
      storedCartData.products.forEach(function (product) {
          let row = document.createElement("tr");

          //? Product Image
          let productImgCell = document.createElement("td");
          let productImg = document.createElement("img");
          productImg.src = product.productImg;
          productImgCell.appendChild(productImg);
          row.appendChild(productImgCell);

          //? Product Name
          let productNameCell = document.createElement("td");
          productNameCell.textContent = product.productName;
          row.appendChild(productNameCell);

          //? Product Price
          let productPriceCell = document.createElement("td");
          productPriceCell.textContent = product.productPrice;
          row.appendChild(productPriceCell);

          //? Quantity
          let quantityCell = document.createElement("td");
          quantityCell.textContent = product.quantity;
          row.appendChild(quantityCell);

          tbody.appendChild(row);
      });
      table.appendChild(tbody);

      //? sk click xác nhận đơn hàng 
      let actionButton = document.getElementById("acceptOrderButton");
      actionButton.addEventListener("click", function () {
          localStorage.removeItem("cart");
          swal({
              buttons: false,
              title: 'Order confirmed',
              icon: "success",
              timer: 4000,
            });

      });
  }
});
