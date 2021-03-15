let products = [];

// product constructor
function Product(id, name, price, category, quantity) {
  this.id = parseInt(id);
  this.name = name;
  this.price = parseInt(price);
  this.category = category;
  this.quantity = parseInt(quantity);
  products.push(this);
}

// prototype function to render one product row inside the table
Product.prototype.renderProductRow = function () {
  const tableEl = document.getElementsByTagName('table')[0];
  const trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  const td1El = document.createElement('td');
  td1El.textContent = this.id;
  trEl.appendChild(td1El);
  const td2El = document.createElement('td');
  td2El.textContent = this.name;
  trEl.appendChild(td2El);
  const td3El = document.createElement('td');
  td3El.textContent = this.price;
  trEl.appendChild(td3El);
  const td4El = document.createElement('td');
  td4El.textContent = this.category;
  trEl.appendChild(td4El);
  const td5El = document.createElement('td');
  td5El.innerHTML = `${this.quantity} <span><a onclick="dec(${this.id})">-</a> / <a onclick="inc(${this.id})">+</a></span>`;
  trEl.appendChild(td5El);
  const td6El = document.createElement('td');
  td6El.innerHTML = `<a onclick="del(${this.id})">Delete</a>`;
  trEl.appendChild(td6El);
};

// function to render all products into the table
function renderTable() {
  clearTable();
  renderHeader();
  renderProducts();
}


// function to clear the table section
function clearTable() {
  const resultSectionEl = document.getElementById('resultSection');
  resultSectionEl.innerHTML = '';
}

// function to render the header of the table
function renderHeader() {
  const resultSectionEl = document.getElementById('resultSection');
  const tableEl = document.createElement('table');
  resultSectionEl.appendChild(tableEl);
  tableEl.innerHTML = '<tr><th>id</th><th>Name</th><th>Price ($)</th><th>Category</th><th>Quantity</th><th>Action</th></tr>';
}

// function to render all products rows
function renderProducts() {
  for(let i in products){
    products[i].renderProductRow();
  }
}

// function to save products array to localStorage
function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

// function to get products array from localStorage
function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('products'));
}

// function to delete product from products, save the new version to localStorage and render the whole table again
function del(i) {
  let index = products.findIndex((item) => item.id == i);
  products.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}

// function to increase the quantity of product
function inc(i) {
  let index = products.findIndex((item) => item.id == i);
  products[index].quantity += 1;
  saveToLocalStorage();
  renderTable();
}

// function to decrease the quantity of product
function dec(i) {
  let index = products.findIndex((item) => item.id == i);
  products[index].quantity -= 1;
  saveToLocalStorage();
  renderTable();
}

// function to handle submitting the form
function handleSumbit(e) {
  e.preventDefault();
  let id = 1;
  if(products.length > 0){
    id = products[products.length - 1].id + 1;
  } else {
    renderHeader();
  }
  let name = e.target.name.value;
  let price = e.target.price.value;
  let category = e.target.category.value;
  let quantity = e.target.quantity.value;
  let newProduct = new Product(id, name, price, category, quantity);
  saveToLocalStorage();
  newProduct.renderProductRow();
}

// function to make products objects after getting them from localStorage
function createProductsObjects() {
  let productsList = getFromLocalStorage() || [];
  if(productsList.length > 0){
    for(let i in productsList){
      new Product(productsList[i].id, productsList[i].name, productsList[i].price, productsList[i].category, productsList[i].quantity);
    }
  }
}

// function to initialize the page at first time
function init() {
  createProductsObjects();
  if(products.length > 0){
    renderTable();
  }
}

// make an event listener to the form
const formEl = document.getElementById('form');
formEl.addEventListener('submit', handleSumbit);

// initialize the page
init();
