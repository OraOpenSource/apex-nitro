# APEX Nitro Usage

## Folder Structure

One of the most important things to learn in APEX Nitro is the file structure. APEX Nitro enforces a clean file structure, following a few mandatory folder names:

```bash
|-/src/
   |-css
      |-app.css
   |-js
      |-app.js
```

Any file in the `/css/` and `/js/` folders will get a special compilation, as they constitute your application custom static files, so these two folders are very important to have.

_Note: the `/css/` folder can be replaced by `/scss/` or `/less/` depending on your project configuration._

Any other folder names will be synchronized to your application without any special compilation. Example:

```bash
|-/src/
   |-css
      |-app.css
   |-js
      |-app.js
   |-lib
      |-bootstrap.js
      |-bootstrap.css
   |-img
      |-logo.png
```

## Configuration - Basic Mode

A basic mode configuration is the best way to start with APEX Nitro. Again with the same example:

```bash
|-/src/
   |-css
      |-app.css
   |-js
      |-app.js
   |-img
      |-logo.png
```

We would reference these files as:

```bash
#APP_IMAGES#js/app.js
#APP_IMAGES#css/app.css
#APP_IMAGES#img/logo.png
```

## Configuration - Advanced Mode (Default)

A project using advanced mode configuration is the best way and most efficient way to use APEX Nitro because it boosts the performance and the maintainability of your files.

### Without Concatenation

Again with the same example:

```bash
|-/src/
   |-css
      |-app.css
   |-js
      |-app.js
   |-img
      |-logo.png
```

APEX Nitro compiles the `/src/` folder into a new folder called `/dist/`:

```bash
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
   |-img
      |-logo.png
```

Now we would reference these files as:

```bash
#APP_IMAGES#js/app#MIN#.js
#APP_IMAGES#css/app#MIN#.css
#APP_IMAGES#img/logo.png
...
```

### With Concatenation

The advanced usage without concatenation is good, but lacks structure. A better pattern would be to split CSS and JavaScript files according to logical modules of your application. Example:

```bash
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

```bash
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

Even if there are more source files, we would still reference these files as:

```bash
#APP_IMAGES#js/app#MIN#.js
#APP_IMAGES#css/app#MIN#.css
#APP_IMAGES#img/logo.png
...
```

## Using APEX Nitro in a Team

If you have used APEX Nitro, you may have noticed that your APEX application picks up the files from your local machine (`localhost`). Your teammates obviously don't have access to your `localhost`, so how do you work as a team using APEX Nitro?

Let's assume that you are using a version control system, like Git or SVN. Your repository tree should look similar to this:

```bash
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
