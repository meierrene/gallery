import * as config from './config.js';

let defaultLocale = navigator.language || navigator.userLanguage;

config.year.textContent = config.now.getFullYear();
config.date.textContent = Intl.DateTimeFormat(
  defaultLocale,
  config.options
).format(config.now);

config.flags.addEventListener('click', e => {
  const btn = e.target.closest('.flag-btn');
  if (!btn) return;
  const prevLocale = defaultLocale;
  defaultLocale = btn.getAttribute('alt');
  setText(prevLocale, defaultLocale);
});

config.secretBtn.addEventListener('click', () => {
  if (config.secretBtn.checked) {
    config.column3.classList.remove('hidden');
    config.column4.classList.remove('hidden');
  } else {
    config.column3.classList.add('hidden');
    config.column4.classList.add('hidden');
  }
});

const setText = async (prevLocale, newLocale = defaultLocale) => {
  translate.from = prevLocale.split('-')[0];
  const lang = newLocale.split('-')[0];
  config.h1.textContent = await translate(config.h1.textContent, lang);
  config.h2.textContent = await translate(config.h2.textContent, lang);
  config.title1.textContent = await translate(config.title1.textContent, lang);
  config.title2.textContent = await translate(config.title2.textContent, lang);
  config.title3.textContent = await translate(config.title3.textContent, lang);
  config.title4.textContent = await translate(config.title4.textContent, lang);
  config.footer.textContent = await translate(config.footer.textContent, lang);
};

setText(defaultLocale);
