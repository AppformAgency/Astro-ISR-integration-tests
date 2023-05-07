import {defineConfig} from 'astro/config';

import ISR from '../isr/integration';

export default defineConfig({
  build: {
    format: 'file',
  },
  integrations: [ISR()],
});
