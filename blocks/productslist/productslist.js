async function loadProducts() {
  let productsJSON = await (await fetch('/Products.json')).json();
  return productsJSON.data;
}

function createRow(model, weight, price) {
  let $row = document.createElement('tr');
  $row.appendChild(createCell(model));
  $row.appendChild(createCell(weight));
  $row.appendChild(createCell(price));
  return $row;
}

function createCell(text) {
  let $cell = document.createElement('td');
  $cell.innerHTML = text;
  return $cell;
}

async function loadInclude($block, blockName) {
  const resp = await fetch(`/blocks/${blockName}/${blockName}.html`);
  const text = await resp.text();
  $block.innerHTML = text;
}

export default async function decorate($block, blockName) {
  await loadInclude($block, blockName);
  let products = await loadProducts();
  let $productsTable = document.querySelector('.productslist table > tbody');
  for(let i in products) {
    let $row = createRow(products[i].Model, products[i].Weight, products[i].Price);
    $productsTable.appendChild($row);
  }
}