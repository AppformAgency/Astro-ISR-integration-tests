import {$, cd} from 'zx';
import {glob} from 'glob';

describe('Astro build', () => {
  afterEach(async () => {
    cd('../app');

    await $`rm -rf dist/`;
  });

  test('full project build', async () => {
    cd('../app');
    await $`npm run build`;

    const files = await glob('../app/dist/**/*.html');

    expect(files).toEqual([
      'dist/index.html',
      'dist/blog/post-3.html',
      'dist/blog/post-2.html',
      'dist/blog/post-1.html',
    ]);
  });

  describe('single route build', () => {
    test("creates only index.html (ROUTE='/')", async () => {
      process.env.ROUTE = '/';

      cd('../app');
      await $`npm run build`;

      const files = await glob('../app/dist/**/*.html');

      expect(files).toEqual(['dist/index.html']);
    });

    test("creates three blog posts (ROUTE='/blog/[slug]')", async () => {
      process.env.ROUTE = '/blog/[slug]';

      cd('../app');
      await $`npm run build`;

      const files = await glob('../app/dist/**/*.html');

      expect(files).toEqual([
        'dist/blog/post-3.html',
        'dist/blog/post-2.html',
        'dist/blog/post-1.html',
      ]);
    });
  });

  test('single route build (with getStaticPath changed)', async () => {
    process.env.ROUTE = '/blog/[slug]';
    process.env.PARAMS = JSON.stringify({slug: 'post-4'});

    cd('../app');
    await $`npm run build`;

    const files = await glob('../app/dist/**/*.html');

    expect(files).toEqual(['dist/blog/post-4.html']);
  });
});
