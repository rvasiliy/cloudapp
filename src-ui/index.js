import * as Sentry from '@sentry/browser';
import App from './app.js';

import './styles.css';

Sentry.init({
  dsn: 'https://e4ce91c8ee6541816d15d5e06e4c0857@o4507616325074944.ingest.de.sentry.io/4507629320667216',
  integrations: [],
});

const app = new App();
app.mount(document.querySelector('#app'));
