import { onThemeInit } from './modules/theme.js';

function handleDocumentLoad(e) {
  onThemeInit();
}

document.addEventListener('DOMContentLoaded', handleDocumentLoad);
