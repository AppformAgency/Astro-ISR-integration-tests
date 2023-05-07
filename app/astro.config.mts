import {defineConfig} from 'astro/config';

import ISR from '../package/integration';

export default defineConfig({
  build: {
    format: 'file',
  },
  integrations: [ISR()],
});
