#!/usr/bin/env node

var fs = require('fs');
var child = require('child_process');
var github = require('githubhook')({
  'path': '/',
  'port': process.env.PORT,
  'secret': process.env.SECRET,
  'logger': console
});

function usage() {
  console.log("Usage: %s </path/to/repo> [</path/to/post-deploy.sh>]", process.argv[1]);
  process.exit(1);
}

var dir = process.argv[2];

if (!dir) {
 usage();
}

fs.stat(dir, function(err, stats) {
  // dir must exist
  if (err) {
    console.error(err);
    usage();
  }

  // dir must be git repo
  fs.stat(dir + '/.git', function(err, stats) {
    if (err) {
      console.error(dir, 'is not a git repo');
      usage();
    }
  });
});

var script = process.argv[3];

// script must be executable
if (script) {
  fs.stat(script, function(err, stats) {

    if ( ! (stats.mode & 0100) ) {
      console.error(script, 'is not executable');
      process.exit(1);
    }
  });
}

github.listen();
github.on('deployment', function(repo, ref, data) {
  // TODO: Check repo is the repo in dir
  var sha = data.deployment.sha;

  var command = 'git fetch && git checkout ' + sha;
  child.exec(command, { cwd: dir }, function(err, stdout, stderr) {
    if (err) {
      console.error(err);
    } else {
      console.error(stderr);
      console.log(stdout);

      if (script) {
        child.execFile(script, { cwd: dir }, function(err, stdout, stderr) {
          if (err) {
            console.error(err);
          } else {
            console.error(stderr);
            console.log(stdout);
          }
        });
      }
    }
  });
});
