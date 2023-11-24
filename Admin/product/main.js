// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

//? Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
//?-------------------- Xử  lí  form --------------------------//


//? lấy dữ liệu về
let products = JSON.parse(localStorage.getItem("products")) || [];

//! tạo bảng 
function renderProducts() {
	const tableBody = document.getElementById("result");
	tableBody.innerHTML = "";

	products.forEach((product, index) => {
		const row = document.createElement("tr");

		const indexColumn = document.createElement("td");
		indexColumn.textContent = index + 1;
		row.appendChild(indexColumn);

		const nameColumn = document.createElement("td");
		nameColumn.textContent = product.product_name;
		row.appendChild(nameColumn);

		const imgColumn = document.createElement("td");
		const imgElement = document.createElement("img");
		imgElement.src = product.imgDrink;
		imgElement.alt = product.product_name;
		imgElement.width = 100;
		imgColumn.appendChild(imgElement);
		row.appendChild(imgColumn);

		const priceColumn = document.createElement("td");
		priceColumn.textContent = product.price;
		row.appendChild(priceColumn);

		const actionsColumn = document.createElement("td");
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.addEventListener("click", () => editProduct(index));
		actionsColumn.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => deleteProduct(index));
		actionsColumn.appendChild(deleteButton);

		row.appendChild(actionsColumn);

		tableBody.appendChild(row);
	});
}

//? Chức năng lưu sản phẩm mới hoặc cập nhật sản phẩm hiện có
function saveProduct() {
	const index = document.getElementById("index").value;
	const productName = document.getElementById("product_name").value;
	const imgDrink = document.getElementById("imgDrink").value;
	const price = document.getElementById("price").value;

	if (index === "") {
		//? thêm sản phẩm 
		const product = {
			product_name: productName,
			imgDrink: imgDrink,
			price: price
		};
		products.push(product);
	} else {
		//?Cập nhật một sản phẩm hiện có
		const existingProduct = products[index];
		if (existingProduct) {
			existingProduct.product_name = productName;
			existingProduct.imgDrink = imgDrink;
			existingProduct.price = price;
		}
	}

	//? lưu  localStorage
	localStorage.setItem("products", JSON.stringify(products));

	//? xóa dữ liệu form
	document.getElementById("index").value = "";
	document.getElementById("product_name").value = "";
	document.getElementById("imgDrink").value = "";
	document.getElementById("price").value = 0;

	//!Kết xuất các sản phẩm được cập nhật trong bảng
	renderProducts();
}

//? Chức năng sửa sản phẩm
function editProduct(index) {
	const product = products[index];
	if (product) {
		document.getElementById("index").value = index;
		document.getElementById("product_name").value = product.product_name;
		document.getElementById("imgDrink").value = product.imgDrink;
		document.getElementById("price").value = product.price;
	}
}

//!Chức năng xóa sản phẩm
function deleteProduct(index) {
	products.splice(index, 1);

	//?lưu localStorage
	localStorage.setItem("products", JSON.stringify(products));

	//? Kết xuất các sản phẩm được cập nhật trong bảng
	renderProducts();
}

//!tạo lại form 
renderProducts();
