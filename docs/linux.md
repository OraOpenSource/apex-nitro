## Linux


#### Installation issues
If you run into permission issues when installing, execute this instead:
```
sudo npm install -g apex-frontend-boost
```

#### Other
If you installed node from the package manager, you may run into issues when installing `apex-frontend-boost` - and in particular, for one of the node dependencies `node-sass`. The reason for this is that this package tries to run a node script using the `node` command, rather than `nodejs`. To get around this, we need a binary for `node` on the classpath - we can create a symbolic link for `/usr/bin/node` that points to `/usr/bin/nodejs`.

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

Now, the installation of `node-sass` should complete without a drama, and more broadly, the installation of `apex-frontend-boost`.
