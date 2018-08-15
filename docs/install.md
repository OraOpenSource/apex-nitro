# APEX Nitro Installation

## System Requirements

- [Node.js](https://nodejs.org) _>= v6_
- [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) _>= v17.2 (optional, used in the [publish feature](publish.md))_

## Install

APEX Nitro leverages `npm` (the node package manager) for installation. Execute the following on your command line to install APEX Nitro:

```bash
npm install -g apex-nitro
```

_You might encounter a few deprecation warnings during the installation. This is normal and we monitor these packages upon every release of APEX Nitro._

Notes on the command above:

- `npm install` tells that we are about to install a module from the node package registry.
- `-g` tells that we are installing the following package **globally**.
- `apex-nitro` is the name of the package we are about to install.

## Troubleshooting

Having problems installing APEX Nitro? Look at the most common issues below.

### Peer Dependencies

Example:

> /usr/local/bin/apex-nitro -> /usr/local/lib/node_modules/apex-nitro/bin/apex-nitro.js
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.

This is a warning that we'd like to suppress during the installation, but it's not possible at the moment due to npm mechanics. It's normal and does not affect APEX Nitro features.

### Windows

1. C++ library required. A dependency of APEX Nitro (Browsersync) requires C++ runtime libraries.

  You might run into issues when installing on Windows if you don't have them.

  **As far as we've tested, these are just warnings and do not affect APEX Nitro.**

  As instructed by [Browsersync](https://www.browsersync.io/docs/#windows-users):

  > The way to resolve this is to install Visual Studio. At the time of this writing (Feb 2015) the compilation works fine with Visual Studio 2013 Update 4. After installation of Visual Studio npm should not throw errors any longer, but only issue warnings.

  **Feel free to install Visual Studio or not.** If you do, these errors/warnings will disappear.

### Linux / macOS

1. Permission issues during installation If you run into permission issues when installing, execute this instead:

  ```
  sudo npm install -g apex-nitro
  ```

2. Issue related to node-sass If you installed node from the package manager, you may run into issues when installing `apex-nitro` - and in particular, for one of the node dependencies `node-sass`. The reason for this is that this package tries to run a node script using the `node` command, rather than `nodejs`. To get around this, we need a binary for `node` on the classpath - we can create a symbolic link for `/usr/bin/node` that points to `/usr/bin/nodejs`.

  The package `nodejs` installs the node binary to `nodejs`.

  ```bash
  $ sudo apt-get install nodejs npm
  $ dpkg -L nodejs | grep /bin
  /usr/bin
  /usr/bin/nodejs
  ```

  So, when attempting to install `node-sass`, you are presented with an error preventing the installation succeeding.

  ```bash
  $ npm install node-sass
  npm WARN deprecated npmconf@2.1.2: this package has been reintegrated into npm and is now out of date with respect to npm

  > node-sass@3.5.3 install /tmp/node_modules/node-sass
  > node scripts/install.js

  sh: 1: node: not found
  ```

  As you can see, the installation is attempting to call `node script/install.js`, but when no `node` command is found, it can not complete.

  Add a symbolic link for `node`.

  ```
  $ sudo ln -s /usr/bin/nodejs /usr/bin/node
  $ #Verify node on the classpath
  $ which node
  /usr/bin/node
  ```

  Now, the installation of `node-sass` should complete without issues, and allow a successful installation of `apex-nitro`.
