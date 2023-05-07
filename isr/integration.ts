import type {AstroIntegration} from 'astro';

import {ENV} from './utils';

export default function integration(): AstroIntegration | undefined {
  if (ENV.route) {
    return {
      name: 'ISR',
      hooks: {
        'astro:build:setup': ({pages}) => {
          pages.forEach(({route: page}, pageKey) => {
            if (page.route !== ENV.route) {
              pages.delete(pageKey);
            }
          });
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
