console.log('Invoice');

  /* API address */

const url = 'https://in3.dev/inv/';

fetch(url)
  .then(response => response.json())
  .then(data => {

    /* INVOICE DATA */

  document.getElementById('invoice-number').textContent = data.number;
  document.getElementById('invoice-date').textContent = data.date;
  document.getElementById('invoice-due-date').textContent = data.due_date;

    /* SELLER DATA */

  document.getElementById('seller-name').textContent = data.company.seller.name;
  document.getElementById('seller-address').textContent = data.company.seller.address;
  document.getElementById('seller-code').textContent = data.company.seller.code;
  document.getElementById('seller-vat').textContent = data.company.seller.vat;
  document.getElementById('seller-phone').textContent = data.company.seller.phone;
  document.getElementById('seller-email').textContent = data.company.seller.email;

    /* BUYER DATA */

  document.getElementById('buyer-name').textContent = data.company.buyer.name;
  document.getElementById('buyer-address').textContent = data.company.buyer.address;
  document.getElementById('buyer-code').textContent = data.company.buyer.code;
  document.getElementById('buyer-vat').textContent = data.company.buyer.vat;
  document.getElementById('buyer-phone').textContent = data.company.buyer.phone;
  document.getElementById('buyer-email').textContent = data.company.buyer.email;

  /* ITEMS */

  const itemsList = document.getElementById('items-list');

  let subtotal = 0;
  
  data.items.forEach(item => {
    if (item.discount.type === 'fixed') {
      discount = `-${item.discount.value.toFixed(2)}`
      totalPrice = `${((item.quantity * item.price) - (item.quantity * (-discount))).toFixed(2)}`;

    } else if (item.discount.type === 'percentage') {
      discountPrecentage = (item.price * item.discount.value / 100)
      discount = `${item.discount.value}% (-${discountPrecentage.toFixed(2)})`
      totalPrice = (item.quantity * item.price - (item.quantity * (item.price * item.discount.value / 100))).toFixed(2);

    } else {
      discount = '';
      totalPrice = (item.quantity * item.price).toFixed(2);
    };
    
    const row = document.createElement('tr');
    row.innerHTML = ` 
    <td>${item.description}</td>
    <td>${item.quantity}</td>
    <td>${item.price}</td>
    <td>${discount}</td>
    <td>${totalPrice}</td>
    `;

    itemsList.appendChild(row);

  });

    /* SHIPPING COST */

  document.getElementById('shippingPrice').textContent = data.shippingPrice.toFixed(2);

    /* SUBTOTAL */

  subtotal += Number(totalPrice);

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);

    /* VAT */

  const vat = ((Number(subtotal) + Number(data.shippingPrice)) * 0.21).toFixed(2);
  document.getElementById('vat').textContent = vat;

    /* TOTAL */

  const total = (Number(subtotal) + Number(data.shippingPrice) + Number(vat)).toFixed(2);
  document.getElementById('total').textContent = total;

})