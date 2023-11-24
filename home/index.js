let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let btn = document.querySelectorAll(".btn");
console.log(btn);
menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};
window.onscroll = () => {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
};
//*--------------- check trước khi mua -----------------------//

//? bắt sk click order
generateShopItems();

let btnOrder = document.querySelectorAll(".btn1");
btnOrder.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        //? kiểm tra
        let user = localStorage.getItem("loggedInUsername");
        if (!user) {
            swal("Please Sign Up/login before want to BUY.", {
                button: false,
                timer: 4000,
                icon: "info",
            });
            return;
        }
        //! bắt sk button
        var btnItem = event.target; //?lấy ra phần tử HTML trực tiếp được nhấp vào (nút mà người dùng đã nhấp vào) và gán vào biến btnItem.
        var product = btnItem.parentElement; //?lấy ra phần tử cha của btnItem, tức là phần tử chứa nút (thường là một sản phẩm hoặc phần tử có liên quan). Đối tượng cha này được gán vào biến product.
        var productImg = product.querySelector("img").src;
        var productName = product.querySelector(".drink").innerText;
        var productPrice = product.querySelector(".price").innerText;
        addCart(productImg, productName, productPrice);

        //* lấy ra các dữ liệu để xử lí   */
    });
});
function addCart(productImg, productName, productPrice) {
    let addtr = document.createElement("tr");
    var cartItems = document.querySelectorAll("tbody tr");
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].querySelector("img").src == productImg) {
            swal("Products in cart!", {
                button: false,
                timer: 1800,
                icon: "success",
            });
            return;
        }
    }

    let trcontent = `
        <tr>
            <td><img style="width: 50px; height: 80px;" src=${productImg} alt="">${productName}</td>
            <td><span>${productPrice}</span></td>
            <td><input style="width: 30px;" type="number" min="1" value="1"></td>
            <td class="cartDelete" style="cursor: pointer; font-size: 30px;">&times</td>
        </tr>
    `;

    let cartTable = document.querySelector("tbody");
    cartTable.append(addtr);
    addtr.innerHTML = trcontent;
    let cartQuantity = document.querySelector(".quantity");
    let currentQuantity = parseInt(cartQuantity.innerText);
    cartQuantity.innerText = currentQuantity + 1;
    cartTotal();
    deleteCart();
    slCart();

}
//*--------------------- đẩy ra giỏ hàng -------------------------------
//? Chức năng tạo các mặt hàng cửa hàng
function generateShopItems() {
    let shopContainer = document.getElementById("shopContainer");
    shopContainer.innerHTML = "";

    //? lấy dữ liệu từ localstorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach((product, index) => {
        let box = document.createElement("div");
        box.className = "box";

        let boxImg = document.createElement("div");
        boxImg.className = "box-img";
        let img = document.createElement("img");
        img.src = product.imgDrink;
        img.alt = product.product_name;
        boxImg.appendChild(img);
        box.appendChild(boxImg);

        let drinkName = document.createElement("h2");
        drinkName.className = "drink";
        drinkName.textContent = product.product_name;
        box.appendChild(drinkName);

        let price = document.createElement("span");
        price.className = "price";
        price.textContent = product.price;
        box.appendChild(price);

        let orderBtn = document.createElement("button");
        orderBtn.className = "btn1";
        orderBtn.textContent = "Order Now";
        box.appendChild(orderBtn);

        shopContainer.appendChild(box);
    });
}

//*------------------- để lên localstorage ------------------------------
// function saveCartToLocalStorage() {
//     let cartItems = document.querySelectorAll("tbody tr");d
//     let cartData = [];

//     cartItems.forEach(function (cartItem) {
//         let productImg = cartItem.querySelector("img").src;
//         let productName = cartItem.querySelector("td").innerText;
//         let productPrice = cartItem.querySelector("span").innerText;
//         let quantity = parseInt(cartItem.querySelector("input").value);

//         cartData.push({
//             productImg: productImg,
//             productName: productName,
//             productPrice: productPrice,
//             quantity: quantity,
//         });
//     });

//     localStorage.setItem("cart", JSON.stringify(cartData));
// }
//*------------------ đẩy cart lên local---------------------


//*---------------------- lấy dữ liệu ------------------------
window.addEventListener("load", function () {
    //! Truy xuất các mặt hàng trong giỏ hàng từ localStorage
    loadCartFromLocalStorage();
});

function loadCartFromLocalStorage() {
    let cartData = localStorage.getItem("cart");
    if (cartData) {
        cartData = JSON.parse(cartData);
        cartData.forEach(function (item) {
            addCart(item.productImg, item.productName, item.productPrice);
        });
    }
}
//*---------------------- đẩy cart lên  local ------------------------

//*---------------------- Tính tiền ---------------------*//
function cartTotal() {
    let cartItems = document.querySelectorAll("tbody tr");
    let totalPay = 0;

    cartItems.forEach(function (cartItem) {
        let inputValue = parseInt(cartItem.querySelector("input").value);
        let productPrice = parseFloat(cartItem.querySelector("span").innerHTML);
        let subtotal = inputValue * productPrice;
        totalPay += subtotal;
    });

    let cartTotalPay = document.querySelector(".price-total span");
    cartTotalPay.textContent = totalPay.toLocaleString() + " $";
    console.log(totalPay);
}

//*---------------------- XÓA ---------------------*//

function deleteCart() {
    let cartItems = document.querySelectorAll("tbody tr");
    cartItems.forEach(function (cartItem) {
        let deleteBtn = cartItem.querySelector(".cartDelete");
        deleteBtn.addEventListener("click", function () {
            let quantity = parseInt(cartItem.querySelector("input").value);
            cartItem.remove();
            cartTotal();
            updateTotalQuantity(-quantity);
            //? Lưu giỏ hàng đã cập nhật vào localStorage
        });
    });
}

function updateTotalQuantity(quantity) {
    let cartQuantity = document.querySelector(".quantity");
    let currentQuantity = parseInt(cartQuantity.innerText);
    let newQuantity = currentQuantity + quantity;
    cartQuantity.innerText = newQuantity >= 0 ? newQuantity : 0;
}

//* --------------------- tăng số lượng ----------------------*//
function slCart() {
    let cartItems = document.querySelectorAll("tbody tr");
    let totalQuantity = 0;

    cartItems.forEach(function (cartItem) {
        let inputValue = cartItem.querySelector("input");
        let quantity = parseInt(inputValue.value);
        totalQuantity += quantity;

        inputValue.addEventListener("change", function () {
            cartTotal();
            slCart();
        });
    });

    let cartQuantity = document.querySelector(".quantity");
    cartQuantity.innerText = totalQuantity.toString();
}



//* --------------------- thanh  toán ----------------------*//
let checkoutBtn = document.querySelector(".btn-checkout");

checkoutBtn.addEventListener("click", function (event) {
    event.preventDefault(); //? Ngăn chặn hành vi mặc định của nút submit

    //? Gọi hàm xử lý thanh toán
    checkout();
});


function checkout() {
    let cartItems = document.querySelectorAll("tbody tr");

    // Kiểm tra xem giỏ hàng có sản phẩm không
    if (cartItems.length === 0) {
        swal("Error", "Your cart is empty. Please add items before checking out.", "error");
        return;
    }

    // Hiển thị thông báo thanh toán thành công
    swal("Payment successful!", "Thank you for your purchase!", "success");

    let cartData = [];

    cartItems.forEach(function (cartItem) {
        let productImg = cartItem.querySelector("img").src;
        let productName = cartItem.querySelector("td").innerText;
        let productPrice = cartItem.querySelector("span").innerText;
        let quantity = parseInt(cartItem.querySelector("input").value);

        cartData.push({
            productImg: productImg,
            productName: productName,
            productPrice: productPrice,
            quantity: quantity
        });

        // Xóa sản phẩm khỏi giỏ hàng sau khi đã lấy thông tin
        cartItem.remove();
    });

    // Cập nhật tổng số lượng
    let cartQuantity = document.querySelector(".quantity");
    cartQuantity.innerText = "0";

    // Cập nhật tổng tiền
    let cartTotalPay = document.querySelector(".price-total span");
    cartTotalPay.innerHTML = "0 $";

    // Lấy danh sách sản phẩm từ Local Storage (nếu có)
    let storedCartData = localStorage.getItem("cart");
    if (storedCartData) {
        // Chuyển đổi danh sách sản phẩm từ chuỗi JSON sang mảng JavaScript
        storedCartData = JSON.parse(storedCartData);
    } else {
        // Nếu chưa có danh sách sản phẩm, khởi tạo một đối tượng rỗng
        storedCartData = {
            user: '',
            products: []
        };
    }

    // Thêm tên người dùng vào đối tượng storedCartData
    let username = localStorage.getItem("loggedInUsername")
    storedCartData.user = username;

    // Thêm sản phẩm vào danh sách
    storedCartData.products.push(...cartData);

    // Lưu danh sách sản phẩm vào Local Storage
    localStorage.setItem("cart", JSON.stringify(storedCartData));
}




//*------------------ lưu lên local --------------------------
//*----------------- hiển thị tên người dùng -----------------//
function displayUser() {
    let loggedInUser = localStorage.getItem("loggedInUsername");
    let signInBtn = document.getElementById("signInBtn");
    let signUpBtn = document.getElementById("signUpBtn");
    let signOut = document.getElementById("ca-nhan");
    let slCart = document.getElementById("quantity");

    if (loggedInUser) {
        signInBtn.style.display = "none";

        signUpBtn.style.display = "none";
        signOut.style.display = "inline-block";

        document.querySelector(".user").innerHTML = loggedInUser;
        document.querySelector(".user").style.display = "inline-block";
    } else {
        signInBtn.style.display = "";
        signUpBtn.style.display = "";
        signOut.style.display = "none";

        document.querySelector(".user").style.display = "none";
        slCart.style.display = "none";
    }
}

displayUser();

//*--------------------- nút ẩn && hiện  -------------------//

let hideBtn = document.querySelector(".bx-chevrons-right");
let showBtn = document.querySelector(".bxs-cart");
let cartElement = document.querySelector(".cart");

//? Hiện popup
showBtn.addEventListener("click", function () {
    cartElement.style.right = "0";
});

//? Đóng popup
hideBtn.addEventListener("click", function () {
    cartElement.style.right = "-130%";
});

//? Đóng popup khi click vào màn hình
window.addEventListener("click", function (event) {
    //? Kiểm tra xem người dùng có nhấp chuột vào bên ngoài phần tử .cart hay không
    if (
        !event.target.closest(".cart") &&
        !event.target.closest(".bxs-cart") &&
        !event.target.closest(".cartDelete") &&
        !event.target.closest(".btn1")
    ) {
        {
            cartElement.style.right = "-100%";
        }
    }
});
//*--------------- log out ------------------------------//
let logoutBtn = document.querySelector(".bxs-exit");

logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("loggedInUsername");
    logout();
    displayUser();
});

function logout() {
    swal({
        title: "Do you want to Exit",
        text: "You clicked the button!",
        icon: "success",
        timer: 6000,
        button: "Aww yiss!",
    });

    window.location.href = "http://127.0.0.1:5502/home/giohang.html#home";
}
window.addEventListener("load", displayUser);
