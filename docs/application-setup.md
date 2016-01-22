Here is the required setup to get going with APEX Front-End Boost:
- 1 build option
- 2 application items
- 2 application processes

## Build Option

#### DEV_ONLY
Status: `Include`  
Default on Export: `Exclude`
> APEX Front-End Boost isn't meant to run in production.  
> This build option is used to limit the scope of APEX Front-End Boost to the development environment only.

## Application Items

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

## Application Processes
- Application Process names don't matter.
- Process Point: On New Instance (new session).

#### set_app_images_dev  
Build Option: `DEV_ONLY`
```sql
if :G_BROWSERSYNC_HOST is not null then
    -- rebuilds the url
    :G_APP_IMAGES := OWA_UTIL.GET_CGI_ENV('REQUEST_PROTOCOL')
        || '://' ||  replace(:G_BROWSERSYNC_HOST, '~', ':') || '/';
else
    -- default is #APP_IMAGES#
    :G_APP_IMAGES := '#APP_IMAGES#';
end if;
```

#### set_app_images_prod  
Build Option: `{Not DEV_ONLY}`
```sql
:G_APP_IMAGES := '#APP_IMAGES#';
```
