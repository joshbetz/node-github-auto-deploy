# Github Auto Deploy

## Overview

Usage: `gad </path/to/repo> [</path/to/post-deploy.sh>]`

`github-auto-deploy` runs a small node webserver that responds to deployment requests from Github and updates the local repository.
A post-deploy script can also be used to finish a deployment after code has been updated.

## Example

```
PORT=1234 SECRET="Swifty4Lyfe" gad /var/app /var/app/bin/deploy.sh
```

## Configuration

The webserver can be configured with some environmental variables.

* `PORT` - The port that the server runs on. Default: 3420
* `SECRET` - The webhook secret. Default: none

On Github, you'll need to:

1. Add a 'Github Auto-Deployment' service.
2. Add a webhook that fires on 'deployment' events.
3. If the repo is private, add a deploy key.

Note: By default, the Github Auto-Deployment service will create deployments every time code is pushed to `master`, but can also be configured to deploy on status contexts, like `ci/travis-ci` or `ci/circle-ci`.
