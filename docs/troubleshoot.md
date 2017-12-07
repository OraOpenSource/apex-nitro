# Troubleshoot
Here are the most common issues people are having.

Please submit an issue on Github if you can't find a solution to your problem.

#### Problems with the command line options?
Run `apex-nitro help`

![](img/apex-nitro-help.png)

#### EPERM: operation not permitted
Sometimes when you are trying to launch a project with `apex-nitro launch <project>`, you might get an error like this:

```
APEX Nitro
is now processing your files...
Error: EPERM: operation not permitted, mkdir 'C:\Users\vmorneau\Project\dist\css'
```

It means your operating system is locking the folder APEX Nitro is trying to delete and recreate. It creates a conflict with the operating system and APEX Nitro is unable to process your files.

It usually happens with you are trying to open the `/dist/` folder yourself. There is no need to open the `/dist/` folder yourself. Only the `/src/` folder is relevant to you.

To fix this, close down any program that might interfere with the `/dist/` folder (example: Windows Explorer, Finder, or your code editor) and start again.

#### Error: Node Sass does not yet support your current environment
Sometimes when you are trying to launch a project with `apex-nitro launch <project>`, you might get an error like this:

```
(node:14488) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (57)
For more information on which environments are supported please see:
https://github.com/sass/node-sass/releases/tag/v3.13.1
(node:14488) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

It is usually related to your Node.js environment that was updated. One of APEX Nitro's dependency (node-sass) sometimes gets corrupted. This is a known issue for node-sass.

The solution is simple: just run `npm rebuild -g node-sass` and try again.

Reference: https://github.com/sass/node-sass/issues/1764

#### Unable to publish files
APEX Nitro allows you to automatically publish your files to APEX using this command: `apex-nitro publish <project>`

This is achievable only if you have configured SQLcl properly in your APEX Nitro configuration.

Start by reviewing your configuration using this command: `apex-nitro config <project>`

Look for a section called SQLcl and fill out the fields. You will need to have SQLcl locally on your system. No need to install anything, just point the SQLcl directory to the appropriate field of the APEX Nitro configuration.

This section is inspired by SQL Developer, and allows you to enter your database information using 4 different methods:
1- with SID
2- with Service Name
3- with TNS
4- custom connect string

APEX Nitro doesn't provide any way of validating your connection info. Please validate it yourself in SQL Developer if `apex-nitro publish <project>` doesn't work.

#### APEX application doesn't pick up the changes from local files
APEX Nitro uses an HTTP header variable to communicate between the local files and the APEX application (with web sockets).

When APEX Nitro is launched, [this part](https://github.com/OraOpenSource/apex-nitro/blob/master/lib/gulp/browsersync.js#L21) initializes the HTTP variable. Unfortunately, this is not supported on an HTTP server from Oracle Forms (Weblogic).

See https://github.com/OraOpenSource/apex-nitro/issues/223 for more details.

#### How to use APEX Nitro in a team of developers
If you have tried APEX Nitro, you may have noticed that your APEX application picks up the files from your local machine. So how do you work as a team with APEX Nitro, since your teammates don't share the same files as you?

Let's assume that you are using a version control system, like Git or SVN. Your repository tree should look similar to this:
```
|-/my_project/
	|-/apex/
		|-/f12192.sql
	|-/packages/
		|-/my_pkg.pks
		|-/my_pkg.pkb
	|-/views/
		|-/my_view.sql
	|-/www/
		|-/src/
			|-css/
				|-header.css
				|-footer.css
			|-js/
				|-p10.js
				|-p20.js
			|-img/
				|-background.png
				|-logo.png
		|-/dist/
			|-css/
				|-app.css
				|-app.min.css
			|-js/
				|-app.js
				|-app.min.js
			|-img/
				|-background.png
				|-logo.png
```

From a structural perspective
- `/my_project/www/src/` is where you do the coding.
- `/my_project/www/dist/` is what's being exposed to your APEX application.

To work as a team, here's the typical workflow:
1. Have everyone on the team install and configure APEX Nitro.
2. The configuration file can be exported and shared when running `apex-nitro config my_project`. Teammates can import your configuration file.
3. Have everyone launch APEX Nitro when they are working on the project.
4. Make your version control system (Git or SVN) **ignore** `/my_project/www/dist/`. The `/my_project/www/dist/` folder should not be committed. Only the `/my_project/www/src/` has to be committed.
5. During your own development cycle, you make changes to any files you want within `/my_project/www/src/` and you will be the only one seeing those changes in your APEX application, as long as you don't commit `/my_project/www/src/`.
6. Commit `/my_project/www/src/` when you think the changes are ready and stable.
7. Teammates can update their project repository.
8. Teammates APEX Nitro will automatically pick up the updated files and it will push it automatically to their app.

By using this workflow, you are ensuring that your JavaScript/CSS development doesn't affect your teammates until you think it's stable.

Alternatively, if a developer in your project doesn't do any JavaScript/CSS development, that person may not want to go through all of these steps. For this person to benefit from your JavaScript/CSS changes, you can simply use `apex-nitro publish my_project` at step 6 from the workflow above.

`apex-nitro publish my_project` will upload your files directly in APEX Shared Components, so all your teammates will pick up your changes without installing APEX Nitro.

#### Self-signed SSL Warnings
When using APEX Nitro, you may encounter browser warnings before running your APEX application for the first time:

![](img/self-signed-warning-1.png)

This is normal because you are serving the files from your own computer with self-signed certificates. Please continue.

You will access your APEX application normally, except for this icon near your browser's URL:

![](img/self-signed-warning-2.png)

This is normal and it will only occur on your development environment.

#### How to specify the file concatenation order?
Right now when you activate the concatenation option for JavaScript or CSS, APEX Nitro merges all your files together automatically under a new filename (also configurable in `apex-nitro config <project>`).

Sometimes you might want to specify an order for these files. Especially for CSS, the order is very important.

If you use the default settings of APEX Nitro, the concatenation is done automatically following an alphabetical order.

**The simplest way to specify an order to your files would be to name them alphabetically.** Example:
- css/001-header.css
- css/002-body.css
- css/003-footer.css
- js/001-util.js
- js/002-upload.js
- js/003-library.js

There are advanced methods for dealing with the concatenation order. Let's break it down for each language.

**JavaScript**
- In the APEX Nitro config, change the JavaScript processor to `webpack`
- Then you can use the `require` functionality, which allows you to import other JavaScript files in the order you want
- See this [example](../examples/demo-webpack/src/js)

**CSS**
- In the APEX Nitro config, change the CSS processor to `less` or `sass`
- Then you can use the `import` functionality, which allows you to inject other CSS files in the order you want
- See this [example](../examples/demo-sass/src/scss)
