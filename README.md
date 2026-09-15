# Website

Welcome to the cardano.org website. We believe that this website should be managed by a collective and not a single entity. For this to be successful, the website relies on your contributions.  

 **This is the initial launch of cardano.org as open source project.** 

To achieve this, the entire site was rewritten, focusing on the technology stack rather than the content. We have maintained most of the original content for now to ensure it remains accessible. However, several significant day-one improvements compared to the old site should be highlighted:

- Rewritten using the Docusaurus stack (the same as developers.cardano.org).
- The staging branch deploys at https://new-cardano-org-staging.netlify.app/, and the main branch deploys at https://cardano.org/.
- Documentation on adding content can be found at https://cardano.org/docs/tutorial/create-a-page (work in progress).
- Added Cardano-relevant research papers and specifications at https://cardano.org/research.
- Replaced the unclear and confusing black overlay menu according to feedback. Ensured that every page is accessible through the new menus above, addressing a previous navigation issue.
- Improved the news section, increasing visibility for many entities, now with tags, an RSS feed, collaborative features for news articles, embedded videos, and other enhancements.
- Created a dedicated page for the Cardano code of conduct at https://cardano.org/community-code-of-conduct.
- Reworked the Ambassador Program page at https://cardano.org/ambassadors. (not all have yet agreed to be listed there)
- The Genesis page no longer relies on external sites and can be accessed at https://cardano.org/genesis.
- Added 'Intersect' the member based organisation.
- Additionally, dark mode is now available.

## Requirements

[Node.js](https://nodejs.org/en/download/) version >= 18.0
[Yarn](https://yarnpkg.com/en/) version >= 1.22  
On macOS you also need Xcode and Command Line Tools.

# Installation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. This will get you up and running:

## Clone the repo
```
git clone https://github.com/cardano-foundation/cardano-org.git
```
  
## Navigate into the folder
```
cd cardano-org
```

## Install all dependencies
```
yarn install
```

## Start local development

```
yarn start
```

This command starts a local development server and opens up a browser window to http://localhost:3000. Most changes are reflected live without having to restart the server.

To browse the documentation visit http://localhost:3000/docs/.

## Build

```
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service. Always build the site once before firing a pull request as many additional checks are carried out.

## Network testing
```
yarn start --host 0.0.0.0   
```
With this command you are making it listen on all network interfaces (IP addresses) of your computer. This includes the local loopback interface (127.0.0.1 or localhost) and any other network interfaces that can connect your computer to a local network or the internet. Great for testing the site with different devices on your local network.

## Quick util commands

```
cd ~/proj/Web3/45b-website && git push origin develop
```

Push the working branch to GitHub. `develop` is where work happens and what
deploys; `main` is the stable backup.

```
yarn serve
```

Serve the existing `build/` directory locally — the built site, not the dev
server. Use it to check what will actually ship before deploying. Run
`yarn build` first if the build is older than your changes.

```
cd ~/proj/Web3/45b-website && ./deploy-web3.sh --skip-build
```

Deploy the `build/` tree as it stands: diff against `.last-deploy/`, confirm,
upload only what changed, refresh the baseline. `--skip-build` reuses the
existing build, so drop it (plain `./deploy-web3.sh`) whenever the build does
not already include your changes. Uploads are additive — nothing on the host
is ever deleted. See `notes/45b-hosting.md` and `notes/45b-website.md` in the
HQ repo before deploying.

## Logging date time along Terminal history

Logs visually on the terminal:
date; (your command)

Let history command to show time:
export HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S "

How It Works
    Automatic Logging: Once set, Bash automatically records the exact Unix timestamp into your .bash_history file alongside every subsequent command you execute.

    Viewing History: When you run `history`, the timestamps appear right next to the corresponding commands:

Run
history 5
to show the last 5 commands with datetime visible


More info:
Adding Timestamps to Linux Terminal History - Google Gemini - Skywalker
https://gemini.google.com/app/a75e984bffbbe83d

