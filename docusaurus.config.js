// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// Dotenv is a zero-dependency module that loads environment
// variables from a .env file into process.env
import "dotenv/config";

// GitHub Settings to setup repository and branch customFields
const vars = require("./variables");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "45B - Cardano Enablement",
  tagline: "Onboarding the world to Web3",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://45b.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "45B - Cardano Enablement",
  projectName: "45b-io",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  onBrokenAnchors: "warn",

  customFields: {
    repository: `${vars.repository}`,
    branch: `${vars.branch}`,

    // put your blockfrost id in your .env file
    REACT_APP_BLOCKFROST_APP_PROJECT_ID:
      process.env.REACT_APP_BLOCKFROST_APP_PROJECT_ID,
  },
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: `${vars.repository}/edit/${vars.branch}`,
        },
        blog: {
          showReadingTime: false,
          routeBasePath: "news",
          blogSidebarCount: 50,
          editUrl: `${vars.repository}/edit/${vars.branch}`,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        // gtag: {
        //   // don't be evil
        //   trackingID: "GTM-5BC4HH7",
        //   anonymizeIP: true,
        // },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // The project's social card
      image: "img/og/default.jpg",
      navbar: {
        logo: {
          alt: "45B Logo",
          src: "img/45b-logo-light.svg",
          srcDark: "img/45b-logo-dark.svg",
        },
        items: [
          {
            /*to: '/learn', TODO*/
            label: "Learn",
            position: "left",
            items: [
              { to: "/web3", label: "Web3 Workshops" },
              // { to: "/discover-cardano", label: "Discover Cardano" },
              // { to: "/what-is-ada", label: "What is ada?" },
              // { to: "/what-is-ada#wallets", label: "Find Cardano wallets" },
              // // { to: "/where-to-get-ada", label: "Where to get ada?" },
              // { to: "/stake-pool-delegation", label: "Delegate your stake" },
              // // { to: "/stake-pool-operation", label: "Operate a stake pool" },
              // { to: "/governance", label: "Participate in governance" },
              // // { to: "/ouroboros", label: "What is Ouroboros?" },
              // { to: "/hardforks", label: "Which hard forks were there?" },
              // { to: "/genesis", label: "About Genesis Distribution" },
              // {
              //   href: "https://explorer.cardano.org",
              //   label: "Explore the Cardano blockchain",
              // },
            ],
          },
          // {
          //   /*to: '/community', TODO*/
          //   label: "Community",
          //   position: "left",
          //   items: [
          //     { to: "/community-code-of-conduct", label: "Code of Conduct" },
          //     { to: "/ambassadors", label: "Cardano Ambassadors" },
          //     { to: "/newsletter", label: "Newsletter" },
          //     { to: "/#follow", label: "Follow Cardano" },
          //     { href: "https://forum.cardano.org", label: "Cardano Forum" },
          //     {
          //       href: "https://forum.cardano.org/t/cardano-stay-safe-series-official-community-channel-list/20046",
          //       label: "Social Channels",
          //     },
          //   ],
          // },
          // {
          //   /* to: '/developers', TODO*/
          //   label: "Developers",
          //   position: "left",
          //   items: [
          //     { to: "/developers", label: "Start building on Cardano" },
          //     { to: "/research", label: "Cardano Research" },
          //     { to: "/exchanges", label: "Integrate Cardano" },
          //   ],
          // },
          {
            to: "/enterprise",
            label: "Industries",
            position: "left",
            items: [
              { to: "/enterprise#education", label: "Education" },
              { to: "/enterprise#retail", label: "Retail" },
              { to: "/enterprise#agriculture", label: "Agriculture" },
              { to: "/enterprise#government", label: "Government" },
              { to: "/enterprise#finance", label: "Finance" },
              { to: "/enterprise#healthcare", label: "Health Care" },
            ],
          },
          // {
          //   label: "About",
          //   position: "left",
          //   items: [{ to: "/team", label: "Team" }],
          // },
          /* we may want to hide this, and link it only via localhost link in the read me */
          /*
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          */
          // {
          //   to: "/news",
          //   label: "News",
          //   position: "left",
          //   items: [
          //     { to: "/news", label: "All Articles (Chronological)" },
          //     { to: "/news/tags/community-digest", label: "Community Digest" },
          //     { to: "/news/tags/education", label: "Education" },
          //     { to: "/news/tags/development", label: "Development" },
          //     { to: "/news/tags/governance", label: "Governance" },
          //     { to: "/news/tags/scaling", label: "Scaling" },
          //     { to: "/news/tags", label: "View Tags" },
          //   ],
          // },
          // {
          //   href: `${vars.repository}`,
          //   position: "right",
          //   className: "header-github-link",
          // },
        ],
      },
      // footer: {
      //   style: "dark",
      //   links: [
      //     /* we may want to hide this, and link it only via localhost link in the read me */
      //     /*
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     */
      //     {
      //       title: "Entities",
      //       items: [
      //         {
      //           label: "Cardano Foundation",
      //           to: "/entities?tab=cardanofoundation",
      //         },
      //         {
      //           label: "EMURGO",
      //           to: "/entities?tab=emurgo",
      //         },
      //         {
      //           label: "Input Output",
      //           href: "/entities?tab=iog",
      //         },
      //         {
      //           label: "Intersect",
      //           href: "/entities?tab=intersect",
      //         },
      //         {
      //           label: "PRAGMA",
      //           href: "/entities?tab=pragma",
      //         },
      //         {
      //           label: "More entities",
      //           href: "/entities/#companies",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Support",
      //       items: [
      //         {
      //           label: "Brand Assets",
      //           to: "/brand-assets",
      //         },
      //         {
      //           label: "Contact",
      //           to: "/contact",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Legal",
      //       items: [
      //         {
      //           label: "Terms",
      //           href: "https://cardanofoundation.org/en/terms-and-conditions",
      //         },
      //         {
      //           label: "Privacy Policy",
      //           href: "https://cardanofoundation.org/en/privacy",
      //         },
      //         /* TODO: once we have these files, link locally not to the cf page
      //         {
      //           label: 'Terms',
      //           to: '/terms-and-conditions',
      //         },
      //         {
      //           label: 'Privacy Policy',
      //           to: '/privacy-policy',
      //         },
      //         {
      //           label: 'Cookie Policy',
      //           to: '/cookie-policy',
      //         },
      //         */
      //       ],
      //     },
      //     {
      //       title: "More",
      //       items: [
      //         {
      //           label: "Cardano News",
      //           to: "/news",
      //         },
      //         {
      //           label: "Contribute",
      //           to: "/docs/",
      //         },
      //         {
      //           label: "Contributors",
      //           href: "https://github.com/cardano-foundation/cardano-org/graphs/contributors",
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `® B45`,
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      // Announcement Bar
      // id: always change it when changing the announcement
      // backgroundColor: use #1442B3 for announcements
      // announcementBar: {
      //   id: "announcement_index1", // Any value that will identify this message + increment the number every time to be unique
      //   content:
      //     `<strong>Join the Cardano Summit 2024 in Dubai on 23-24 October. ⭐️<a target="_blank" rel="noopener noreferrer" href="https://summit.cardano.org?ref=corg">Get Tickets!</a></strong>`,
      //   backgroundColor: "#1442B3",
      //   textColor: "#FFFFFF", // Use #FFFFFF
      //   isCloseable: true, // Use true
      // },

      head: [
        // ...
        {
          tagName: "link",
          attributes: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css?family=Chivo", // replace with your font URL
          },
        },
      ],
    }),

  // Custom JavaScript that will be injected into the <head> section of every page
  scripts: [
    {
      src: "/scripts/deactivateServiceWorker.js",
      async: true,
    },
  ],
};

export default config;
