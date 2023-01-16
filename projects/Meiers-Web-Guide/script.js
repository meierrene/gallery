const flags = document.querySelector('.flags');
const mainTitle = document.querySelector('.main-title');
const mainMenu = document.querySelector('.main-menu');
const title1 = document.querySelector('.column-1-title');
const title2 = document.querySelector('.column-2-title');
const title3 = document.querySelector('.column-3-title');
const title4 = document.querySelector('.column-4-title');
const secretBtn = document.querySelector('.secret-btn');
const footer = document.querySelector('.footer-text');

let defaultLocale = navigator.language || navigator.userLanguage;

document.querySelector('.year').textContent = new Date().getFullYear();

setInterval(() => {
  const now = new Date();
  const options = {
    second: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: 'long',
  };
  document.querySelector('.time-display').textContent = Intl.DateTimeFormat(
    defaultLocale,
    options
  ).format(now);
}, 1000);

flags.addEventListener('click', e => {
  const btn = e.target.closest('.flag-btn');
  if (!btn) return;
  const prevLocale = defaultLocale;
  defaultLocale = btn.getAttribute('alt');
  console.log(defaultLocale);
  setText(prevLocale, defaultLocale);
});

secretBtn.addEventListener('click', () => {
  if (secretBtn.checked) {
    document.querySelector('.column-3').classList.remove('hidden');
    document.querySelector('.column-4').classList.remove('hidden');
  } else {
    document.querySelector('.column-3').classList.add('hidden');
    document.querySelector('.column-4').classList.add('hidden');
  }
});

const setText = async (prevLocale, newLocale = defaultLocale) => {
  translate.from = prevLocale.split('-')[0];
  const lang = newLocale.split('-')[0];
  mainTitle.textContent = await translate(mainTitle.textContent, lang);
  mainMenu.textContent = await translate(mainMenu.textContent, lang);
  title1.textContent = await translate(title1.textContent, lang);
  title2.textContent = await translate(title2.textContent, lang);
  title3.textContent = await translate(title3.textContent, lang);
  title4.textContent = await translate(title4.textContent, lang);
  footer.textContent = await translate(footer.textContent, lang);
};

setText(defaultLocale);
