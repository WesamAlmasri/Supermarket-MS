let products = [];

// product constructor
function Product(name, price, category, quantity) {
  this.name = name;
  this.price = price;
  this.category = category;
  this.quantity = quantity;
  products.push(this);
}

// prototype function to render one product row inside the table
Product.prototype.renderProductRow = function (id) {
  const tableEl = document.getElementsByTagName('table')[0];
  const trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  const td1El = document.createElement('td');
  td1El.textContent = parseInt(id) + 1;
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
  td5El.innerHTML = `${this.quantity} <span><a onclick="dec(${id})">-</a> / <a onclick="inc(${id})">+</a></span>`;
  trEl.appendChild(td5El);
  const td6El = document.createElement('td');
  td6El.innerHTML = `<a onclick="del(${id})">Delete</a>`;
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
    products[i].renderProductRow(i);
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
  products.splice(i, 1);
  saveToLocalStorage();
  renderTable();
}

// function to increase the quantity of product
function inc(i) {
  products[i].quantity += 1;
  saveToLocalStorage();
  renderTable();
}

// function to decrease the quantity of product
function dec(i) {
  products[i].quantity -= 1;
  saveToLocalStorage();
  renderTable();
}

// function to handle submitting the form
function handleSumbit(e) {
  e.preventDefault();
  if(products.length === 0){
    renderHeader();
  }
  let name = e.target.name.value;
  let price = parseInt(e.target.price.value);
  let category = e.target.category.value;
  let quantity = parseInt(e.target.quantity.value);
  let newProduct = new Product(name, price, category, quantity);
  saveToLocalStorage();
  newProduct.renderProductRow(products.length - 1);
}

// function to make products objects after getting them from localStorage
function createProductsObjects() {
  let productsList = getFromLocalStorage() || [];
  if(productsList.length > 0){
    for(let i in productsList){
      new Product(productsList[i].name, productsList[i].price, productsList[i].category, productsList[i].quantity);
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
