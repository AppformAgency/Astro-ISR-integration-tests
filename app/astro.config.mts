import {defineConfig} from 'astro/config';

import ISR from '@astro/isr';

export default defineConfig({
  build: {
    format: 'file',
  },
  integrations: [ISR()],
});
