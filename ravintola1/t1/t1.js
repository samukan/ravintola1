'use strict';
import {restaurantRow, restaurantModal} from './components.js';
import {fetchData} from './utils.js';
import {apiURL} from './variables.js';

const tbody = document.querySelector('tbody');
const modal = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => modal.close());

const renderRestaurants = async () => {
  try {
    const restaurants = await fetchData(`${apiURL}/api/v1/restaurants`);
    restaurants.sort((a, b) => a.name.localeCompare(b.name));

    restaurants.forEach((restaurant) => {
      const row = restaurantRow(restaurant);

      row.addEventListener('click', async () => {
        modal.showModal();
        info.innerHTML = '<div>Loading...</div>';

        document.querySelectorAll('.highlight').forEach((highlightedRow) => {
          highlightedRow.classList.remove('highlight');
        });

        row.classList.add('highlight');

        try {
          const menuData = await fetchData(
            `${apiURL}/api/v1/restaurants/daily/${restaurant._id}/fi`
          );
          info.innerHTML = restaurantModal(restaurant, menuData.courses);
        } catch (menuError) {
          info.innerHTML = `<p>Error fetching the menu: ${menuError.message}</p>`;
        }
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
  }
};

renderRestaurants();
