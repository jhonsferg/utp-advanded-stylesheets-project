function isDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)');
}

function updateThemeButton(theme) {
  let icon = document.querySelector('#theme-toggle > i');
  let currentIcon = icon.getAttribute('class');
  let newIcon = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  icon.setAttribute('class', newIcon);
}

function handleThemeButton(e) {
  // Change document color-scheme
  let html = document.querySelector('html');
  let scheme = html.getAttribute('color-scheme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('color-scheme', scheme);
  localStorage.setItem('color-scheme', scheme);
  // Change toggle button icon
  updateThemeButton(scheme);
}

function loadThemeConfiguration() {
  const theme = localStorage.getItem('color-scheme');
  if (theme === null || !['dark', 'light'].includes(theme)) {
    theme = isDarkMode() ? 'dark' : 'light'
  }

  document.querySelector('html').setAttribute('color-scheme', theme);
  localStorage.setItem('color-scheme', theme);
  updateThemeButton(theme);
}

function registerThemeEvents() {
  document.getElementById("theme-toggle").addEventListener('click', handleThemeButton);
}

export function onThemeInit() {
  loadThemeConfiguration();
  registerThemeEvents();
}
