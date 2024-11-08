import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Settings } from 'luxon';
import { createRoot } from 'react-dom/client';

import '../css/app.css';
import './bootstrap';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText ||
  'Panda Wonosobo';

Settings.defaultLocale = 'id';

createInertiaApp({
  title: (title) => `${title} • ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
