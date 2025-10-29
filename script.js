let items = [];
const form = document.getElementById('productForm');
const table = document.getElementById('inventory');
const nameInput = document.getElementById('name');
const qtyInput = document.getElementById('qty');
const priceInput = document.getElementById('price');

form.onsubmit = function(e) {
    e.preventDefault();
    items.push({
      name: nameInput.value,
      qty: qtyInput.value,
      price: priceInput.value
    });
    render();
    form.reset();
  };

function render() {
  table.innerHTML = "<tr><th>Name</th><th>Qty</th><th>Price</th><th>Remove</th></tr>";
  items.forEach((item, i) => {
    table.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price}</td>
      <td><button onclick="removeItem(${i})">X</button></td>
    </tr>`;
  });
}

window.removeItem = function(i) {
  items.splice(i,1); render();
};
