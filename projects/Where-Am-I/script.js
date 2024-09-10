'use strict';

const btn = document.querySelector('.btn-country');
const backBtn = document.querySelector('.btn-back');
const countriesContainer = document.querySelector('.countries');
const address = document.querySelector('.address');
const mainMenu = document.querySelector('.form__row');
const getLat = document.querySelector('.input--latitude');
const getLon = document.querySelector('.input--longitude');

///////////////////////////////////////

getLat.focus();

const renderCountry = function (data, className = '', i) {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
  ${className ? `<p class="country__row">Neighbour ${i + 1}</p>` : ''}
       <h3 class="country__name">${data.name.common}</h3>
       <h4 class="country__region">${data.region}</h4>
       <p class="country__row"><span>🏙️</span>${data.capital[0]}</p>
       <p class="country__row"><span>👫</span>${(
         +data.population / 1000000
       ).toFixed(1)} M people</p>
       <p class="country__row"><span>🗣️</span>${
         data.languages[Object.keys(data.languages)[0]]
       }</p>
       <p class="country__row"><span>💰</span>${
         data.currencies[Object.keys(data.currencies)[0]].name
       }</p>
       <p class="country__row"><span>🌐</span>${(+data.area / 1000).toFixed(
         1
       )} km²</p>
       </div>
   </article>
   `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

let assignedCountry = '';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

btn.addEventListener('click', function () {
  btn.classList.add('hidden');
  mainMenu.classList.add('hidden');
  address.classList.remove('hidden');
  backBtn.classList.remove('hidden');
  whereAmI(getLat.value, getLon.value);
  // whereAmI(50.9602, 7.1133); // Ropipi
  // whereAmI(48, -190); // Error
});

backBtn.addEventListener('click', function () {
  getLat.value = getLon.value = '';
  address.textContent = 'Searching address...';
  countriesContainer.style.opacity = 0;
  btn.classList.remove('hidden');
  mainMenu.classList.remove('hidden');
  address.classList.add('hidden');
  backBtn.classList.add('hidden');
  countriesContainer.innerHTML = `
  <div class="countries">
  </div>`;
  getLat.focus();
});

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (lat, lon) {
  try {
    // Geolocation
    const pos = await getPosition();

    if (!lat || !lon) {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    }

    const resGeo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=1a0b9f352f7543deaa65477098c4ec8e`
    );
    if (!resGeo.ok) throw new Error(`Problem getting location data`);

    const dataGeo = await resGeo.json();
    assignedCountry = dataGeo.features[0].properties.country;

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${assignedCountry}`
    );

    if (!res.ok) throw new Error(`Problem getting country`);

    const data = await res.json();

    renderCountry(data[0]);

    const neighbours = data[0].borders;

    if (neighbours) {
      neighbours.forEach(async (country, i) => {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${country}`
        );
        if (!res.ok) throw new Error(`Problem getting neighbour country`);

        const data = await res.json();
        renderCountry(data[0], 'neighbour', i);
      });
    }

    const text = `You are in ${dataGeo.features[0].properties.address_line1} ${
      dataGeo.features[0].properties.address_line2
    }. ${
      neighbours
        ? ` Which has ${neighbours.length} neighbour countr${
            neighbours.length === 1 ? 'y' : 'ies'
          }`
        : ''
    }
    `;

    address.textContent = text;
    countriesContainer.style.opacity = 1;

    return `You are in ${dataGeo.features[0].properties.city}, ${assignedCountry}`;
  } catch (err) {
    console.error(`${err}💥`);
    address.textContent = `${err}. Please select a valid coordenate or try again later.`;
    renderError(`💥 ${err.message}`);
    throw err;
  }
};

document.querySelector('.aYear').innerHTML = new Date().getFullYear();

// 92 8417 4665 BiaMAO
