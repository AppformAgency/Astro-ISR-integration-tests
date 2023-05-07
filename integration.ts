import type {AstroIntegration} from 'astro';

import {ENV} from './utils';

export default function integration(): AstroIntegration | undefined {
  if (ENV.route) {
    return {
      name: 'ISR',
      hooks: {
        'astro:build:setup': ({pages}) => {
          const routeData = pages.get(ENV.route!);

          pages.clear();
          pages.set(ENV.route!, routeData!);
        },

        'astro:build:done': ({pages}) => {
          const [page] = pages;

          const filePathname = './dist/' + page.pathname + 'index.html';

          // do something
        },
      },
    };
  }
}
