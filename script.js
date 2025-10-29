let items = [];
let editing = -1;
const form = document.getElementById('inventoryForm');
const fields = ['name','sku','cat','qty','supplier','price','loc'];
const msg = document.getElementById('msg');
const addBtn = document.getElementById('addBtn');
const table = document.getElementById('inventory');
const totalDiv = document.getElementById('total');
const rupee = "\u20B9"; // Unicode for ₹

form.onsubmit = function(e) {
  e.preventDefault();
  let obj = {};
  fields.forEach(f => obj[f]=document.getElementById(f).value.trim());
  if (!obj.name || !obj.sku || obj.qty==="" || obj.price==="") {
    msg.textContent = "Fill required fields!";
    return;
  }
  if (editing<0 && items.find(x=>x.sku===obj.sku)) {
    msg.textContent = "SKU already exists!";
    return;
  }
  msg.textContent = "";
  obj.qty = +obj.qty;
  obj.price = +obj.price;
  if (editing>=0) {
    items[editing] = obj;
    editing = -1;
    addBtn.textContent="Add";
  } else {
    items.push(obj);
  }
  render();
  form.reset();
};

function render() {
  let rows = `<tr>
    <th>Name</th><th>SKU</th><th>Cat</th><th>Qty</th><th>Supplier</th>
    <th>Price</th><th>Loc</th><th>Edit</th><th>Delete</th>`;
  let sum=0;
  items.forEach((it,i)=>{
    sum+=it.qty*it.price;
    rows += `<tr>
      <td>${it.name}</td>
      <td>${it.sku}</td>
      <td>${it.cat}</td>
      <td>${it.qty}</td>
      <td>${it.supplier}</td>
      <td>${rupee}${it.price}</td>
      <td>${it.loc}</td>
      <td><button onclick="editItem(${i})">Edit</button></td>
      <td><button onclick="delItem(${i})">X</button></td>
    </tr>`;
  });
  table.innerHTML = rows;
  totalDiv.textContent = "Total Inventory Value: " + rupee + sum;
}

window.editItem = function(i) {
  editing = i;
  fields.forEach(f=>document.getElementById(f).value=items[i][f]);
  addBtn.textContent="Update";
};

window.delItem = function(i) {
  if (confirm("Delete item?")) {
    items.splice(i,1);
    render();
  }
};

render();
