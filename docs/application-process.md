For an application to utilize apex-frontend-boost, you will need to add one [application process](/script/application_process.sql).

- Application process name doesn't matter
- Process Point: On New Instance (new session)

```sql
if :G_APP_IMAGES is null then
    -- default is #APP_IMAGES#
    :G_APP_IMAGES := '#APP_IMAGES#';
else
    -- rebuilds the url
    :G_APP_IMAGES := OWA_UTIL.GET_CGI_ENV('REQUEST_PROTOCOL')
        || '://' ||  replace(:G_APP_IMAGES, '~', ':') || '/';
end if;
```

The application process takes what Gulp has been sending over to `G_APP_IMAGES` as the current host. Any device that is accessing the application through that same host will benefit from live changes and synchronization.
