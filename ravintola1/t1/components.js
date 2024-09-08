'use strict';

const restaurantRow = (restaurant) => {
  const {name, company, address} = restaurant;

  const rivi = document.createElement('tr');

  const nimi = document.createElement('td');
  nimi.innerText = name || 'Unnamed';

  const firma = document.createElement('td');
  firma.innerText = company || 'Unknown';

  const osoite = document.createElement('td');
  osoite.innerText = address || 'Address not available';

  rivi.append(nimi, firma, osoite);
  return rivi;
};

const restaurantModal = (restaurant, menu) => {
  const {name, company, address, city, phone, postalCode} = restaurant;
  let listaHTML = '';

  menu.forEach((course) => {
    const {name, price, diets} = course;
    listaHTML += `
    <li>
      <h4>${name || 'Not specified'}</h4>
      <p>Price: ${price ? `${price} €` : 'Not available'}</p>
      <p>Allergens: ${diets || 'Not specified'}</p>
    </li>
    `;
  });

  return `
    <header>
      <h3>${name || 'Unnamed'}</h3>
      <p>${company || 'Unknown Company'}</p>
    </header>
    <address>
      ${address || 'Address not available'}<br>
      ${postalCode || ''} ${city || ''}<br>
      ${phone || 'Phone number not available'}<br>
    </address>
    <div>
      <h3>Today's Menu</h3>
      <ul>
        ${listaHTML || '<p>No menu available</p>'}
      </ul>
    </div>
  `;
};

export {restaurantRow, restaurantModal};
