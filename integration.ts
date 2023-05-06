import type {AstroIntegration} from 'astro';

export default function integration(): AstroIntegration | undefined {
  if (process.env.ROUTE) {
    return {
      name: 'ISR',
      hooks: {
        'astro:build:setup': ({pages}) => {
          pages.forEach(({route: page}, pageKey) => {
            if (page.route !== process.env.ROUTE) {
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
