import {$} from 'zx';
import {glob} from 'glob';

describe('Astro build', () => {
  afterAll(async () => {
    await $`rm -rf app/dist/`;
  });

  test('full project build', async () => {
    await $`npm run build`;

    const files = await glob('app/dist/**/*.html');

    expect(files).toEqual([
      'app/dist/index.html',
      'app/dist/blog/post-3.html',
      'app/dist/blog/post-2.html',
      'app/dist/blog/post-1.html',
    ]);
  });

  describe('single route build', () => {
    test("creates only index.html (ROUTE='/')", async () => {
      process.env.ROUTE = '/';

      await $`npm run build`;

      const files = await glob('app/dist/**/*.html');

      expect(files).toEqual(['app/dist/index.html']);
    });

    test("creates three blog posts (ROUTE='/blog/[slug]')", async () => {
      process.env.ROUTE = '/blog/[slug]';

      await $`npm run build`;

      const files = await glob('app/dist/**/*.html');

      expect(files).toEqual([
        'app/dist/blog/post-3.html',
        'app/dist/blog/post-2.html',
        'app/dist/blog/post-1.html',
      ]);
    });
  });

  test('single route build (with getStaticPath changed)', async () => {
    process.env.ROUTE = '/blog/[slug]';
    process.env.PARAMS = JSON.stringify({slug: 'post-4'});

    await $`npm run build`;

    const files = await glob('app/dist/**/*.html');

    expect(files).toEqual(['app/dist/blog/post-4.html']);
  });
});
