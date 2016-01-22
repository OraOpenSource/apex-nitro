# APEX Setup

This tool requires some slight modifications to your APEX application. These changes are required in order to have APEX reference the URL that browsersync provides but only in dev environments.

## Build Option

In Shared Components > Build Options (BO) create a new BO with the following attributes:
- Build Option: `DEV_ONLY`
- Status: `Include`
- Default on Export: `Exclude`

When you copy/import this application in a different schema anything tagged with the `DEV_ONLY` BO will not be run. If you re-import back into a development environment you'll need to manually change the status to `Include`.


## Application Setup

They're two options to setup your application. The choice that you use is dependent on how you reference images. If you use `APP_IMAGES` throughout your application then use the first option. If you use a custom application item for the image prefix then use the second option.

### Standard `APP_IMAGES`

In this case all your images reference the standard `APP_IMAGES` substitution string.

**Note:** Using this approach has a small known issue. When a page validation fails (ex required item is null and page is submitted), `APP_IMAGES` will **not** point APEX Frontend Boost. Instead it will point to the default location from APEX. There is currently no known fix for this as you can not run a process when a validation fails. For more information please read [What Happens When a Validation Fails?](https://docs.oracle.com/database/121/HTMDB/bldr_validate.htm#HTMDB29158) in the APEX documentation.

Create an application process with the following:

Name | Setting | Comment
--- | ---
Sequence | `-999` | Ensures this happens first
Process Point | `On Load: Before Header (page template header)` |
Name | `OOS APEX Frontend Boost Config` |
Source | *see below* |
Build Option | `DEV_ONLY` | For security reasons only want this to happen in a controlled development environment

Source:
```plsql
declare
    l_cookie owa_cookie.cookie;
begin
    l_cookie := owa_cookie.get('oos-apex-frontend-boost-app-images');
    if l_cookie.vals.count > 0 then
        apex_application.g_flow_images := l_cookie.vals(1);
    end if;
end;
```

### Custom Application Item for Images (ex: `G_APP_IMAGES`)

In this case all your images reference a custom image prefix. This example will use `G_APP_IMAGES` which can be replaced with any application item.

#### Create Application Item

Name | Setting
--- | ---
Name | `G_APP_IMAGES`
Scope | `Application`
Session State Protection | `Restricted - May not be set from browser`

#### Create Application Processes

Create the following Application Processes


Name | Setting | Comment
--- | ---
Sequence | `-999` | Ensures this happens first
Process Point | `On New Instance (new session)` |
Name | `OOS APEX Frontend Boost Config` |
Source | *see below* |
Build Option | `DEV_ONLY` | For security reasons only want this to happen in a controlled development environment

Source:

```plsql
declare
    l_cookie owa_cookie.cookie;
begin
    l_cookie := owa_cookie.get('oos-apex-frontend-boost-app-images');
    if l_cookie.vals.count > 0 then
        :G_APP_IMAGES := l_cookie.vals(1);
    else
        :G_APP_IMAGES := :APP_IMAGES;
    end if;
end;
```

Second App Process

Name | Setting | Comment
--- | ---
Sequence | `-999` | Ensures this happens first
Process Point | `On New Instance (new session)` |
Name | `OOS APEX Frontend Boost Config (Not Dev)` |
Source | *see below* |
Build Option | `{Not DEV_ONLY} ` | Will run in non-dev environments

Source:

```plsql
declare
begin
    :G_APP_IMAGES := :APP_IMAGES;
end;
```
