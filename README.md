# antell-lunchmenu-flowdock
Antell lunchmenu integration for Flowdock.

## Setting up the integration
Setting up this integration requires:

1. A server for the integration to run on at scheduled intervals
2. A Flowdock source flow token
3. A scheduler which runs the script every morning

### tl;dr if you know what you're doing
* `git clone && cd antell-lunchmenu-flowdock && npm i`
* Create flowdock app, get (source) token for your flow
* Set up env vars (.env file), see section in this readme
* run `npm run lunchmenu` every morning

### Hosting on Heroku for free
The easiest way to host the integration is to [create a free Heroku dyno](https://signup.heroku.com/) with all dynos scaled to zero.
[Heroku's free tier](https://www.heroku.com/free) offers 1000 hours of dyno uptime per month.
This integration only runs during scheduled intervals for a few seconds, meaning that the free tier is more than enough.

### Steps

1. Fork this repository to your Github account
2. Create a new developer application in Flowdock - https://www.flowdock.com/oauth/applications
   1. Create the app, tick **Shortcut application**
   2. Go to your newly created app and **Create a new source** for the flow which you want menus to be sent. It will give you a 32-character *token* - store this and keep it safe. This token lets the script post messages to your flow.
3. Sign up for a Heroku account and create a new personal app - https://signup.heroku.com/
   1. In the **Deploy** tab, choose Github as the *Deployment method*, then choose the repository you just forked
   2. Go to the **Settings** tab, reveal the config vars in *Config Variables*, and set up the configuration according to the *Environmental variables* section of this README
   3. In the **Deploy** tab, deploy the project in the *Manual deployment* section
   4. In the **Resources tab**, disable the `web` dyno. This is created by Heroku by default but we don't use it.
4. Set up the Heroku scheduler
   - Go to the **Resources** tab and enable the "Heroku Scheduler" add-on. Schedule the following command: `npm run lunchmenu`
5. Done!

## Environmental variables
This script makes use of environmental variables to configure the flowdock source flow tokens and the Antell website URL.

| Variable name | Value |
|---------------|-------|
| `ANTELL_MENU_URL` | The address of the lunch menu, e.g. http://www.antell.fi/lounaslistat/lounaslista.html?owner=112 |
| `FLOWDOCK_FLOW_TOKENS` | Comma separated array of the tokens of the flows to which you want lunch menus sent |

### Example `.env`

```sh
ANTELL_MENU_URL=http://www.antell.fi/lounaslistat/lounaslista.html?owner=112
FLOWDOCK_FLOW_TOKENS=dd03287fa5154e309bf72f57390d5d2a,f4888feac07b44398f5f4a06b85a6477
```

## License
antell-lunchmenu-flowdock is licensed under the MIT license. See LICENSE.
