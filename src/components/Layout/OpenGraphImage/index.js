import React from 'react';
import Head from '@docusaurus/Head';

const OpenGraphImage = ({ pageName, fileName }) => {

  // open graph images needs to be in the "og" folder + .jpg
  // we currently do not distinguish between og:image and twitter:image
  //
  // twitter:image is emitted with `name`, not `property`: the site-wide
  // default in docusaurus.config.js uses `name`, and Helmet only dedupes
  // tags that match on the same attribute — with `property` both survived
  // and Twitter read the default, not the page's own image.
  
  // Absolute URL on 45b.io: social scrapers do not resolve relative paths, and
  // this used to point at cardano.org (a leftover from the fork), which served
  // every one of 45B's social previews off someone else's domain.
  //
  // `fileName` overrides the page-name convention. Social scrapers cache by
  // URL and re-scraping is unreliable (X in particular will keep serving the
  // old thumbnail for a path it has already seen), so when a page's image is
  // replaced, ship it under a new file name rather than overwriting.
  const imageUrl = `https://45b.io/img/og/${fileName || `${pageName}.jpg`}`;

  return (
    <Head>
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default OpenGraphImage;