To utilize APEX Front-End Boost, you need to add 2 application processes.

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
