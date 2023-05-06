# Install

```bash
$ yarn add -D git+https://github.com/AppformAgency/Astro-ISR-Integration
```

# Import

```ts
import {defineConfig} from 'astro/config';

import ISR from 'astro/isr';

export default defineConfig({
  integrations: [ISR()],
});
```

# Usage

### Code:

```ts
// src/pages/blog/[slug].astro
import type {GetStaticPaths} from 'astro';
import {ENV, parseParams} from 'astro/isr/utils';

type Params = {
  slug: string;
};

export const getStaticPaths = (async () => {
  if (ENV.route === '/blog/[slug]' && ENV.params) {
    const params = parseParams() as Params;

    // fetch blog post from database...

    return [];
  }

  // fetch all blog posts

  return [];
}) satisfies GetStaticPaths;

const {slug} = Astro.params as Params;
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
