# antell-lunchmenu-flowdock
Antell lunchmenu integration for Flowdock.

![Screenshot](https://user-images.githubusercontent.com/21111572/27684153-5fb11bbc-5cd1-11e7-9c69-459d5ddcdf8f.png)

## Command line arguments
This script makes use of command line arguments to configure the behavior.

```
Options:
  -u, --url   url of the lunch list                          [string] [required]
  -f, --flow  flow source token of the target flow           [string] [required]
  -t, --tags  tags of the message sent                                   [array]
  --help      Show help                                                [boolean]
```

Example:

```
npm run lunchmenu -- \
-f 1234567895154e309bf72f5123456789 \
-u http://www.antell.fi/lounaslistat/lounaslista.html?owner=112 \
-t #lunch_menu #antell
```

Note: when running via `npm run`, the `--` after the script name (lunchmenu) is required so that `npm` realizes that you're not trying to pass the args to *it*.

## Setting up the integration
Setting up this integration requires:

1. A server for the integration to run on at scheduled intervals
2. A Flowdock source flow token
3. A scheduler which runs the script every morning

### tl;dr if you know what you're doing
* `git clone && cd antell-lunchmenu-flowdock && npm i`
* Create flowdock app, get (source) token for your flow
* run `npm run lunchmenu -- <args>` every morning, see args in *Command line arguments*

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
   2. Deploy the project in the *Manual deployment* section
   3. In the **Resources tab**, disable the `web` dyno. This is created by Heroku by default but we don't use it.
4. Set up the Heroku scheduler
   - Go to the **Resources** tab and enable the "Heroku Scheduler" add-on. Schedule the following command: `npm run lunchmenu -- <args>` where <args> are the arguments as seen below in *Command line arguments*
5. Done!

## License
antell-lunchmenu-flowdock is licensed under the MIT license. See LICENSE.
