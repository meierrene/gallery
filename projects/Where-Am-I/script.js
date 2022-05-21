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

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
       <img class="country__img" src="${data.flags.svg}" />
       <div class="country__data">
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

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('germany');

// // Callback Hell (Just avoid them)
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//         setTimeout(() => {
//           console.log('5 second passed');
//           setTimeout(() => {
//             console.log('6 second passed');
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// New way from ES6 feature

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log(data[0]);

//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   // Country 1

//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

let assignedCountry = '';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders;
//       // if (!neighbour) throw new Error('No neighbour found');

//       // // Country 2
//       // return getJSON(
//       //   `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
//       //   'Country not found'
//       // );
//     })
//     // .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getNeighboursData = function (country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country not found'
//   ).then(data => {
//     const neighbour = data[0].borders;
//     if (!neighbour) throw new Error('No neighbour found');
//     neighbour.forEach(neighbourCountry => {
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbourCountry}`,
//         'Country not found'
//       )
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//           console.error(`${err} 💥💥💥`);
//           renderError(
//             `Something went wrong with the neighbours 💥💥 ${err.message}. Try again!`
//           );
//         });
//     });
//   });
// };

btn.addEventListener('click', function () {
  // getCountryData(assignedCountry);
  // getNeighboursData(assignedCountry);
  btn.classList.add('hidden');
  mainMenu.classList.add('hidden');
  address.classList.remove('hidden');
  backBtn.classList.remove('hidden');
  whereAmI(getLat.value, getLon.value);
  // whereAmI(50.9602, 7.1133); // Ropipi
  // whereAmI(48, -190); // Error
  // 92 8417 4665 BiaMAO
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

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function (lat, lon) {
//   getPosition()
//     .then(pos => {
//       if (!lat || !lon) {
//         lat = pos.coords.latitude;
//         lon = pos.coords.longitude;
//       }

//       // const { latitude: lat, longitude: lon } = pos.coords;

//       return fetch(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=1a0b9f352f7543deaa65477098c4ec8e`
//       );
//     })

//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       const text = `You are in ${data.features[0].properties.address_line1} ${data.features[0].properties.address_line2}`;
//       address.textContent = text;
//       assignedCountry = data.features[0].properties.country;
//     })
//     .catch(err => console.error(`${err.message} 💥`));
// };

// whereAmI(50.9602, 7.1133); // Ropipi

// whereAmI();

// btn.classList.add('hidden');

//-----------------------------------------------------------------
// //  The Event Loop in Practice

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Rosolved promise 1').then(res => console.log(res));
// Promise.resolve('Rosolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

//-----------------------------------------------------------------
// // Building a Simple Promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening ');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('5 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('6 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('7 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 8 seconds'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

//-----------------------------------------------------------------
// // Exercise 2

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error(`Image not found`));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err.message));
//-----------------------------------------------------------------

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Only with async/await
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

    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
    //   console.log(res)
    // );

    // Can be used this one instead there's no need to insert .then(...)
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${assignedCountry}`
    );

    if (!res.ok) throw new Error(`Problem getting country`);

    const data = await res.json();

    renderCountry(data[0]);

    const neighbours = data[0].borders;

    if (neighbours) {
      neighbours.forEach(async country => {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${country}`
        );
        if (!res.ok) throw new Error(`Problem getting neighbour country`);

        const data = await res.json();
        renderCountry(data[0], 'neighbour');
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

    // Reject promisse returned from async function
    throw err;
  }
};

// console.log(`1: Will get location`);

// const city = whereAmI();
// console.log(city);

// Even with errors this promisse is fulfilled

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log(`3: Finished getting location`));

// The new way

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log(`3: Finished getting location`);
// })();

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital[0]));
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3Countries('portugal', 'usag', 'iceland');

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/norway`),
//     getJSON(`https://restcountries.com/v3.1/name/sweden`),
//     getJSON(`https://restcountries.com/v3.1/name/finland`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/iceland`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // New from ES2020

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res));

// // New from ES2021

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res));
//-----------------------------------------------------------------
// // Exercise 3

// btn.classList.add('hidden');

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error(`Image not found`));
//     });
//   });
// };

// let currentImg;

// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Async image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 2
//     img = await createImage('img/img-2.jpg');
//     console.log('Async image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 3
//     img = await createImage('img/img-3.jpg');
//     console.log('Async image 3 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch {
//     err => console.error(`${err.message}`);
//   }
// };

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     console.log(imgs);

//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//     imgsEl.forEach(img => img.classList.add('parallel'));
//   } catch {
//     err => console.error(`${err.message}`);
//   }
// };

// loadNPause();

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
//-----------------------------------------------------------------
