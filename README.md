# Import

```ts
import {defineConfig} from 'astro/config';
import ISR from 'isr/integration.ts';

export default defineConfig({
  integrations: [
    ISR(),
    // rest...
  ],
});
```

# Usage

### Code:

```ts
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  if (process.env.ROUTE === '/blog/[slug]' && process.env.PARAMS) {
    //                        eg. '{"slug":"chuj"}'
    const params = JSON.parse(process.env.PARAMS!);

    // fetch blog post from database...

    return [{params}];
  }

  return [{params: {slug: ''}}];
}
```

### CLI:

```bash
# full project build
$ yarn build

# single page build (getStaticPaths unchanged)
$ ROUTE='/' yarn build

# single page build (getStaticPaths modified)
$ ROUTE='/blog/[slug]' PARAMS='{"slug":""}' yarn build
```
