# Github Auto Deploy

## Overview

Usage: `gad </path/to/repo> [</path/to/post-deploy.sh>]

`github-auto-deploy` runs a small node webserver that responds to deployment requests from Github and updates the local repository.
A post-deploy script can also be used to finish a deployment after code has been updated.

## Example

```
PORT=1234 SECRET="Swifty4Lyfe" gad /var/app /var/app/bin/deploy.sh
```

## Configuration

The webserver can be configured with some environmental variables.

`PORT` - The port that the server runs on. Default: 3420
`SECRET` - The webhook secret. Default: none
