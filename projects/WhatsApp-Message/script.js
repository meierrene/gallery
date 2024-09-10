'use strict';

const countryCode = document.querySelector('.country-code');
const regionCode = document.querySelector('.region-code');
const phoneNumber = document.querySelector('.phone-number');
const sendBtn = document.querySelector('.send-btn');
const aCountry = document.querySelector('.aCountry');
const APIADDRESS = 'https://restcountries.com/v3.1/all';

const getCode = async () => {
  try {
    const res = await fetch(APIADDRESS);
    const data = await res.json();

    const code = countryCode.value;
    if (code) {
      const countryData = data.find(d => {
        const idd =
          d.idd && d.idd.root && d.idd.suffixes
            ? d.idd.root + d.idd.suffixes
            : '';
        return idd === code;
      });

      if (countryData) {
        renderCountry(countryData.cca3, countryData.flags.svg);
      } else {
        aCountry.innerHTML = '<p>Country not found</p>';
        aCountry.classList.remove('hidden');
      }
    }
  } catch (err) {
    console.error('Error fetching country data:', err);
  }
};

const renderCountry = (country, flag) => {
  aCountry.innerHTML = `<div class="flex-icon"><p>${country}</p><img src="${flag}" alt="Flag of ${country}"></div>`;
  aCountry.classList.remove('hidden');
};

countryCode.addEventListener('focusout', getCode);

sendBtn.addEventListener('click', () => {
  const phone = `${countryCode.value}${regionCode.value}${phoneNumber.value}`;
  if (phone.length > 0) {
    document.querySelector('.form').action = `https://wa.me/${phone}`;
  } else {
    alert('Please fill in all fields before sending.');
  }
});

document.querySelector('.aYear').textContent = new Date().getFullYear();
