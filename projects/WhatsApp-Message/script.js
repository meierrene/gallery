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
    data.forEach(d => {
      const idd = +(d.idd.root + d.idd.suffixes);
      idd === +countryCode.value ? renderCountry(d.cca3, d.flags.svg) : '';
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const renderCountry = (country, flag) => {
  aCountry.innerHTML = `<div class="flex-icon"><p>${country}</p><img src="${flag}"></div>`;
  aCountry.classList.remove('hidden');
};

countryCode.focus();

countryCode.addEventListener('focusout', getCode);

sendBtn.addEventListener('click', () => {
  document.querySelector(
    '.form'
  ).action = `https://wa.me/${countryCode.value}${regionCode.value}${phoneNumber.value}`;
});

document.querySelector('.aYear').innerHTML = new Date().getFullYear();
