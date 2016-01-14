For an application to utilize apex-frontend-boost, you will need to add this one application item:

## G_APP_IMAGES
Scope: `Application`  
Session State Protection: `Unrestricted`
> **G_APP_IMAGES** is what replaces #APP_IMAGES#. All your static files (Javascript & CSS) will point to **G_APP_IMAGES**.

Examples:  
&G_APP_IMAGES.dist/js/app#MIN#.js  
&G_APP_IMAGES.dist/css/app#MIN#.css
