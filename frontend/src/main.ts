import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Load dark mode preference before app starts
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode && JSON.parse(savedDarkMode)) {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

