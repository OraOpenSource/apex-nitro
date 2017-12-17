# APEX Nitro Usage

### Basic Usage
After APEX Nitro is launched, create, edit or delete any file within your project's source folder. Example `/my_project/src/`:
```
|-/src/
	|-css
		|-app.css
	|-js
		|-app.js
```

APEX Nitro will compile your files to a new folder of your choice. Example `/my_project/dist/`:
```
|-/dist/
	|-css
		|-app.css
		|-app.css.map
		|-app.min.css
		|-app.min.css.map
	|-js
		|-app.js
		|-app.js.map
		|-app.min.js
		|-app.min.js.map
```

APEX Nitro will then synchronize the compiled folder (`/my_project/dist/`) to your APEX application.

Notice that the 2 source files are generating 8 dist files. That is the result of minification and sourcemaps. While this doesn't look like a good thing, it starts to make sense when we blow up and expand the source folder. Look at the advanced usage example below.

### Advanced Usage
The example above is good, but lacks structure. A good pattern would be to modularize CSS by visual sections of your page, and modularize JavaScript by different modules of your application. Example `/my_project/src/`:
```
|-/src/
	|-lib
		|-bootstrap
	|-img
		|-logo.png	
		|-background.png	
	|-scss
		|-_buttons.scss
		|-_cards.scss
		|-_header.scss
		|-_footer.scss
		|-_reports.scss
		|-_tables.scss
		|-_variables.scss
		|-app.scss
	|-js
		|-company.js
		|-dept.js
		|-emp.js
		|-profile.js
		|-role.js
		|-user.js
		|-util.js
```

Compiles to `/my_project/dist/`:
```
|-/dist/
	|-lib
		|-bootstrap
	|-img
		|-logo.png	
		|-background.png
	|-css
		|-app.css
		|-app.css.map
		|-app.min.css
		|-app.min.css.map
	|-js
		|-app.js
		|-app.js.map
		|-app.min.js
		|-app.min.js.map
```

Now that looks very similar to the basic example, only this time, we have reduced the number of files that are uploaded to the server. On a real life scenario, the number of source files can be much more complicated than this example.

### Team Usage
If you have used APEX Nitro, you may have noticed that your APEX application picks up the files from your local machine (`localhost`). Your teammates obviously don't have access to your `localhost`, so how do you work as a team using APEX Nitro?

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
- `/my_project/src/` is where you do the coding.
- `/my_project/dist/` is what's being exposed to your APEX application.

To work as a team, here's the typical workflow:
1. Have everyone on the team install and configure APEX Nitro.
2. The configuration file can be exported and shared when running `apex-nitro config my_project`. Teammates can import your configuration file.
3. Have everyone launch APEX Nitro when they are working on the project.
4. Make your version control system (Git or SVN) **ignore** `/my_project/dist/`. The `/my_project/dist/` folder should not be committed. Only the `/my_project/src/` has to be committed.
5. During your own development cycle, you make changes to any files you want within `/my_project/src/` and you will be the only one seeing those changes in your APEX application, as long as you don't commit `/my_project/src/`.
6. Commit `/my_project/src/` when you think the changes are ready and stable.
7. Teammates can update their project repository.
8. Teammates APEX Nitro will automatically pick up the updated files and it will push it automatically to their app.

By using this workflow, you are ensuring that your JavaScript/CSS development doesn't affect your teammates until you think it's stable.

Alternatively, if a developer in your project doesn't do any JavaScript/CSS development, that person may not want to go through all of these steps. For this person to benefit from your JavaScript/CSS changes, you can simply use `apex-nitro publish my_project` at step 6 from the workflow above.

`apex-nitro publish my_project` will upload your files directly in APEX Shared Components, so all your teammates will pick up your changes without installing APEX Nitro.

### Patterns
[See common patterns.](patterns.md)

### Examples
[Try our examples.](../examples/)
