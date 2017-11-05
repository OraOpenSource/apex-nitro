# Troubleshoot
Here are the most common issues people are having.

Please submit an issue on Github if you can't find a solution to your problem.

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
