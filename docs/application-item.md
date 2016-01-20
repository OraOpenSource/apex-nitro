To utilize APEX Front-End Boost, you need to add 2 application items:

#### G_BROWSERSYNC_HOST
Scope: `Application`  
Session State Protection: `Unrestricted`
> G_BROWSERSYNC_HOST is passed through URL parameters to your application.  
> It will be parsed to generate G_APP_IMAGES.  
> It is only enabled in the development environment.  
> The format to use is `host~port`  
> *Examples:*  
> - localhost~3000  
> - 192.168.1.100~3000

#### G_APP_IMAGES
Scope: `Application`  
Session State Protection: `Restricted - May not be set from browser`
> G_APP_IMAGES replaces #APP_IMAGES#.  
> All your static files need to point to G_APP_IMAGES instead of #APP_IMAGES#.  
> *Examples:*  
> - &G_APP_IMAGES.js/app#MIN#.js  
> - &G_APP_IMAGES.css/app#MIN#.css
