import React from 'react';
import Head from '@docusaurus/Head';

const OpenGraphImage = ({ pageName }) => {

  // open graph images needs to be in the "og" folder + .jpg
  // we currently do not distinguish between og:image and twitter:image
  
  // Absolute URL on 45b.io: social scrapers do not resolve relative paths, and
  // this used to point at cardano.org (a leftover from the fork), which served
  // every one of 45B's social previews off someone else's domain.
  const imageUrl = `https://45b.io/img/og/${pageName}.jpg`;

  return (
    <Head>
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default OpenGraphImage;